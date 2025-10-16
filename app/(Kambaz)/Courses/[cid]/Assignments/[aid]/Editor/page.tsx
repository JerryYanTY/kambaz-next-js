"use client";
import { useParams } from "next/navigation";
import AssignmentEditor from "./Editor";
import  Button  from "react-bootstrap/Button";
export default function Editor() {
    const {cid} = useParams();
    const backHref = `/Courses/${cid}/Assignments`;
    return (
   <div id ="wd-editor">
    <h1>Assignment Editor</h1>
        <AssignmentEditor/>
        <hr className="my-4">
        </hr>
        <div className="d-flex justify-content-end gap-2">
            <Button variant="light" href ={backHref}>Cancel</Button>
            <Button variant="danger"href ={backHref}>Save</Button>
        </div>
   </div>

    );
}