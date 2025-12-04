"use client";
import { useEffect, useState } from "react";
import { Button, Card, Form, Row, Col, Nav, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import * as client from "../../client";
import { upsertQuiz } from "../../reducer";

type EditableQuestion = {
  _id: string;
  title: string;
  points: number;
  options: string[];
  correctOption: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
  prompt?: string;
};

export default function QuizEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const isNew = qid === "new";
  const router = useRouter();
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [quizType, setQuizType] = useState("GRADED_QUIZ");
  const [assignmentGroup, setAssignmentGroup] = useState("QUIZZES");
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(20);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState<number>(1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("Immediately");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
  const [questions, setQuestions] = useState<EditableQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<"DETAILS" | "QUESTIONS">("DETAILS");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState<EditableQuestion | null>(null);
  const [editingIsNew, setEditingIsNew] = useState(false);

  const loadQuiz = async () => {
    if (isNew || !qid) return;
    const data = await client.findQuizById(qid as string);
    setTitle(data.title ?? "");
    setDescription(data.description ?? "");
    setDue(data.due ? toLocalDateTime(data.due) : "");
    setAvailableFrom(
      data.available_from ? toLocalDateTime(data.available_from) : ""
    );
    setAvailableUntil(
      data.available_until ? toLocalDateTime(data.available_until) : ""
    );
    setQuizType(data.quizType || "GRADED_QUIZ");
    setAssignmentGroup(data.assignmentGroup || "QUIZZES");
    setShuffleAnswers(data.shuffleAnswers ?? true);
    setTimeLimitMinutes(data.timeLimitMinutes ?? 20);
    setMultipleAttempts(data.multipleAttempts ?? false);
    setMaxAttempts(data.maxAttempts ?? 1);
    setShowCorrectAnswers(data.showCorrectAnswers ?? "Immediately");
    setAccessCode(data.accessCode ?? "");
    setOneQuestionAtATime(data.oneQuestionAtATime ?? true);
    setWebcamRequired(data.webcamRequired ?? false);
    setLockQuestionsAfterAnswering(data.lockQuestionsAfterAnswering ?? false);
    setQuestions(
      (data.questions || []).map((q: any) => ({
        _id: q._id,
        title: q.title ?? "",
        points: q.points ?? 0,
        options: q.options || [],
        correctOption: q.correctOption ?? q.options?.[0] ?? "",
        type: q.type || "MULTIPLE_CHOICE",
        prompt: q.prompt ?? "",
      }))
    );
  };

  useEffect(() => {
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  const startEditingQuestion = (q: EditableQuestion, isNew = false) => {
    setEditingId(q._id);
    setEditingDraft({ ...q });
    setEditingIsNew(isNew);
    setActiveTab("QUESTIONS");
  };

  const addQuestion = () => {
    const draft: EditableQuestion = {
      _id: uuidv4(),
      title: "New question",
      points: 5,
      options: ["Option A", "Option B", "Option C"],
      correctOption: "Option A",
      type: "MULTIPLE_CHOICE",
      prompt: "",
    };
    startEditingQuestion(draft, true);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q._id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingDraft(null);
      setEditingIsNew(false);
    }
  };

  const commitQuestion = () => {
    if (!editingDraft) return;
    const cleaned = sanitizeDraft(editingDraft);
    setQuestions((prev) => {
      if (editingIsNew) {
        return [...prev, cleaned];
      }
      return prev.map((q) => (q._id === cleaned._id ? cleaned : q));
    });
    setEditingId(null);
    setEditingDraft(null);
    setEditingIsNew(false);
  };

  const cancelEditing = () => {
    if (editingIsNew) {
      // discard brand new
      setEditingIsNew(false);
    }
    setEditingId(null);
    setEditingDraft(null);
  };

  const sanitizeDraft = (draft: EditableQuestion): EditableQuestion => {
    if (draft.type === "TRUE_FALSE") {
      return {
        ...draft,
        options: ["true", "false"],
        correctOption: draft.correctOption || "true",
      };
    }
    if (draft.type === "FILL_BLANK") {
      const acceptable = (draft.options || []).map((o) => o.trim()).filter(Boolean);
      return {
        ...draft,
        options: acceptable.length ? acceptable : [draft.correctOption || ""],
        correctOption: acceptable[0] || draft.correctOption || "",
      };
    }
    // MULTIPLE_CHOICE
    const choices = (draft.options || []).map((o) => o.trim()).filter(Boolean);
    const correct =
      choices.includes(draft.correctOption) && draft.correctOption
        ? draft.correctOption
        : choices[0] || draft.correctOption || "";
    return {
      ...draft,
      options: choices,
      correctOption: correct,
    };
  };

  const toIso = (val: string) => (val ? new Date(val).toISOString() : undefined);

  const totalQuestionPoints = questions.reduce(
    (sum, q) => sum + (Number(q.points) || 0),
    0
  );

  const handleSave = async (publish = false, goToList = false) => {
    if (!cid) return;
    let nextQuestions = questions;
    if (editingDraft) {
      const cleaned = sanitizeDraft(editingDraft);
      nextQuestions = editingIsNew
        ? [...questions, cleaned]
        : questions.map((q) => (q._id === cleaned._id ? cleaned : q));
      setQuestions(nextQuestions);
      setEditingDraft(null);
      setEditingId(null);
      setEditingIsNew(false);
    }
    setSaving(true);
    const payload: any = {
      _id: isNew ? undefined : qid,
      title,
      description,
      course: cid,
      points: totalQuestionPoints,
      due: toIso(due),
      available_from: toIso(availableFrom),
      available_until: toIso(availableUntil),
      questions: nextQuestions,
      ...(publish ? { published: true } : {}),
      quizType,
      assignmentGroup,
      shuffleAnswers,
      timeLimitMinutes,
      multipleAttempts,
      maxAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
    };
    let saved;
    if (isNew) {
      saved = await client.createQuiz(cid as string, payload);
    } else {
      saved = await client.updateQuiz(payload);
    }
    dispatch(upsertQuiz(saved));
    setSaving(false);
    if (goToList) {
      router.push(`/Courses/${cid}/Quizzes`);
    } else {
      router.push(`/Courses/${cid}/Quizzes/${saved._id}`);
    }
  };

  return (
    <div id="wd-quiz-editor">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3 className="mb-0">{isNew ? "Create Quiz" : "Edit Quiz"}</h3>
          <div className="text-secondary small">
            Define quiz details and questions for this course.
          </div>
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </Button>
      </div>

      <Form>
        <Tab.Container
          activeKey={activeTab}
          onSelect={(k) => setActiveTab((k as "DETAILS" | "QUESTIONS") ?? "DETAILS")}
        >
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="DETAILS">Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="QUESTIONS">Questions</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="DETAILS">
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Quiz title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add quiz description..."
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Total Points (auto)</Form.Label>
                    <Form.Control value={totalQuestionPoints} readOnly />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Available From</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={availableFrom}
                      onChange={(e) => setAvailableFrom(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Due</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={due}
                      onChange={(e) => setDue(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Available Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={availableUntil}
                      onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Quiz Type</Form.Label>
                    <Form.Select
                      value={quizType}
                      onChange={(e) => setQuizType(e.target.value)}
                    >
                      <option value="GRADED_QUIZ">Graded Quiz</option>
                      <option value="PRACTICE_QUIZ">Practice Quiz</option>
                      <option value="GRADED_SURVEY">Graded Survey</option>
                      <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Assignment Group</Form.Label>
                    <Form.Select
                      value={assignmentGroup}
                      onChange={(e) => setAssignmentGroup(e.target.value)}
                    >
                      <option value="QUIZZES">Quizzes</option>
                      <option value="EXAMS">Exams</option>
                      <option value="ASSIGNMENTS">Assignments</option>
                      <option value="PROJECT">Project</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Shuffle Answers</Form.Label>
                    <Form.Select
                      value={shuffleAnswers ? "true" : "false"}
                      onChange={(e) => setShuffleAnswers(e.target.value === "true")}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Time Limit (minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      value={timeLimitMinutes}
                      onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Access Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="Optional"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Multiple Attempts</Form.Label>
                    <Form.Select
                      value={multipleAttempts ? "true" : "false"}
                      onChange={(e) => setMultipleAttempts(e.target.value === "true")}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>How Many Attempts</Form.Label>
                    <Form.Control
                      type="number"
                      value={maxAttempts}
                      disabled={!multipleAttempts}
                      onChange={(e) => setMaxAttempts(Number(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Show Correct Answers</Form.Label>
                    <Form.Control
                      type="text"
                      value={showCorrectAnswers}
                      onChange={(e) => setShowCorrectAnswers(e.target.value)}
                      placeholder="e.g., Immediately, After Due Date"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>One Question at a Time</Form.Label>
                    <Form.Select
                      value={oneQuestionAtATime ? "true" : "false"}
                      onChange={(e) => setOneQuestionAtATime(e.target.value === "true")}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Webcam Required</Form.Label>
                    <Form.Select
                      value={webcamRequired ? "true" : "false"}
                      onChange={(e) => setWebcamRequired(e.target.value === "true")}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Lock Questions After Answering</Form.Label>
                    <Form.Select
                      value={lockQuestionsAfterAnswering ? "true" : "false"}
                      onChange={(e) =>
                        setLockQuestionsAfterAnswering(e.target.value === "true")
                      }
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="mt-4 d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => handleSave(false, false)}
                  disabled={saving}
                  id="wd-save-quiz"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleSave(true, true)}
                  disabled={saving}
                >
                  {saving ? "Publishing..." : "Save & Publish"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="QUESTIONS">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex flex-column">
                  <h5 className="mb-0">Questions</h5>
                  <small className="text-secondary">
                    Total Points: {totalQuestionPoints}
                  </small>
                </div>
                <Button variant="outline-primary" size="sm" onClick={addQuestion}>
                  + New Question
                </Button>
              </div>

              {questions.length === 0 && !editingIsNew && (
                <div className="alert alert-info">No questions yet. Click “New Question” to add one.</div>
              )}

              <div className="d-flex flex-column gap-3">
                {questions.map((q, idx) => {
                  const isEditing = editingId === q._id;
                  return (
                    <Card key={q._id}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="fw-semibold">
                            Q{idx + 1}: {q.title}
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-secondary small text-uppercase">
                              {q.type.replace("_", " ")}
                            </span>
                            <span className="text-secondary small">
                              {q.points} pts
                            </span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => startEditingQuestion(q)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeQuestion(q._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        {!isEditing && (
                          <div className="text-secondary small">
                            {q.prompt || "No prompt provided."}
                          </div>
                        )}
                        {isEditing && editingDraft && (
                          <QuestionEditor
                            draft={editingDraft}
                            onChange={setEditingDraft}
                            onCancel={cancelEditing}
                            onSave={commitQuestion}
                          />
                        )}
                      </Card.Body>
                    </Card>
                  );
                })}

                {editingIsNew && editingDraft && !questions.find((q) => q._id === editingDraft._id) && (
                  <Card key={editingDraft._id}>
                    <Card.Body>
                      <div className="fw-semibold mb-2">New Question</div>
                      <QuestionEditor
                        draft={editingDraft}
                        onChange={setEditingDraft}
                        onCancel={cancelEditing}
                        onSave={commitQuestion}
                      />
                    </Card.Body>
                  </Card>
                )}
              </div>

              <div className="mt-4 d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => handleSave(false, false)}
                  disabled={saving}
                  id="wd-save-quiz-questions"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleSave(true, true)}
                  disabled={saving}
                >
                  {saving ? "Publishing..." : "Save & Publish"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Form>
    </div>
  );
}

type QuestionEditorProps = {
  draft: EditableQuestion;
  onChange: (q: EditableQuestion) => void;
  onSave: () => void;
  onCancel: () => void;
};

function QuestionEditor({ draft, onChange, onSave, onCancel }: QuestionEditorProps) {
  const update = (fields: Partial<EditableQuestion>) =>
    onChange({ ...draft, ...fields });

  const addChoice = () => {
    update({ options: [...(draft.options || []), "New choice"] });
  };

  const removeChoice = (idx: number) => {
    const copy = [...(draft.options || [])];
    copy.splice(idx, 1);
    update({ options: copy });
  };

  const renderMultipleChoice = () => (
    <>
      <Form.Group className="mb-2">
        <Form.Label>Choices (one per line)</Form.Label>
        {(draft.options || []).map((opt, idx) => (
          <div className="d-flex align-items-center mb-2" key={idx}>
            <Form.Check
              type="radio"
              name={`${draft._id}-correct`}
              className="me-2"
              checked={draft.correctOption === opt}
              onChange={() => update({ correctOption: opt })}
            />
            <Form.Control
              as="textarea"
              rows={1}
              value={opt}
              onChange={(e) => {
                const copy = [...(draft.options || [])];
                copy[idx] = e.target.value;
                update({ options: copy });
              }}
            />
            <Button
              variant="link"
              className="text-danger ms-2"
              onClick={() => removeChoice(idx)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button variant="outline-primary" size="sm" onClick={addChoice}>
          + Add Choice
        </Button>
      </Form.Group>
    </>
  );

  const renderTrueFalse = () => (
    <Form.Group className="mb-2">
      <Form.Label>Correct Answer</Form.Label>
      <div className="d-flex gap-3">
        <Form.Check
          inline
          type="radio"
          id={`${draft._id}-true`}
          name={`${draft._id}-tf`}
          label="True"
          checked={draft.correctOption === "true"}
          onChange={() => update({ correctOption: "true", options: ["true", "false"] })}
        />
        <Form.Check
          inline
          type="radio"
          id={`${draft._id}-false`}
          name={`${draft._id}-tf`}
          label="False"
          checked={draft.correctOption === "false"}
          onChange={() => update({ correctOption: "false", options: ["true", "false"] })}
        />
      </div>
    </Form.Group>
  );

  const renderFillBlank = () => (
    <Form.Group className="mb-2">
      <Form.Label>Possible Correct Answers</Form.Label>
      {(draft.options || []).map((opt, idx) => (
        <div className="d-flex align-items-center mb-2" key={idx}>
          <Form.Control
            value={opt}
            onChange={(e) => {
              const copy = [...(draft.options || [])];
              copy[idx] = e.target.value;
              update({ options: copy });
            }}
            placeholder="Enter acceptable answer"
          />
          <Button
            variant="link"
            className="text-danger ms-2"
            onClick={() => removeChoice(idx)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant="outline-primary" size="sm" onClick={addChoice}>
        + Add Answer
      </Button>
    </Form.Group>
  );

  return (
    <div className="d-flex flex-column gap-3">
      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Question Title</Form.Label>
            <Form.Control
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="Question title"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={draft.points}
              onChange={(e) => update({ points: Number(e.target.value) })}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={draft.type}
              onChange={(e) =>
                update({
                  type: e.target.value as EditableQuestion["type"],
                  options:
                    e.target.value === "TRUE_FALSE"
                      ? ["true", "false"]
                      : draft.options || [],
                  correctOption:
                    e.target.value === "TRUE_FALSE"
                      ? "true"
                      : e.target.value === "FILL_BLANK"
                        ? draft.options?.[0] || ""
                        : draft.correctOption,
                })
              }
            >
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option value="TRUE_FALSE">True / False</option>
              <option value="FILL_BLANK">Fill in the Blank</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group>
        <Form.Label>Prompt</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={draft.prompt ?? ""}
          onChange={(e) => update({ prompt: e.target.value })}
          placeholder="Enter the question text"
        />
      </Form.Group>

      {draft.type === "MULTIPLE_CHOICE" && renderMultipleChoice()}
      {draft.type === "TRUE_FALSE" && renderTrueFalse()}
      {draft.type === "FILL_BLANK" && renderFillBlank()}

      <div className="d-flex gap-2">
        <Button variant="primary" size="sm" onClick={onSave}>
          Save Question
        </Button>
        <Button variant="outline-secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

const toLocalDateTime = (iso: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};
