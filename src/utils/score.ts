
import type { Round } from '@/types'

export function computeScore(rounds: Round[], answers: Record<string, string>) {
  let correct = 0
  let total = 0
  for (const r of rounds) {
    for (const q of r.questions) {
      total += 1
      const picked = answers[q.id]
      if (picked) {
        const opt = q.options.find(o => o.id === picked)
        if (opt?.isCorrect) correct += 1
      }
    }
  }
  return { correct, total }
}
