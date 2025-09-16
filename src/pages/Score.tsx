
import { Link, useLocation } from 'react-router-dom'

export default function Score() {
  const loc = useLocation() as { state?: { correct: number; total: number } }
  const correct = loc.state?.correct ?? 0
  const total = loc.state?.total ?? 0
  const pct = total ? Math.round((correct / total) * 100) : 0

  return (
    <section className="card">
      <h1>Your Score</h1>
      <p className="score">{correct} / {total} ({pct}%)</p>
      <div className="button-row">
        <Link className="btn" to="/">Back to Home</Link>
      </div>
    </section>
  )
}
