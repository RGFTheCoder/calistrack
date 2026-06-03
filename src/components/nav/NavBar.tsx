import { route, navigate, type Route } from '../../state/router.ts'

const LINKS: Array<{ name: Route['name']; label: string }> = [
  { name: 'home', label: 'Home' },
  { name: 'pathways', label: 'Pathways' },
  { name: 'skills', label: 'Skills' },
  { name: 'history', label: 'History' },
  { name: 'settings', label: 'Settings' },
]

export function NavBar() {
  const current = route.value.name
  return (
    <nav class="navbar">
      <div class="navbar-inner">
        <span class="navbar-brand">CalisTrack</span>
        {LINKS.map(link => (
          <a
            key={link.name}
            class={`nav-link ${current === link.name ? 'is-active' : ''}`}
            href={`#/${link.name === 'home' ? '' : link.name}`}
            onClick={(e) => {
              e.preventDefault()
              navigate(link.name)
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
