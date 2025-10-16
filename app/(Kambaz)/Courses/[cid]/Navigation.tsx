"use client";
import { NavLink } from "react-bootstrap";
import { usePathname,useParams } from "next/navigation";


export default function CourseNavigation() {
  const { cid } = useParams<{cid : string}>();
  const pathname = usePathname();
  const links = [
    "Home", 
    "Modules", 
    "Piazza", 
    "Zoom", 
    "Assignments", 
    "Quizzes", 
    "Grades", 
    "People"];
    return (
      <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const href = `/Courses/${cid}/${label}`;
        const isActive = pathname.includes(label);

        return (
          <NavLink
            key={label}
            href={href}
            id={`wd-course-${label}-link`}
            className={`list-group-item list-group-item-action border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {label}
          </NavLink>
        );
      })}
      </div>
    );
  }
  // return (
  //   <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
  //     <NavLink href="/Courses/1234/Home" id="wd-course-home-link"
  //       className= "active list-group-item border-0 ">Home</NavLink>
  //     <NavLink href="/Courses/1234/Modules" id="wd-course-modules-link" 
  //       className="list-group-item text-danger border-0">Modules
  //     </NavLink>
  //     <NavLink href="/Courses/1234/Piazza" id="wd-course-piazza-link"
  //     className="list-group-item text-danger border-0">Piazza</NavLink>
  //     <NavLink href="/Courses/1234/Zoom" id="wd-course-zoom-link"
  //     className="list-group-item text-danger border-0">Zoom</NavLink>
  //     <NavLink href="/Courses/1234/Assignments" id="wd-course-quizzes-link"
  //     className="list-group-item text-danger border-0">
  //       Assignments</NavLink>
  //     <NavLink href="/Courses/1234/Quizzes" id="wd-course-assignments-link"
  //     className="list-group-item text-danger border-0">Quizzes
  //     </NavLink>
  //     <NavLink href="/Courses/1234/Grades" id="wd-course-grades-link"
  //     className="list-group-item text-danger border-0">Grades</NavLink>
  //     <NavLink href="/Courses/1234/People/Table" id="wd-course-people-link"
  //     className="list-group-item text-danger border-0">People</NavLink><br />
  //   </div>
  // );
// }
