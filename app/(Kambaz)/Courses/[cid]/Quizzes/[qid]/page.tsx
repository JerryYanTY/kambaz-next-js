"use client";
import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Form, ListGroup, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import * as client from "../client";
import { RootState } from "../../../../store";
import { setAttemptsForQuiz, upsertQuiz } from "../reducer";
import Link from "next/link";

export default function QuizDetailPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(null);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [previewResult, setPreviewResult] = useState<any>(null);
  const attempts =
    useSelector(
      (s: RootState) => s.quizzesReducer.attemptsByQuiz[qid as string]
    ) || [];
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const maxPoints = useMemo(() => {
    if (!quiz) return 0;
    if (quiz.points) return quiz.points;
    return (quiz.questions || []).reduce(
      (sum: number, q: any) => sum + (Number(q.points) || 0),
      0
    );
  }, [quiz]);

  const availabilityStatus = useMemo(() => {
    if (!quiz) return "";
    const now = new Date();
    const availableFrom = quiz.available_from ? new Date(quiz.available_from) : null;
    const availableUntil = quiz.available_until ? new Date(quiz.available_until) : null;
    if (availableUntil && now > availableUntil) return "Closed";
    if (availableFrom && now < availableFrom)
      return `Not available until ${new Date(quiz.available_from).toLocaleString()}`;
    return "Available";
  }, [quiz]);

  const loadQuiz = async () => {
    if (!qid) return;
    const data = await client.findQuizById(qid as string);
    setQuiz(data);
    dispatch(upsertQuiz(data));
  };

  const loadAttempts = async () => {
    if (!qid) return;
    try {
      const data = await client.findMyAttempts(qid as string);
      dispatch(setAttemptsForQuiz({ quizId: qid as string, attempts: data }));
    } catch (err) {
      // ignore if user not logged in
    }
  };

  const maxAttempts = useMemo(() => {
    if (!quiz) return 1;
    return quiz.multipleAttempts ? quiz.maxAttempts || 1 : 1;
  }, [quiz]);

  const isClosedForStudent = useMemo(() => {
    if (!quiz) return true;
    const now = new Date();
    const availableFrom = quiz.available_from ? new Date(quiz.available_from) : null;
    const availableUntil = quiz.available_until ? new Date(quiz.available_until) : null;
    if (availableFrom && now < availableFrom) return true;
    if (availableUntil && now > availableUntil) return true;
    return false;
  }, [quiz]);

  const attemptsLeft = Math.max(0, maxAttempts - (attempts?.length || 0));
  const latestAttempt = attempts?.[0];

  useEffect(() => {
    if (latestAttempt && !started) {
      setAnswers(latestAttempt.answers || {});
    }
  }, [latestAttempt, started]);

  const handleSubmit = async () => {
    if (!qid) return;
    if (isFaculty) {
      const result = await client.submitAttempt(qid as string, answers, { preview: true });
      setPreviewResult({ ...result, answers });
      setAnswers(answers);
      setStarted(false);
      return;
    }
    if (attemptsLeft <= 0) {
      // eslint-disable-next-line no-alert
      alert("No attempts remaining.");
      return;
    }
    try {
      const attempt = await client.submitAttempt(qid as string, answers);
      dispatch(
        setAttemptsForQuiz({
          quizId: qid as string,
          attempts: [attempt, ...(attempts || [])],
        })
      );
      setAnswers(attempt.answers || {});
      setStarted(false);
    } catch (err: any) {
      // eslint-disable-next-line no-alert
      alert(err?.response?.data?.message || "Please sign in to submit a quiz.");
    }
  };

  useEffect(() => {
    loadQuiz();
    loadAttempts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  return (
    <div id="wd-quiz-detail">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3 className="mb-0">{quiz?.title ?? "Quiz"}</h3>
          <div className="text-secondary small">
            {quiz?.description ?? "Answer the questions and submit."}
          </div>
          {quiz && (
            <div className="mt-1">
              <Badge bg={quiz.published ? "success" : "secondary"}>
                {quiz.published ? "Published" : "Unpublished"}
              </Badge>
            </div>
          )}
        </div>
        <Link href={`/Courses/${cid}/Quizzes`} className="text-decoration-none">
          <Button variant="outline-secondary" size="sm" className="me-2">
            Back to Quizzes
          </Button>
        </Link>
        {isFaculty && (
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/edit`}
            className="text-decoration-none me-2"
          >
            <Button variant="primary" size="sm">Edit Quiz</Button>
          </Link>
        )}
      </div>

      {(latestAttempt || previewResult) && (
        <Alert variant="success">
          Last score: {(previewResult || latestAttempt)?.score} / {(previewResult || latestAttempt)?.maxPoints ?? maxPoints} (
          {Math.round(
            (((previewResult || latestAttempt)?.score || 0) /
              ((previewResult || latestAttempt)?.maxPoints || maxPoints || 1)) *
              100
          )}
          %)
        </Alert>
      )}
      {!isFaculty && attemptsLeft <= 0 && (
        <Alert variant="warning">
          No attempts remaining for this quiz.
        </Alert>
      )}

      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="text-secondary small">
              Availability: {availabilityStatus}
            </div>
            <div className="text-secondary small">
              Due: {quiz?.due ? new Date(quiz.due).toLocaleString() : "No date"}
            </div>
          </div>
          <div className="fw-semibold">Total Points: {maxPoints}</div>
          <div className="text-secondary small mt-2 d-flex flex-column gap-1">
            <span>Quiz Type: {mapQuizType(quiz?.quizType)}</span>
            <span>Assignment Group: {mapAssignmentGroup(quiz?.assignmentGroup)}</span>
            <span>Shuffle Answers: {quiz?.shuffleAnswers ? "Yes" : "No"}</span>
            <span>Time Limit: {quiz?.timeLimitMinutes ?? 20} minutes</span>
            <span>
              Multiple Attempts: {quiz?.multipleAttempts ? "Yes" : "No"}{" "}
              {quiz?.multipleAttempts ? `(max ${quiz?.maxAttempts ?? 1})` : ""}
            </span>
            <span>Show Correct Answers: {quiz?.showCorrectAnswers ?? "N/A"}</span>
            <span>Access Code: {quiz?.accessCode ? "Required" : "None"}</span>
            <span>One Question at a Time: {quiz?.oneQuestionAtATime ? "Yes" : "No"}</span>
            <span>Webcam Required: {quiz?.webcamRequired ? "Yes" : "No"}</span>
            <span>
              Lock Questions After Answering:
              {quiz?.lockQuestionsAfterAnswering ? " Yes" : " No"}
            </span>
          </div>
        </Card.Body>
      </Card>

      {!started && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <Button
            variant="primary"
            onClick={() => {
              setStarted(true);
              setPreviewResult(null);
              setAnswers({});
            }}
            disabled={
              (!isFaculty && attemptsLeft <= 0) ||
              (!isFaculty && isClosedForStudent)
            }
          >
            {isFaculty ? "Preview Quiz" : "Start Quiz"}
          </Button>
          {!isFaculty && (
            <>
              <Badge bg="secondary">Attempts left: {attemptsLeft}</Badge>
              {isClosedForStudent && (
                <Badge bg="warning" text="dark">
                  Closed
                </Badge>
              )}
            </>
          )}
        </div>
      )}

      {(isFaculty || started || (!isFaculty && latestAttempt)) && (
        <Form>
          <ListGroup className="mb-3">
            {(quiz?.questions || []).map((q: any, idx: number) => (
              <QuestionCard
                key={q._id}
                question={q}
                idx={idx}
                answers={answers}
                setAnswers={setAnswers}
                disabled={!started}
                reviewAnswers={
                  (isFaculty ? previewResult?.answers : latestAttempt?.answers) || {}
                }
              />
            ))}
          </ListGroup>

          {started && (
            <Button variant="primary" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </Form>
      )}
    </div>
  );
}

type QuestionCardProps = {
  question: any;
  idx: number;
  answers: Record<string, string>;
  setAnswers: (updater: any) => void;
  disabled: boolean;
  reviewAnswers: Record<string, string>;
};

function QuestionCard({
  question,
  idx,
  answers,
  setAnswers,
  disabled,
  reviewAnswers,
}: QuestionCardProps) {
  const normalize = (val: string) => String(val ?? "").toLowerCase().trim();
  const userAnswer = answers?.[question._id] ?? reviewAnswers?.[question._id];
  const correctOptions = Array.isArray(question.correctOption)
    ? question.correctOption
    : question.type === "FILL_BLANK"
      ? question.options || []
      : [question.correctOption];
  const isCorrect = correctOptions.some(
    (opt: string) => normalize(opt) === normalize(userAnswer)
  );

  const renderOptions = () => {
    if (question.type === "FILL_BLANK") {
      return (
        <Form.Control
          as="textarea"
          rows={2}
          disabled={disabled}
          value={answers?.[question._id] ?? ""}
          onChange={(e) =>
            setAnswers((prev: any) => ({
              ...prev,
              [question._id]: e.target.value,
            }))
          }
        />
      );
    }
    return (question.options || []).map((opt: string, optIdx: number) => (
      <Form.Check
        key={optIdx}
        type="radio"
        name={question._id}
        id={`${question._id}-${optIdx}`}
        label={opt}
        disabled={disabled}
        checked={String(answers?.[question._id] ?? "") === opt}
        onChange={() =>
          setAnswers((prev: any) => ({
            ...prev,
            [question._id]: opt,
          }))
        }
        className={`mb-1 ${
          reviewAnswers?.[question._id]
            ? isCorrect && opt === userAnswer
              ? "text-success"
              : !isCorrect && opt === userAnswer
                ? "text-danger"
                : ""
            : ""
        }`}
      />
    ));
  };

  return (
    <ListGroup.Item className="mb-2">
      <div className="d-flex justify-content-between align-items-center">
        <div className="fw-semibold">
          {idx + 1}. {question.title}
        </div>
        <span className="text-secondary small">{question.points ?? 0} pts</span>
      </div>
      {question.prompt && (
        <div className="text-secondary small mt-1">{question.prompt}</div>
      )}
      <div className="mt-2">{renderOptions()}</div>
      {reviewAnswers?.[question._id] && (
        <div className={`mt-2 ${isCorrect ? "text-success" : "text-danger"}`}>
          {isCorrect ? "Correct" : "Incorrect"}
        </div>
      )}
    </ListGroup.Item>
  );
}

const mapQuizType = (val?: string) => {
  switch (val) {
    case "PRACTICE_QUIZ":
      return "Practice Quiz";
    case "GRADED_SURVEY":
      return "Graded Survey";
    case "UNGRADED_SURVEY":
      return "Ungraded Survey";
    default:
      return "Graded Quiz";
  }
};

const mapAssignmentGroup = (val?: string) => {
  switch (val) {
    case "EXAMS":
      return "Exams";
    case "ASSIGNMENTS":
      return "Assignments";
    case "PROJECT":
      return "Project";
    default:
      return "Quizzes";
  }
};
