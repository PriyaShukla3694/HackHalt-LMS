function CourseCard({
  title,
  lessons,
  progress,
  image,
}) {
  return (
    <div className="course-card">

      <img
        src={image}
        alt={title}
      />

      <div className="course-content">

        <h3>{title}</h3>

        <p>
          {lessons} Lessons Remaining
        </p>

        <div className="mini-progress">
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

    </div>
  );
}

export default CourseCard;