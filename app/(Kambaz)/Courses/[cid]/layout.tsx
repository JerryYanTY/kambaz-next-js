"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button } from "react-bootstrap";

export default function CoursesLayout(
  {children}: {children: ReactNode
}) {
  const { cid } =  useParams();
  const {courses} = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any)=> course._id === cid);
  const [showNav, setShowNav] = useState(true);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        {/* <FaAlignJustify className="me-4 fs-4 mb-1"></FaAlignJustify> */}
        <Button
        type="button"
        className="btn btn-link p-0 me-3 align-middle"
        aria-label="Toggle course nav"
        aria-pressed={showNav}
        onClick={()=>setShowNav((s) => !s)}>
          <FaAlignJustify className="fs-4 text-danger"/>
        </Button>
        {/* <Breadcrumb course = {course}/> */}
        {course?.name}
      </h2>

      <hr />
      <div className="d-flex">
        {/* <div className="d-none d-md-block">
          <CourseNavigation  />
        </div> */}
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation/>
            </div>
        )}
        <div className="flex-fill"> {children} </div>
      </div>
    </div>
  );
}
