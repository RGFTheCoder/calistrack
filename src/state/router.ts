import { signal } from '@preact/signals'

export type Route =
  | { name: 'home' }
  | { name: 'pathways' }
  | { name: 'skills' }
  | { name: 'session' }
  | { name: 'history' }
  | { name: 'settings' }
  | { name: 'calibrate' }

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '')
  switch (h) {
    case 'pathways': return { name: 'pathways' }
    case 'skills': return { name: 'skills' }
    case 'session': return { name: 'session' }
    case 'history': return { name: 'history' }
    case 'settings': return { name: 'settings' }
    case 'calibrate': return { name: 'calibrate' }
    case '':
    case 'home':
    default:
      return { name: 'home' }
  }
}

export const route = signal<Route>(parseHash())

window.addEventListener('hashchange', () => {
  route.value = parseHash()
})

export function navigate(name: Route['name']): void {
  window.location.hash = `#/${name === 'home' ? '' : name}`
}
