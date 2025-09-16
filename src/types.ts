
export type NormalizedOption = { id: string; text: string; isCorrect: boolean }
export type NormalizedQuestion = { id: string; text: string; options: NormalizedOption[] }
export type Round = { id: string; title?: string; questions: NormalizedQuestion[] }

export type FlowId = 'A' | 'B'

export type QuizState = {
  flow: FlowId
  rounds: Round[]
  currentRound: number
  currentQuestion: number
  answers: Record<string, string>
}
