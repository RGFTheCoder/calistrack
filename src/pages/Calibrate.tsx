import { useSignal, useComputed } from '@preact/signals'
import {
  initCalibration,
  filterProgressions,
  answer,
  currentProgression,
  progressOf,
  type CalibrationState,
} from '../state/calibration.ts'
import {
  userProgress,
  hasCalibrated,
  noEquipmentMode,
} from '../state/store.ts'
import { navigate } from '../state/router.ts'
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  ProgressBar,
} from '../components/ui/index.ts'

export function Calibrate() {
  const ne = noEquipmentMode.value
  const state = useSignal<CalibrationState>(initCalibration(ne))
  const finalized = useSignal(false)
  const list = useComputed(() => filterProgressions(ne))

  const finishCalibration = (results: Record<string, number>) => {
    if (finalized.value) return
    finalized.value = true
    const next = { ...userProgress.value }
    next.progressions = { ...next.progressions, ...results }
    userProgress.value = next
    hasCalibrated.value = true
  }

  const cur = state.value
  const progressions = list.value

  if (cur.done) {
    if (Object.keys(cur.results).length > 0) {
      finishCalibration(cur.results)
    }
    return (
      <div class="stack">
        <h1>Calibration Complete</h1>
        <Card>
          <CardHeader><CardTitle>Your starting levels</CardTitle></CardHeader>
          <ul class="progression-list">
            {progressions.map(p => {
              const idx = cur.results[p.id] ?? 0
              const step = p.steps[idx]
              return (
                <li key={p.id} class="step-row">
                  <span class="step-row-name"><strong>{p.name}</strong></span>
                  <span class="text-muted text-small">{step?.name}</span>
                </li>
              )
            })}
          </ul>
        </Card>
        <Button variant="primary" size="lg" onClick={() => navigate('home')}>
          Go to Home
        </Button>
      </div>
    )
  }

  const p = currentProgression(cur, progressions)
  if (!p) {
    return <div class="stack"><p class="empty">Loading…</p></div>
  }

  const step = p.steps[cur.probe]
  const target = step.graduation
  const targetText = target.hold ? `${target.hold}s` : `${target.reps} reps`
  const { current, total } = progressOf(cur, progressions)

  const respond = (a: 'yes' | 'no') => {
    state.value = answer(state.value, progressions, a)
  }

  return (
    <div class="stack">
      <h1>Calibration</h1>
      <p class="text-muted">
        Quick check to find your starting level. We'll narrow it down with a few yes/no questions per movement.
      </p>

      <ProgressBar value={current - 1} max={total} label={`${p.name} (${current}/${total})`} />

      <Card>
        <CardHeader>
          <div style={{ flex: 1 }}>
            <CardTitle>Can you do {targetText} of:</CardTitle>
            <CardSubtitle>{step.name}</CardSubtitle>
          </div>
        </CardHeader>

        <p>{step.description}</p>
        {step.cues.length > 0 && (
          <ul class="text-small text-muted">
            {step.cues.map(c => <li key={c}>{c}</li>)}
          </ul>
        )}

        <ButtonGroup>
          <Button variant="failed" size="lg" onClick={() => respond('no')}>No</Button>
          <Button variant="success" size="lg" onClick={() => respond('yes')}>Yes</Button>
        </ButtonGroup>
      </Card>

      <Button variant="ghost" size="sm" onClick={() => {
        if (confirm('Skip calibration? You can run it later.')) {
          hasCalibrated.value = true
          navigate('home')
        }
      }}>
        Skip calibration
      </Button>
    </div>
  )
}
