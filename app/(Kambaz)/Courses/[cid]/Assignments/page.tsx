"use client";
import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import Badge from "react-bootstrap/Badge"; import AssignmentItemControlButtons from "./AssignmentItemControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { useParams } from "next/navigation";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";

export default function Assignments() {
  const {cid} = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((s:RootState)=>s.assignmentsReducer.assignments);
  const courseAssignments = Array.isArray(assignments)
  ? assignments.filter((a) => a.course === cid)
  : [];
  const formatDueDate = (date: any) => {
    if(!date) return "No Date";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "No Date";

    return d.toLocaleString(
      [],{
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }
    ).replace(","," at");
  };

  const onDelete = (id: string, title: string) => {
    if (typeof window != "undefined" && window.confirm(`Delete "${title}"?`)){
    dispatch(deleteAssignment(id) as any);
    }
  }
  return (
    <div id="wd-assignments">

      <AssignmentsControls cid={cid} />
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
          {courseAssignments.map((a) => (
            <ListGroup key={a._id} className="wd-assignment-list rounded-0">
              <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
                <div className="d-flex align0items-center gap-2">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="me-2 fs-3"/>
                  <div className="flex-fill">
                    <Link
                      href={`/Courses/${cid}/Assignments/${a._id}/Editor`}
                      className="wd-assignment-link text-decoration-none text-black">
                        {a.title}
                      </Link>

                      <div className="small mt-1">
                        <span className="text-danger">
                          {a.modules}
                        </span>
                        <span className="mx-2"> | </span>
                        <b>Not Available Until</b>
                        <span className="ms-1">
                          {formatDueDate(a.available_from)}
                        </span>
                        <span className="mx-2"> | </span>
                        <b>Due</b>
                        <span className="ms-1">
                          {formatDueDate(a.due)}
                        </span>
                        <span className="ms-2"> | </span>
                        <span>
                          {a.points ?? 100} pts
                        </span>
                      </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <AssignmentItemControlButtons />
                    <Button
                    variant="danger"
                    size = "sm"
                    aria-label={`Delete ${a.title}`}
                    onClick={() => onDelete(a._id, a.title)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          ))}
        

          {/* <ListGroup className="wd-assignment-list rounded-0">
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
          </ListGroup> */}
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
