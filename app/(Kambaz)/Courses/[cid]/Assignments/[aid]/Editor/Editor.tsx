"use client";
import { useState } from "react";
import { Form, FormSelect } from "react-bootstrap";
import { FormLabel, FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { BsCalendar2Event } from "react-icons/bs";
import { useParams } from "next/navigation";

import * as db from "../../../../../Database"

export default function AssignmentEditor() {
  const {cid, aid} = useParams();
  const assignments = db.assignments;
  const assignment = Array.isArray(assignments)
  ? assignments.find((a) => a.course === cid && a._id == aid) || null :
  null;
  const initialSubmissionType = assignment?.online_or_paper === "paper" ? "Paper-Copy" : "Online";
  const [submissionType, setSubmissionType] = useState(initialSubmissionType);

  const hasSubmissionType = (key: any) =>
    Array.isArray(assignment?.submission_types) &&
    assignment.submission_types.includes(key);

  const toLocalDateTime = (iso:any) => {
    if(!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) 
      return "";
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0,16);
  }

  return (
    <div id="wd-assignments-editor">
      <Form>
        <div className="form-group mb-3" id="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl type="text" defaultValue={assignment?.title } />
        </div>

        <div className="form-group mb-3" id="wd-description">
          <FormLabel>
            Description
          </FormLabel>
          <FormControl
            as="textarea"
            rows={8}
            defaultValue={assignment?.description} />
        </div>


        <Row className="form-group mb-3" id="wd-points">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl type="number" defaultValue={assignment?.points} />
          </Col>
        </Row>



        <Row className="form-group mb-3" id="wd-group">
          <FormLabel column sm={2}>
            Assignment Group
          </FormLabel>
          <Col sm={10}>
            <FormSelect defaultValue="Assignment">
              <option value="Assignment">Assignment</option>
              <option value="Exam">Exam</option>
              <option value="Quiz">Quiz</option>
            </FormSelect>
          </Col>
        </Row>
        
        <Row className="form-group mb-3" id="wd-display-grade-as">
          <FormLabel column sm={2}>
            Display Grade As
          </FormLabel>
          <Col sm={10}>
          <FormSelect defaultValue={assignment?.grading_type === "percentage" ? "Percentage" : "Points"}>
            <option value="Points">Points</option>
            <option value="Percentage">Percentage</option>
          </FormSelect>
          </Col>
        </Row>

        <Row className="form-group mb-3" id="wd-submission-type">
          <FormLabel column sm={2}>
            Submission Type
          </FormLabel>
          <Col sm={10}>
          <div className="form-group mb-2 boarder rounded p-3 shadow-sm" id="wd-submission-type">
            <FormSelect value={submissionType}
            onChange={(e)=>setSubmissionType(e.target.value)}>
            <option value="Online">Online</option>
            <option value="Paper-Copy">Paper Copy</option>
            </FormSelect>
          
          {
            submissionType==="Online" && (
              <>
              <div className="form-group mt-3">
          <Form.Label className="fw-semibold">
            Online Entry Options
            </Form.Label>
          <div>
            <Form.Check id="wd-text-entry" 
            type="checkbox" 
            label="Text Entry" 
            defaultChecked = {hasSubmissionType("text_entry")}/>
            <Form.Check id="wd-website-url" 
            type="checkbox" 
            label="Website URL" 
            defaultChecked = {hasSubmissionType("url")}/>
            <Form.Check id="wd-media-recordings" 
            type="checkbox" 
            label="Media Recordings" 
            defaultChecked = {hasSubmissionType("media")}/>
            <Form.Check id="wd-student-annotation" 
            type="checkbox" 
            label="Student Annotation" 
            defaultChecked = {hasSubmissionType("annotation")}/>
            <Form.Check id="wd-file-upload" 
            type="checkbox" 
            label="File Upload" 
            defaultChecked = {hasSubmissionType("online_upload")}/>
          </div>      
        </div>
              </>
            )
          }
          </div>
          </Col>
        </Row>

        <Row className="form-group mb-3" id="wd-assign-to">
          <FormLabel column sm={2}>
            Assign
          </FormLabel>
          <Col sm={10}>
          <div className="form-group mb-2 boarder rounded p-3 shadow-sm" id="wd-assign-to">
            <FormLabel className="fw-semibold mb-2">
              Assign To
            </FormLabel>
            <FormControl type="text" defaultValue={assignment?.assign_to}> 
            </FormControl>
            <div className="form-group mb-3" id="wd-due-date">
              <Form.Label className="fw-semibold">
                Due
                </Form.Label>
              <InputGroup>
                <FormControl type="datetime-local" defaultValue={toLocalDateTime(assignment?.due)} />
                <InputGroup.Text><BsCalendar2Event /></InputGroup.Text>
              </InputGroup>
            </div>

            <Row className="g-3">
              <Col md={6}>
              <div className="form-group" id="wd-available-from">
                <FormLabel className="fw-semibold">
                  Available from
                </FormLabel>
                <InputGroup>
                <FormControl type="datetime-local" defaultValue={toLocalDateTime(assignment?.available_from)} />
                <InputGroup.Text><BsCalendar2Event /></InputGroup.Text>    
                </InputGroup>            
              </div>
              </Col>
              <Col md={6}>
              <div className="form-group" id="wd-available-until">
              <FormLabel className="fw-semibold">
                Until
              </FormLabel>
              <InputGroup>
                <FormControl type="datetime-local" defaultValue={toLocalDateTime(assignment?.available_until)} />
                <InputGroup.Text><BsCalendar2Event /></InputGroup.Text>    
                </InputGroup>
              </div>
              </Col>
            </Row>
          </div>
          
          </Col>
        </Row>
      </Form>
    </div> 
  );
}
