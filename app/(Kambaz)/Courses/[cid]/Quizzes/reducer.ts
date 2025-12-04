import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type QuizQuestion = {
  _id: string;
  title: string;
  type: string;
  points: number;
  options?: string[];
  correctOption?: string;
};

export type Quiz = {
  _id: string;
  course: string;
  owner?: string;
  title: string;
  description?: string;
  points?: number;
  available_from?: string;
  available_until?: string;
  due?: string;
  published?: boolean;
  quizType?: string;
  assignmentGroup?: string;
  shuffleAnswers?: boolean;
  timeLimitMinutes?: number;
  multipleAttempts?: boolean;
  maxAttempts?: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
  questions?: QuizQuestion[];
};

type QuizState = {
  quizzes: Quiz[];
  attemptsByQuiz: Record<string, any[]>;
};

const initialState: QuizState = {
  quizzes: [],
  attemptsByQuiz: {},
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = (action.payload || []).filter(Boolean);
    },
    upsertQuiz: (state, action: PayloadAction<Quiz>) => {
      const quiz = action.payload;
      if (!quiz || !quiz._id) return;
      const idx = state.quizzes.findIndex((q) => q._id === quiz._id);
      if (idx >= 0) {
        state.quizzes[idx] = quiz;
      } else {
        state.quizzes.push(quiz);
      }
    },
    removeQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },
    setAttemptsForQuiz: (
      state,
      action: PayloadAction<{ quizId: string; attempts: any[] }>
    ) => {
      const { quizId, attempts } = action.payload;
      state.attemptsByQuiz[quizId] = attempts;
    },
  },
});

export const { setQuizzes, upsertQuiz, removeQuiz, setAttemptsForQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
