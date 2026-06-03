import { useEffect } from 'preact/hooks'
import { hydrate, hydrated } from './state/store.ts'
import { route } from './state/router.ts'
import { NavBar } from './components/nav/NavBar.tsx'
import { Home } from './pages/Home.tsx'
import { Pathways } from './pages/Pathways.tsx'
import { Skills } from './pages/Skills.tsx'
import { Session } from './pages/Session.tsx'
import { History } from './pages/History.tsx'
import { Calibrate } from './pages/Calibrate.tsx'
import { Settings } from './pages/Settings.tsx'

export function App() {
  useEffect(() => {
    if (!hydrated.value) {
      void hydrate()
    }
  }, [])

  if (!hydrated.value) {
    return <div class="loading-screen">Loading…</div>
  }

  const current = route.value
  let page
  switch (current.name) {
    case 'pathways': page = <Pathways />; break
    case 'skills': page = <Skills />; break
    case 'session': page = <Session />; break
    case 'history': page = <History />; break
    case 'settings': page = <Settings />; break
    case 'calibrate': page = <Calibrate />; break
    case 'home':
    default: page = <Home />; break
  }

  return (
    <div class="app-shell">
      <NavBar />
      <main class="app-main">{page}</main>
    </div>
  )
}
