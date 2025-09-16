
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="card">
      <h1>Welcome!</h1>
      <p>Pick a quiz flow:</p>
      <div className="button-row">
        <Link className="btn" to="/flow/a">Flow A – Single round</Link>
        <Link className="btn" to="/flow/b">Flow B – Multi-round</Link>
      </div>
    </section>
  )
}
