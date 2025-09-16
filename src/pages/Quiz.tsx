
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FlowId, Round } from '@/types'
import { loadFlowA, loadFlowB } from '@/api/adapters'
import QuestionCard from '@/components/QuestionCard'
import Progress from '@/components/Progress'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { init, answer as answerAction, nextQuestion as nextQuestionAction, nextRound as nextRoundAction, reset as resetAction } from '@/store/quizSlice'
import { computeScore } from '@/utils/score'

export default function Quiz({ flow }: { flow: FlowId }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { rounds, currentRound, currentQuestion, answers } = useAppSelector((s) => s.quiz)
  const isMulti = flow === 'B'

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    const loader = flow === 'A' ? loadFlowA : loadFlowB
    loader().then((r) => {
      if (!mounted) return
      dispatch(init({ flow, rounds: r }))
      setLoading(false)
    }).catch((e) => {
      setError(e.message || 'Failed to load')
      setLoading(false)
    })
    return () => { mounted = false; dispatch(resetAction()) }
  }, [flow, dispatch])

  const round: Round | undefined = rounds[currentRound]
  const q = round?.questions[currentQuestion]
  const totalQsInRound = round?.questions.length ?? 0

  const atEndOfRound = q == null && totalQsInRound > 0
  const atEndOfAllRounds = atEndOfRound && currentRound >= rounds.length - 1

  useEffect(() => {
    console.log({ atEndOfAllRounds, currentRound, roundsLength: rounds.length })
    if (atEndOfAllRounds) {
      const { correct, total } = computeScore(rounds, answers)
      navigate('/score', { state: { correct, total } })
    }
  }, [atEndOfAllRounds, rounds, answers, navigate])

  if (loading) return <div className="card">Loading…</div>
  if (error) return <div className="card error">{error}</div>
  if (!round) return <div className="card">No questions found.</div>

  if (atEndOfRound) {
    if (isMulti && !atEndOfAllRounds) {
      const nextTitle = rounds[currentRound + 1]?.title ?? `Round ${currentRound + 2}`
      return (
        <div className="card">
          <h2>Round complete!</h2>
          <p>Great job. Ready to take the next round?</p>
          <p><strong>Up next:</strong> {nextTitle}</p>
          <div className="button-row">
            <button className="btn" onClick={() => dispatch(nextRoundAction())}>Take the next round</button>
          </div>
        </div>
      )
    }
  }

  if (!q) return null

  const selected = answers[q.id]

  function handleSelect(optId: string) {
    dispatch(answerAction({ questionId: q.id, optionId: optId }))
  }
  function handleNext() {
    if (currentQuestion < totalQsInRound - 1) {
      dispatch(nextQuestionAction())
    } else {
      if (isMulti) {
        if (currentRound >= rounds.length - 1) {
          const { correct, total } = computeScore(rounds, answers)
          navigate('/score', { state: { correct, total } })
        } else {
          dispatch(nextRoundAction())
        }
      } else {
        const { correct, total } = computeScore(rounds, answers)
        navigate('/score', { state: { correct, total } })
      }
    }
  }

  return (
    <div>
      <div className="card">
        <h1>{round.title ?? (isMulti ? `Round ${currentRound + 1}` : 'Quiz')}</h1>
        <Progress current={currentQuestion} total={totalQsInRound} />
      </div>
      <QuestionCard q={q} selected={selected} onSelect={handleSelect} onNext={handleNext} />
    </div>
  )
}
