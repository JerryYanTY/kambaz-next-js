import AssignmentEditor from "./Editor";
import  Button  from "react-bootstrap/Button";
export default function Editor() {
    return (
   <div id ="wd-editor">
    <h1>Assignment Editor</h1>
        <AssignmentEditor/>
        <hr className="my-4">
        </hr>
        <div className="d-flex justify-content-end gap-2">
            <Button variant="light">Cancel</Button>
            <Button variant="danger">Save</Button>
        </div>
   </div>

    );
}