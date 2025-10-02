import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import Badge from "react-bootstrap/Badge"; import AssignmentItemControlButtons from "./AssignmentItemControlButtons";
import { LuNotebookPen } from "react-icons/lu";
export default function Assignments() {
  return (
    <div id="wd-assignments">

      <AssignmentsControls />
      <br /> <br />
      <ListGroup id="wd-assignments" className="rounded-0">
        <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignment-title d-flex align-items-center gap-2 p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <span className="fw-semibold">
              ASSIGNMENTS
            </span>
            <div className="d-flex align-items-center gap-2 ms-auto">

              <Badge pill bg="transparent" text="secondary"
                className="me-2 border px-3 py-1 small text-black text-center float-end">
                40% of Total
              </Badge>
              <AssignmentControlButtons />
            </div>
          </div>
          <ListGroup className="wd-assignment-list rounded-0">
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="d-flex align-items-center gap-2">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3" style={{color:"green"}}/>
                <div className="flex-fill">
                  <Link href="/Courses/1234/Assignments/1"
                    className="wd-assignment-link text-decoration-none text-black">
                    A1 - ENV + HTML
                  </Link>
                  <div className="small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2"> | </span>
                    <b>Not available until</b>
                    <span className="ms-1">May 5 at 12:00am</span>
                    <span className="mx-2"> | </span>
                    <br/>
                    <b>Due </b>
                    <span className="ms-1">May 13 at 11:59pm</span>
                    <span className="mx-2"> | </span>
                    <span> 100 pts</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                <AssignmentItemControlButtons />
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="wd-assignment-list rounded-0">
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="d-flex align-items-center gap-2">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3" style={{color:"green"}}/>
                <div className="flex-fill">
                  <Link href="/Courses/1234/Assignments/1"
                    className="wd-assignment-link text-decoration-none text-black">
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <div className="small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2"> | </span>
                    <b>Not available until</b>
                    <span className="ms-1">May 13 at 12:00am</span>
                    <span className="mx-2"> | </span>
                    <br/>
                    <b>Due </b>
                    <span className="ms-1">May 20 at 11:59pm</span>
                    <span className="mx-2"> | </span>
                    <span> 100 pts</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                <AssignmentItemControlButtons />
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="wd-assignment-list rounded-0">
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="d-flex align-items-center gap-2">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3" style={{color:"green"}}/>
                <div className="flex-fill">
                  <Link href="/Courses/1234/Assignments/1"
                    className="wd-assignment-link text-decoration-none text-black">
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <div className="small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2"> | </span>
                    <b>Not available until</b>
                    <span className="ms-1">May 20 at 12:00am</span>
                    <span className="mx-2"> | </span>
                    <br/>
                    <b>Due </b>
                    <span className="ms-1">May 27 at 11:59pm</span>
                    <span className="mx-2"> | </span>
                    <span> 100 pts</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                <AssignmentItemControlButtons />
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignment-title d-flex align-items-center gap-2 p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <span className="fw-semibold">
              QUIZZES
            </span>
            <div className="d-flex align-items-center gap-2 ms-auto">

              <Badge pill bg="transparent" text="secondary"
                className="me-2 border px-3 py-1 small text-black text-center float-end">
                10% of Total
              </Badge>
              <AssignmentControlButtons />
            </div>
          </div>
          </ListGroupItem>
          <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignment-title d-flex align-items-center gap-2 p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <span className="fw-semibold">
            EXAMS
            </span>
            <div className="d-flex align-items-center gap-2 ms-auto">

              <Badge pill bg="transparent" text="secondary"
                className="me-2 border px-3 py-1 small text-black text-center float-end">
                30% of Total
              </Badge>
              <AssignmentControlButtons />
            </div>
          </div>
          </ListGroupItem>
          <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignment-title d-flex align-items-center gap-2 p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <span className="fw-semibold">
            PROJECTS
            </span>
            <div className="d-flex align-items-center gap-2 ms-auto">

              <Badge pill bg="transparent" text="secondary"
                className="me-2 border px-3 py-1 small text-black text-center float-end">
                20% of Total
              </Badge>
              <AssignmentControlButtons />
            </div>
          </div>
          </ListGroupItem>
      </ListGroup>
      
    </div>
  );
}
