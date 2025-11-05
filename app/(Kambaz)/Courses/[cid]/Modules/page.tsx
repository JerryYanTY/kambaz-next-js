"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { FormControl } from "react-bootstrap";


export default function Modules() {
  const [modules, setModules] = useState<any[]>(db.modules);
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const addModule = () =>{
    setModules([...modules, {_id: uuidv4(), name: moduleName, course: cid, lessons: []}]);
    setModuleName("");
  };
  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m)=>m._id!== moduleId));
  };
  const editModule = (moduleId: string) =>{
    setModules(modules.map((m) => (m._id === moduleId ? {...m, editing: true}: m)))
  };
  const updateModule = (module: any) => {
    setModules(modules.map((m) => (m._id === module._id ? module: m)));
  };

  return (
    <div>
      <ModulesControls setModuleName={setModuleName}
      moduleName={moduleName}
      addModule={addModule} />
      <br /> <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem 
            key = {module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> 
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl className="w-50 d-inline-block"
                  onChange={(e) => updateModule({ ... module, name: e.target.value})}
                  onKeyDown={(e)=> {
                    if (e.key == "Enter") {
                      updateModule({...module, editing:false});
                    }
                  }}
                  defaultValue={module.name}/>
                )}
                <ModuleControlButtons 
                moduleId={module._id}
                deleteModule={deleteModule}
                editModule={editModule}/>
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem className="wd-lesson p-3 ps-1"
                    key={lesson._id}>
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}

{
  /* Implement Collapse All button, View Progress button, etc. */
}
{
  /* <ListGroup id="wd-modules" className="rounded-0">
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
} */
}
