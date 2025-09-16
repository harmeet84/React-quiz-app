
import type { NormalizedQuestion } from '@/types'

export default function QuestionCard({ q, selected, onSelect, onNext }: {
  q: NormalizedQuestion
  selected?: string
  onSelect: (optionId: string) => void
  onNext: () => void
}) {
  return (
    <div className="card">
      <h2>{q.text}</h2>
      <ul className="options">
        {q.options.map((o) => {
          const isPicked = selected === o.id
          return (
            <li key={o.id}>
              <button
                className={`option ${isPicked ? 'picked' : ''}`}
                onClick={() => onSelect(o.id)}
              >
                {o.text}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="button-row">
        <button className="btn" onClick={onNext} disabled={!selected}>Next</button>
      </div>
    </div>
  )
}
