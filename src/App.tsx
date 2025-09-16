
import { Outlet, Link, useLocation } from 'react-router-dom'

export function App() {
  const loc = useLocation()
  const isHome = loc.pathname === '/'
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="brand">Quiz</Link>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        {!isHome && (
          <Link to="/" className="link">Home</Link>
        )}
      </footer>
    </div>
  )
}
export default App
