import type { NormalizedQuestion, NormalizedOption, Round } from '@/types'
import { getJson, endpoints } from './client'

//
// Types based on the JSON structure you showed
//
export type ActivityQuestion = {
  is_correct: boolean
  stimulus: string
  order: number
  user_answers: string[]
  feedback: string
}

export type Activity = {
  activity_name: string
  order: number
  questions?: ActivityQuestion[] // Activity One has this
  rounds?: {
    round_title: string
    order: number
    questions: ActivityQuestion[]
  }[]
}

export type ActivityB = {
  activity_name: string
  order: number
  questions?: { // Activity One has this
    round_title: string
    order: number
    questions: ActivityQuestion[]
  }[]
}

export type FlowRawA = {
  name: string
  heading: string
  activities: Activity[]
}

export type FlowRawB = {
  name: string
  heading: string
  activities: ActivityB[]
}

//
// Loader for Activity One (flat questions)
//
export async function loadFlowA(): Promise<Round[]> {
  const data = await getJson<FlowRawA>(endpoints.flowA)

  const activityOne = data.activities.find((a) => a.activity_name === 'Activity One')
  if (!activityOne?.questions) return []

  const questions: NormalizedQuestion[] = activityOne.questions.map((q, i) => {
    const options: NormalizedOption[] = [
      {
        id: `${i}_opt_correct`,
        text: q.stimulus,
        isCorrect: q.is_correct
      },
      {
        id: `${i}_opt_feedback`,
        text: q.feedback,
        isCorrect: !q.is_correct
      }
    ]
    return { id: `q-${i + 1}`, text: q.stimulus, options }
  })

  return [
    {
      id: 'activity-one',
      title: activityOne.activity_name,
      questions
    }
  ]
}

//
// Loader for Activity Two (nested rounds)
//
export async function loadFlowB(): Promise<Round[]> {
  const data = await getJson<FlowRawB>(endpoints.flowB)

  const activityTwo = data.activities.find((a) => a.activity_name === 'Activity Two')
  if (!activityTwo || !activityTwo.questions) {
    console.warn('Activity Two not found or has no rounds', data.activities)
    return []
  }

  const rounds: Round[] = activityTwo.questions.map((round, rIdx) => ({
    id: `round-${rIdx + 1}`,
    title: round.round_title,
    questions: round.questions.map((q, i) => {
      const options: NormalizedOption[] = [
        {
          id: `${rIdx}_${i}_opt_correct`,
          text: q.stimulus,
          isCorrect: q.is_correct
        },
        {
          id: `${rIdx}_${i}_opt_feedback`,
          text: q.feedback,
          isCorrect: !q.is_correct
        }
      ]
      return { id: `r${rIdx + 1}-q${i + 1}`, text: q.stimulus, options }
    })
  }))

  return rounds
}
