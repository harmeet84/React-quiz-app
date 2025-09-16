
import type { RouteObject } from 'react-router-dom'
import { App } from './App'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Score from './pages/Score'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'flow/a', element: <Quiz flow="A" /> },
      { path: 'flow/b', element: <Quiz flow="B" /> },
      { path: 'score', element: <Score /> }
    ]
  }
]
