"use client";
import { useParams } from "next/navigation";
import AssignmentEditor from "./Editor";
export default function Editor() {
    const {cid} = useParams();
    return (
   <div id ="wd-editor">
    <h1>Assignment Editor</h1>
        <AssignmentEditor/>
   </div>

    );
}