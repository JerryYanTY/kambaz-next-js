"use client";
import { useState } from "react";
import { Form, FormSelect } from "react-bootstrap";
import { FormLabel, FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { BsCalendar2Event } from "react-icons/bs";

export default function AssignmentEditor() {
  const [submissionType, setSubmissionType] = useState("Online");

  return (
    <div id="wd-assignments-editor">
      <Form>
        <div className="form-group mb-3" id="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl type="text" defaultValue="A1 - ENV + HTML" />
        </div>

        <div className="form-group mb-3" id="wd-description">
          <FormLabel>
            Description
          </FormLabel>
          <FormControl
            as="textarea"
            rows={8}
            defaultValue="some description..." />
        </div>


        <Row className="form-group mb-3" id="wd-points">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl type="number" defaultValue={100} />
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
          <FormSelect defaultValue="Points">
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
            <Form.Check id="wd-text-entry" type="checkbox" label="Text Entry" />
            <Form.Check id="wd-website-url" type="checkbox" label="Website URL" />
            <Form.Check id="wd-media-recordings" type="checkbox" label="Media Recordings" />
            <Form.Check id="wd-student-annotation" type="checkbox" label="Student Annotation" />
            <Form.Check id="wd-file-upload" type="checkbox" label="File Upload" />
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
            <FormControl type="text" defaultValue='Everyone'> 
            </FormControl>
            <div className="form-group mb-3" id="wd-due-date">
              <Form.Label className="fw-semibold">
                Due
                </Form.Label>
              <InputGroup>
                <FormControl type="datetime-local" defaultValue="2024-05-13 23:59:59" />
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
                <FormControl type="datetime-local" defaultValue="2024-05-12 23:59:59" />
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
                <FormControl type="datetime-local" defaultValue="2024-05-20 23:59:59" />
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
