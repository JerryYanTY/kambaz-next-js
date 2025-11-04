"use client";
import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";


export default function CoursesLayout(
  {children}: {children: ReactNode
}) {
  const { cid } =  useParams();
  const {courses} = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any)=> course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1"></FaAlignJustify>
        {/* <Breadcrumb course = {course}/> */}
        {course?.name}
      </h2>

      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation  />
        </div>
        <div className="flex-fill"> {children} </div>
      </div>
    </div>
  );
}
