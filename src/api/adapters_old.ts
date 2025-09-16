
import type { NormalizedQuestion, NormalizedOption, Round } from '@/types'
import { getJson, endpoints } from './client'

export type FlowARaw = {
  quizId: string
  questions: {
    id: string
    question: string
    choices: string[]
    answerIndex: number
  }[]
}

export type FlowBRaw = {
  rounds: {
    roundId: string
    title?: string
    items: {
      key: string
      prompt: string
      options: { id: string; text: string; isCorrect: boolean }[]
    }[]
  }[]
}

export async function loadFlowA(): Promise<Round[]> {
  const data = await getJson<FlowARaw>(endpoints.flowA)
  const questions: NormalizedQuestion[] = data.questions.map((q) => {
    const options: NormalizedOption[] = q.choices.map((text, i) => ({
      id: `${q.id}_opt_${i}`,
      text,
      isCorrect: i === q.answerIndex
    }))
    return { id: q.id, text: q.question, options }
  })
  return [{ id: data.quizId ?? 'round-1', title: 'All Questions', questions }]
}

export async function loadFlowB(): Promise<Round[]> {
  const data = await getJson<FlowBRaw>(endpoints.flowB)
  const rounds: Round[] = data.rounds.map((r) => ({
    id: r.roundId,
    title: r.title,
    questions: r.items.map((it) => ({
      id: it.key,
      text: it.prompt,
      options: it.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect }))
    }))
  }))
  return rounds
}
