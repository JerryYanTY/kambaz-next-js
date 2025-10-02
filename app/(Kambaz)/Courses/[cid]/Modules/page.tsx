import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
export default function Modules() {
  return (


    <div>

      <ModulesControls />
      <br /> <br /><br /><br />
      {/* Implement Collapse All button, View Progress button, etc. */}
      <ListGroup id="wd-modules" className="rounded-0">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3"/> 
            Week 1 
            <ModuleControlButtons/>
            </div>
          <ListGroup className="wd-lesson rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3"/>
              LEARNING OBJECTIVES
              <LessonControlButtons/>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3"/>
              Introduction to the course
              <LessonControlButtons/>
              </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3"/>
            Learn what is Web Development
            <LessonControlButtons/>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3"/>
            Week 2
            <ModuleControlButtons/>
            </div>
          <ListGroup className="wd-lesson rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3"/>
              LEARNING OBJECTIVES
              <LessonControlButtons/>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3"/>
              Introduction to CSS
              <LessonControlButtons/>
              </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3"/>
              The box model - styling margins, borders, and paddings
              <LessonControlButtons/>
              </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3"/>
            Week 3
            <LessonControlButtons/>
            </div>
          <ListGroup className="wd-lesson rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3"/>
              LEARNING OBJECTIVES
              <LessonControlButtons/>
              </ListGroupItem >
                <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3"/>
                  CSS Libraries: Bootstrap, Tailwind
                  <LessonControlButtons/>
                  </ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3"/>
                Float and grid systems
                <LessonControlButtons/>
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </div >
  );
}
