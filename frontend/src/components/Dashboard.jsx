import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { markCourseCompleted } from "../redux/coursesSlice";
import { Card, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  //  Filter only enrolled courses
  const enrolledCourses = courses.filter((course) => course.students.length > 0);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary fw-bold">📚 Student Dashboard</h2>

      {enrolledCourses.length === 0 ? (
        <p className="text-center text-muted fs-5">No enrolled courses yet.</p>
      ) : (
        <Row className="g-4">
          {enrolledCourses.map((course) => (
            <Col key={course.id} md={6} lg={4}>
              <Card className="shadow border-0 rounded-3">
                {/*  Course Thumbnail */}
                <Card.Img
                  variant="top"
                  src={course.thumbnail || "https://via.placeholder.com/300"}
                  alt={course.name}
                  style={{ height: "180px", objectFit: "cover" }}
                  className="rounded-top"
                />
                <Card.Body>
                  <Card.Title className="fw-bold text-dark">{course.name}</Card.Title>
                  <Card.Text className="text-muted">
                    <strong>Instructor:</strong> {course.instructor} <br />
                    <strong>Due Date:</strong> {course.schedule}
                  </Card.Text>

                  {/*  Styled Progress Bar */}
                  <ProgressBar
                    now={course.progress || 0}
                    label={`${course.progress || 0}%`}
                    striped
                    animated
                    variant={course.progress === 100 ? "success" : "info"}
                    className="mb-3"
                  />

                  {/* ✅ Dynamic Button Styling */}
                  <Button
                    variant={course.progress === 100 ? "secondary" : "success"}
                    className="w-100"
                    disabled={course.progress === 100} 
                    onClick={() => dispatch(markCourseCompleted(course.id))}
                  >
                    {course.progress === 100 ? "✅ Completed" : "✅ Mark as Completed"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
