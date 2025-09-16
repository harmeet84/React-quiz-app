
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { FlowId, Round, QuizState } from '@/types'

const initialState: QuizState = {
  flow: 'A',
  rounds: [],
  currentRound: 0,
  currentQuestion: 0,
  answers: {}
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    init(state, action: PayloadAction<{ flow: FlowId; rounds: Round[] }>) {
      state.flow = action.payload.flow
      state.rounds = action.payload.rounds
      state.currentRound = 0
      state.currentQuestion = 0
      state.answers = {}
    },
    answer(state, action: PayloadAction<{ questionId: string; optionId: string }>) {
      state.answers[action.payload.questionId] = action.payload.optionId
    },
    nextQuestion(state) {
      state.currentQuestion += 1
    },
    nextRound(state) {
      state.currentRound += 1
      state.currentQuestion = 0
    },
    reset() {
      return initialState
    }
  }
})

export const { init, answer, nextQuestion, nextRound, reset } = quizSlice.actions
export default quizSlice.reducer
