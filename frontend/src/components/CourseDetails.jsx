import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../redux/coursesSlice";

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { courses, status } = useSelector((state) => state.courses);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const course = courses.find((course) => course.id.toString() === id);



  if (!course) {
    return <p className="text-center text-danger mt-4"> Course Not Found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{course.name}</h2>
      <img
        src={course.thumbnail || "https://via.placeholder.com/300"}
        alt={course.name}
        className="img-fluid d-block mx-auto mb-3"
        style={{ maxWidth: "500px", height: "auto" }}
      />
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Enrollment Status:</strong> {course.enrollmentStatus}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Schedule:</strong> {course.schedule}</p>
      <p><strong>Location:</strong> {course.location}</p>
      <p><strong>Prerequisites:</strong> {course.prerequisites.length > 0 ? course.prerequisites.join(", ") : "None"}</p>
      
      <h4>Syllabus</h4>
      <ul className="list-group">
        {course.syllabus.length > 0 ? (
          course.syllabus.map((item, index) => (
            <li key={index} className="list-group-item">
              <strong>Week {item.week}:</strong> {item.topic} - {item.content}
            </li>
          ))
        ) : (
          <p>No syllabus available.</p>
        )}
      </ul>
    </div>
  );
};

export default CourseDetails;
