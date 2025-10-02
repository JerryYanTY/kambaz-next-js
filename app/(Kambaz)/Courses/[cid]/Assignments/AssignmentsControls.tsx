import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function AssignmentsControls() {
    return (
        <div id="wd-assignments-controls" className="text-nowrap d-flex justify-content-end gap-2">
            <InputGroup style={{ maxWidth: "250px" }} className="me-auto">
                <InputGroupText>
                    <CiSearch />
                </InputGroupText>
                <FormControl type="search" placeholder="Search..." />
            </InputGroup>
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </Button>
            <Button variant="light" size="lg" className="me-1 float-end" id="wd-add-group-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
        </div>
    );
}