import "./RecentActivities.css";

function RecentActivities() {
return ( <div className="activities-card">


  <h2>Recent Activities</h2>

  <div className="activity-item">
    <span className="activity-dot"></span>
    <p>New student enrolled in Cyber Security Course</p>
  </div>

  <div className="activity-item">
    <span className="activity-dot"></span>
    <p>Ethical Hacking course updated</p>
  </div>

  <div className="activity-item">
    <span className="activity-dot"></span>
    <p>Certificate issued to student</p>
  </div>

  <div className="activity-item">
    <span className="activity-dot"></span>
    <p>Instructor uploaded a new lesson</p>
  </div>

  <div className="activity-item">
    <span className="activity-dot"></span>
    <p>Course approved by admin</p>
  </div>

</div>


);
}

export default RecentActivities;
