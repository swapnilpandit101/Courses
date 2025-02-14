import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/coursesSlice";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center flex-grow-1">📚 Available Courses</h2>
        {/* Go to Dashboard Button */}
        <Link to="/dashboard">
          <Button variant="primary">Student Dashboard</Button>
        </Link>
      </div>

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Search by course name or instructor"
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Course Cards */}
      <Row className="g-4">
        {filteredCourses.map((course) => (
          <Col key={course.id} md={6} lg={4}>
            <Card className="shadow-sm border-0">
              <Card.Img
                variant="top"
                src={course.thumbnail || "https://via.placeholder.com/150"}
                alt={course.name}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{course.name}</Card.Title>
                <Card.Text>
                  <strong>Instructor:</strong> {course.instructor} <br />
                  <strong>Status:</strong> {course.enrollmentStatus}
                </Card.Text>
                <Link to={`/course/${course.id}`}>
                  <Button variant="info" className="w-100">📖 View Course</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CourseList;
