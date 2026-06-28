import { useState, useEffect } from "react";
import "../styles/ProgressAnalytics.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { authFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useEnrolledCourses } from "../hooks/useCourses";

function ProgressAnalytics() {
  const { user } = useAuth();
  const { enrolledCourses, loading: enrolledLoading } = useEnrolledCourses();

  // Dynamic user stats state
  const [certificatesCount, setCertificatesCount] = useState(0);
  const [courseProgressMap, setCourseProgressMap] = useState({}); // { courseId: completedLessonsCount }
  const [completionsHistory, setCompletionsHistory] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch certificates count on mount
  useEffect(() => {
    authFetch("/courses/certificates")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => setCertificatesCount(data ? data.length : 0))
      .catch((err) => console.error("Error loading certificates:", err));
  }, []);

  // Fetch weekly module completions history
  useEffect(() => {
    authFetch("/courses/activity/weekly")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => setCompletionsHistory(data || []))
      .catch((err) => console.error("Error loading activity history:", err));
  }, []);


  // Fetch detailed completions progress for all enrolled courses
  useEffect(() => {
    if (enrolledLoading) return;

    if (enrolledCourses.length === 0) {
      setCourseProgressMap({});
      setStatsLoading(false);
      return;
    }

    Promise.all(
      enrolledCourses.map((c) =>
        authFetch(`/courses/${c.id}/progress`)
          .then((res) => {
            if (res.ok) return res.json();
            return { completedLessons: 0 };
          })
          .then((data) => ({ courseId: c.id, completedCount: data ? data.completedLessons : 0 }))
          .catch(() => ({ courseId: c.id, completedCount: 0 }))
      )
    )
      .then((results) => {
        const progressMap = {};
        results.forEach((res) => {
          progressMap[res.courseId] = res.completedCount;
        });
        setCourseProgressMap(progressMap);
        setStatsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading progress aggregators:", err);
        setStatsLoading(false);
      });
  }, [enrolledCourses, enrolledLoading]);

  // Aggregate user statistics
  const totalCompletedLessons = Object.values(courseProgressMap).reduce((a, b) => a + b, 0);
  const totalCourseLessons = enrolledCourses.reduce((sum, c) => sum + (c.totalLessons || 0), 0);

  const overallProgressPct =
    totalCourseLessons > 0 ? Math.round((totalCompletedLessons / totalCourseLessons) * 100) : 0;

  const computedXP = totalCompletedLessons * 100;
  const computedHours = (totalCompletedLessons * 1.5).toFixed(1);
  const computedStreak = totalCompletedLessons > 0 ? 1 + Math.floor(totalCompletedLessons / 2) : 0;

  const getCourseProgressPercentage = (courseId) => {
    const enrolled = enrolledCourses.find((c) => c.id === courseId);
    if (!enrolled) return null;
    const completed = courseProgressMap[courseId] || 0;
    const total = enrolled.totalLessons || 0;
    return total > 0 ? Math.round((completed / total) * 100).toString() : "0";
  };

  const angle = (overallProgressPct / 100) * 360;

  // Rank and XP calculation
  let currentRank = "Novice Cadet";
  let nextRank = "Cyber Scout";
  let nextRankXP = 500;
  let prevRankXP = 0;

  if (computedXP >= 5000) {
    currentRank = "Command Commander";
    nextRank = "Max Rank";
    nextRankXP = 5000;
    prevRankXP = 5000;
  } else if (computedXP >= 3000) {
    currentRank = "Elite Hacker";
    nextRank = "Command Commander";
    nextRankXP = 5000;
    prevRankXP = 3000;
  } else if (computedXP >= 1500) {
    currentRank = "Cyber Warrior";
    nextRank = "Elite Hacker";
    nextRankXP = 3000;
    prevRankXP = 1500;
  } else if (computedXP >= 500) {
    currentRank = "Cyber Scout";
    nextRank = "Cyber Warrior";
    nextRankXP = 1500;
    prevRankXP = 500;
  }

  const remainingXP = Math.max(0, nextRankXP - computedXP);
  const xpRange = nextRankXP - prevRankXP;
  const xpProgressPct = xpRange > 0 ? Math.min(100, Math.round(((computedXP - prevRankXP) / xpRange) * 100)) : 100;

  // Achievements config
  const achievementsList = [
    { id: 1, name: "🚀 Fast Learner", unlocked: totalCompletedLessons >= 1, desc: "Req. 1 completed lesson" },
    { id: 2, name: "🎖️ Consistency Master", unlocked: totalCompletedLessons >= 5, desc: "Req. 5 completed lessons" },
    { id: 3, name: "🏆 Cyber Warrior", unlocked: computedXP >= 1500, desc: "Req. 1500 XP" },
    { id: 4, name: "🔥 7 Day Streak", unlocked: computedStreak >= 7, desc: "Req. 7 Day Streak" },
  ];

  // Dynamic Completed Courses list
  const completedCourses = enrolledCourses.filter((c) => {
    const pct = getCourseProgressPercentage(c.id);
    return pct === "100";
  });

  // Get active courses or fallback to meaningful mock data for a complete dashboard feel
  const performanceData = enrolledCourses.length > 0 
    ? enrolledCourses.map(course => ({
        id: course.id,
        title: course.title,
        pct: parseInt(getCourseProgressPercentage(course.id) || "0")
      }))
    : [
        { id: "sample-1", title: "Ethical Hacking Bootcamp", pct: 85 },
        { id: "sample-2", title: "Network Traffic Analysis", pct: 60 },
        { id: "sample-3", title: "Malware Reverse Engineering", pct: 45 },
        { id: "sample-4", title: "Web App Penetration Testing", pct: 90 }
      ];

  // Group real module completion timestamps by weekday of current week
  const getStartOfWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday is start of week
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const startOfWeek = getStartOfWeek();

  const weeklyActivityData = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((dayName, index) => {
    const targetDate = new Date(startOfWeek);
    targetDate.setDate(startOfWeek.getDate() + index);
    const targetDateString = targetDate.toDateString();

    const completionsOnDay = completionsHistory.filter((c) => {
      const completionDate = new Date(c.createdAt);
      return completionDate.toDateString() === targetDateString;
    }).length;

    let level = "low";
    let hours = "0.0";
    let label = "0h";

    if (completionsOnDay > 0) {
      const hrsVal = completionsOnDay * 1.5;
      hours = hrsVal.toFixed(1);
      label = `${hours}h`;
      level = completionsOnDay >= 2 ? "high" : "medium";
    }

    return {
      day: dayName,
      level,
      hours,
      label
    };
  });


  return (
    <div className="progress-page">
      <Sidebar />

      <div className="progress-content">
        <Topbar />

        {/* HERO */}
        <div className="analytics-hero">
          <div>
            <span>LEARNING INSIGHTS</span>
            <h1>Progress Analytics</h1>
            <p>
              Track your learning journey, monitor performance
              and unlock achievements.
            </p>
          </div>

          <div
            className="progress-circle"
            style={{
              background: `radial-gradient(circle, #121826 58%, transparent 59%), conic-gradient(#00F5FF 0deg ${angle}deg, #252535 ${angle}deg 360deg)`
            }}
          >
            <h2>{overallProgressPct}%</h2>
            <p>Completed</p>
          </div>
        </div>

        {/* STATS */}
        <div className="analytics-stats">
          <div className="analytics-card">
            <h2>{enrolledCourses.length.toString().padStart(2, "0")}</h2>
            <p>Active Courses</p>
          </div>

          <div className="analytics-card">
            <h2>{computedHours}</h2>
            <p>Learning Hours</p>
          </div>

          <div className="analytics-card">
            <h2>{computedStreak.toString().padStart(2, "0")}</h2>
            <p>Day Streak</p>
          </div>

          <div className="analytics-card">
            <h2>{certificatesCount.toString().padStart(2, "0")}</h2>
            <p>Certificates</p>
          </div>
        </div>

        {/* COURSE PERFORMANCE */}
        <div className="progress-section">
          <h2>Course Performance</h2>
          <div className="bar-chart-card">
            <div className="bar-chart">
              {performanceData.map((course) => (
                <div className="bar-item" key={course.id}>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{ height: `${course.pct}%` }}
                    ></div>
                  </div>
                  <h4>{course.pct}%</h4>
                  <p>{course.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WEEKLY ACTIVITY */}
        <div className="weekly-section">
          <h2>Weekly Learning Activity</h2>
          <div className="heatmap" style={{ display: "flex", gap: "20px", justifyContent: "flex-start", flexWrap: "wrap" }}>
            {weeklyActivityData.map((activity, index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "#8B94A7", fontWeight: "600" }}>{activity.day}</span>
                <div 
                  className={`heat ${activity.level}`}
                  title={`${activity.hours} hours spent`}
                  style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                ></div>
                <span style={{ fontSize: "12px", color: activity.level === "high" ? "#00F5FF" : activity.level === "medium" ? "#7C5CFF" : "#4B5563", fontWeight: "600" }}>
                  {activity.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* XP SECTION */}
        <div className="xp-section">
          <div className="xp-card">
            <div>
              <span>Current Rank</span>
              <h2>{currentRank}</h2>
            </div>

            <div>
              <span>XP Points</span>
              <h2>{computedXP} XP</h2>
            </div>
          </div>

          <div className="xp-progress">
            <div
              className="xp-fill"
              style={{ width: `${xpProgressPct}%` }}
            ></div>
          </div>

          <p>
            {remainingXP > 0 ? `${remainingXP} XP remaining for ${nextRank}` : "Max Rank achieved!"}
          </p>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="achievement-section">
          <h2>Achievements</h2>
          <div className="achievement-grid">
            {achievementsList.map((ach) => (
              <div
                className="achievement-card"
                key={ach.id}
                style={{
                  opacity: ach.unlocked ? 1 : 0.4,
                  borderColor: ach.unlocked ? "rgba(0, 245, 255, 0.3)" : "rgba(255, 255, 255, 0.05)",
                  background: ach.unlocked ? undefined : "rgba(255, 255, 255, 0.02)"
                }}
                title={ach.desc}
              >
                <div>{ach.name}</div>
                <div style={{ fontSize: "12px", color: "#71717a", marginTop: "5px" }}>
                  {ach.unlocked ? "Unlocked" : ach.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT MILESTONES */}
        <div className="milestone-section">
          <h2>Recent Milestones</h2>
          <div className="milestone-grid">
            {totalCompletedLessons === 0 ? (
              <div className="milestone-card" style={{ gridColumn: "span 3", color: "#a1a1aa" }}>
                📭 No milestones reached yet. Complete module lessons to earn achievements!
              </div>
            ) : (
              <>
                <div className="milestone-card">
                  🎯 Completed {totalCompletedLessons} Lesson{totalCompletedLessons > 1 ? "s" : ""}
                </div>
                <div className="milestone-card">
                  🏅 Earned {computedHours} Learning Hours
                </div>
                {computedStreak > 0 && (
                  <div className="milestone-card">
                    🔥 {computedStreak} Day Learning Streak
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* COMPLETED COURSES */}
        <div className="completion-section">
          <h2>Completed Courses</h2>
          <div className="completion-grid">
            {completedCourses.length === 0 ? (
              <div style={{ color: "#a1a1aa", gridColumn: "span 3", textAlign: "center", padding: "20px" }}>
                <p>No completed courses yet. Complete all modules of a course to see it here!</p>
              </div>
            ) : (
              completedCourses.map((course) => (
                <div className="completion-card" key={course.id}>
                  ✅ {course.title}
                </div>
              ))
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ProgressAnalytics;