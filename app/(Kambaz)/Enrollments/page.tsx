/* eslint-disable @next/next/no-assign-module-variable */
"use client";
import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import * as enrollmentsClient from "./client";
import * as coursesClient from "../Courses/client";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function EnrollmentsPage() { 
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  const loadData = async () => {
    const [coursesData, enrollmentsData] = await Promise.all([
      coursesClient.fetchAllCourses(),
      enrollmentsClient.findMyEnrollments().catch(() => []),
    ]);
    setCourses(coursesData);
    setEnrollments(enrollmentsData);
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.course === courseId);

  const handleEnroll = async (courseId: string) => {
    const enrollment = await enrollmentsClient.enrollInCourse(courseId);
    // Avoid duplicates if API returns existing enrollment
    setEnrollments((prev) => {
      if (prev.some((e) => e._id === enrollment._id)) return prev;
      return [...prev, enrollment];
    });
  };

  const handleUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollFromCourse(courseId, "current");
    setEnrollments((prev) => prev.filter((e) => e.course !== courseId));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!currentUser) {
    return (
      <div className="alert alert-info mt-3">
        Please sign in to manage enrollments.
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h3>Enrollments</h3>
      <ListGroup>
        {courses.map((course) => (
          <ListGroupItem
            key={course._id}
            className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex flex-column">
              <strong>{course.name}</strong>
              <small className="text-secondary">{course.number}</small>
            </div>
            {isEnrolled(course._id) ? (
              <Button
                variant="outline-danger"
                onClick={() => handleUnenroll(course._id)}
              >
                Unenroll
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleEnroll(course._id)}
              >
                Enroll
              </Button>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
