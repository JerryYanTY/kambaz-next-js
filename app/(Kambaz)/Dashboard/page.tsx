"use client";
import { FormControl } from "react-bootstrap";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as db from "../Database";
import { CardBody, CardImg, CardText, CardTitle, Card } from "react-bootstrap";
export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "new course",
    number: "new number",
    startDate: "2023-09-29",
    endDate: "2023-12-15",
    department: "Some Department",
    credits: "4",
    image: "/images/reactjs.jpg",
    description: "Some description",
  });
  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse]);
  };
  const deleteCourse = (courseId: string) => {
    setCourse(courses.filter((course) => course._id !== courseId));
  };
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <Button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          Add
        </Button>
      </h5>
      <br />
      <FormControl
        value={course.name ?? ""}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        as="textarea"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={course.image}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </CardText>
                    <Button variant="primary"> Go </Button>
                    

                    <Button
                      onClick={(event) => {
                        event.preventDefault;
                        deleteCourse(course._id);
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </Button>
                    <Button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
{
  /* <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS1234 React JS</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Full Stack software developer
              </CardText>
              <Button variant="primary"> Go </Button>
              </CardBody>
          </Link>
          </Card>
        </Col>
        
        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4000" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/python.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4000 Python</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to Python
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
          </Col>
        
        <Col className="wd-dashboard-course" style={{width:"300px"}}>
          <Card>
          <Link href="/Courses/4001" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cpp.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4001 C++</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to CPP
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>


        <Col className="wd-dashboard-course" style={{width:"300px"}}>
          <Card>
          <Link href="/Courses/4002" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cs.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4002 C#</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to C#
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>


        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4003" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/java.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4003 Java</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to Java
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4004" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/ruby.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4004 Ruby</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to Ruby
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>


        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4005" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/swift.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4005 swift</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Intro to swift
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col> */
}
