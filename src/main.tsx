import { render } from 'preact'
import './style/base.css'
import './style/components.css'
import { App } from './app.tsx'

render(<App />, document.getElementById('app')!)
