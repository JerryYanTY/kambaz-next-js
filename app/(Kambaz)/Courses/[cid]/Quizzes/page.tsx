"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../../store";
import * as client from "./client";
import { removeQuiz, setAttemptsForQuiz, setQuizzes, upsertQuiz } from "./reducer";

const formatDate = (date?: string) => {
  if (!date) return "No date";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "No date";
  return d.toLocaleString();
};

const availabilityStatus = (quiz: any) => {
  const now = new Date();
  const availableFrom = quiz?.available_from ? new Date(quiz.available_from) : null;
  const availableUntil = quiz?.available_until ? new Date(quiz.available_until) : null;

  if (availableUntil && now > availableUntil) return "Closed";
  if (availableFrom && now < availableFrom)
    return `Not available until ${formatDate(quiz.available_from)}`;
  return "Available";
};

export default function QuizPage() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<"TITLE" | "DUE" | "AVAILABLE">("TITLE");
  const { quizzes, attemptsByQuiz } = useSelector((s: RootState) => s.quizzesReducer);
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const courseQuizzes = useMemo(() => {
    const filtered = quizzes.filter((q: any) => q.course === cid);
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "TITLE") {
        return (a.title || "").localeCompare(b.title || "");
      }
      if (sortBy === "DUE") {
        return new Date(a.due || 0).getTime() - new Date(b.due || 0).getTime();
      }
      // AVAILABLE
      return (
        new Date(a.available_from || 0).getTime() -
        new Date(b.available_from || 0).getTime()
      );
    });
    return sorted;
  }, [quizzes, cid, sortBy]);

  const loadQuizzes = async () => {
    if (!cid) return;
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
    if (!isFaculty && data?.length) {
      const attempts = await Promise.all(
        data.map(async (q: any) => {
          try {
            const res = await client.findMyAttempts(q._id);
            return { id: q._id, attempts: res };
          } catch {
            return { id: q._id, attempts: [] };
          }
        })
      );
      attempts.forEach(({ id, attempts }) =>
        dispatch(setAttemptsForQuiz({ quizId: id, attempts }))
      );
    }
  };

  const handleDelete = async (quizId: string, title: string) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm(`Delete quiz "${title}"?`);
      if (!ok) return;
    }
    await client.deleteQuiz(quizId);
    dispatch(removeQuiz(quizId));
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = await client.updateQuiz({ ...quiz, published: !quiz.published });
    dispatch(upsertQuiz(updated));
  };

  const handleCreateAndEdit = async () => {
    if (!cid) return;
    const newQuiz = await client.createQuiz(cid as string, {
      title: "New Quiz",
      description: "Edit details and questions",
      points: 0,
      published: false,
      questions: [],
      quizType: "GRADED_QUIZ",
      assignmentGroup: "QUIZZES",
      shuffleAnswers: true,
      timeLimitMinutes: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: "Immediately",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
    });
    dispatch(upsertQuiz(newQuiz));
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
  };

  useEffect(() => {
    loadQuizzes();
  }, [cid]);

  return (
    <div id="wd-quizzes">
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div>
          <h2 className="mb-0">Quizzes</h2>
          <p className="text-secondary small mb-0">
            View quizzes for this course. Students can take a quiz; faculty can
            manage quizzes.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <DropdownButton
            id="quiz-sort"
            title={`Sort: ${
              sortBy === "TITLE"
                ? "Name"
                : sortBy === "DUE"
                  ? "Due Date"
                  : "Available Date"
            }`}
            variant="outline-secondary"
            size="sm"
          >
            <Dropdown.Item onClick={() => setSortBy("TITLE")}>Name</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("DUE")}>Due Date</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("AVAILABLE")}>
              Available Date
            </Dropdown.Item>
          </DropdownButton>
          {isFaculty && (
            <Button variant="danger" onClick={handleCreateAndEdit}>
              + Quiz
            </Button>
          )}
        </div>
      </div>

      {courseQuizzes.length === 0 && (
        <div className="alert alert-info">
          No quizzes yet. Click <strong>+ Quiz</strong> to create one.
        </div>
      )}

      <ListGroup className="rounded-0">
        {courseQuizzes.map((quiz: any) => {
          const attempts = attemptsByQuiz?.[quiz._id] || [];
          const latest = attempts[0];
          const questionCount = quiz.questions?.length ?? 0;
          const points =
            quiz.points ??
            (quiz.questions || []).reduce(
              (sum: number, q: any) => sum + (Number(q.points) || 0),
              0
            );
          return (
            <ListGroupItem
              key={quiz._id}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <span
                    role="button"
                    aria-label={quiz.published ? "Unpublish quiz" : "Publish quiz"}
                    onClick={() => isFaculty && handleTogglePublish(quiz)}
                    title={
                      quiz.published
                        ? "Published (click to unpublish)"
                        : "Unpublished (click to publish)"
                    }
                    style={{ cursor: isFaculty ? "pointer" : "default" }}
                  >
                    {quiz.published ? "[P]" : "[U]"}
                  </span>
                  <Link
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="fw-semibold text-decoration-none"
                  >
                    {quiz.title}
                  </Link>
                </div>
                <span className="text-secondary small">
                  {availabilityStatus(quiz)} | Due {formatDate(quiz.due)} | Available Until {formatDate(quiz.available_until)} | {points ?? 0} pts | {questionCount} questions
                  {latest && !isFaculty
                    ? ` | Last score: ${latest.score}/${latest.maxPoints ?? points}`
                    : ""}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Badge bg={quiz.published ? "success" : "secondary"}>
                  {quiz.published ? "Published" : "Unpublished"}
                </Badge>
                <Link
                  href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                  className="text-decoration-none"
                >
                  <Button variant="outline-primary" size="sm">
                    {isFaculty ? "Preview" : "Take Quiz"}
                  </Button>
                </Link>
                {isFaculty && (
                  <DropdownButton
                    id={`quiz-${quiz._id}-menu`}
                    title="..."
                    align="end"
                    variant="outline-secondary"
                    size="sm"
                  >
                    <Dropdown.Item
                      onClick={() =>
                        router.push(`/Courses/${cid}/Quizzes/${quiz._id}/edit`)
                      }
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDelete(quiz._id, quiz.title)}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownButton>
                )}
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
