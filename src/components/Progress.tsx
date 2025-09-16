
export default function Progress({ current, total }: { current: number; total: number }) {
  const pct = total ? Math.round(((current + 1) / total) * 100) : 0
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${pct}%` }} />
      <div className="progress-text">{current + 1} / {total}</div>
    </div>
  )
}
