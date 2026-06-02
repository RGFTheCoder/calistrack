import { useSignal } from '@preact/signals'
import { activeSession } from '../state/store.ts'
import {
  itemKey,
  logSet,
  undoLastSet,
  finalizeSession,
  cancelSession,
} from '../state/session.ts'
import { navigate } from '../state/router.ts'
import { progressionById, allSkillById } from '../data/pathways.ts'
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Badge,
} from '../components/ui/index.ts'
import type {
  AdjustmentResult,
  SessionPlanItem,
  WorkoutLog,
} from '../data/types.ts'

function exerciseLabel(item: SessionPlanItem) {
  const lookup = item.exerciseKind === 'progression'
    ? progressionById.get(item.exerciseId)
    : allSkillById.get(item.exerciseId)
  if (!lookup) return { name: item.exerciseId, step: '?', desc: '', cues: [] as string[] }
  const step = lookup.steps[item.stepIndex]
  return {
    name: lookup.name,
    step: step?.name ?? '?',
    desc: step?.description ?? '',
    cues: step?.cues ?? [],
  }
}

function decisionLabel(d: AdjustmentResult['decision']): string {
  switch (d) {
    case 'advance': return 'Advanced ➜'
    case 'accelerate': return 'Skipped ahead ➜➜'
    case 'regress': return 'Stepped back ↓'
    case 'stay': return 'Stayed'
  }
}

export function Session() {
  const sess = activeSession.value
  const summary = useSignal<{ adjustments: AdjustmentResult[]; log: WorkoutLog } | null>(null)

  if (!sess && !summary.value) {
    return (
      <div class="stack">
        <Card>
          <p class="empty">No active session.</p>
          <Button onClick={() => navigate('home')}>Back to Home</Button>
        </Card>
      </div>
    )
  }

  if (summary.value) {
    return (
      <div class="stack">
        <h1>Session Complete</h1>
        <Card>
          <CardHeader><CardTitle>Adjustments</CardTitle></CardHeader>
          {summary.value.adjustments.length === 0 ? (
            <p class="text-muted">No level changes.</p>
          ) : (
            <ul class="progression-list">
              {summary.value.adjustments.map(a => {
                const lookup = a.exerciseKind === 'progression'
                  ? progressionById.get(a.exerciseId)
                  : allSkillById.get(a.exerciseId)
                return (
                  <li key={a.exerciseId} class="step-row">
                    <span class="step-row-name">
                      <strong>{lookup?.name}</strong>
                      <span class="text-muted text-small"> — {decisionLabel(a.decision)}</span>
                    </span>
                    <span class="text-mono text-small text-muted">
                      {lookup?.steps[a.fromIndex]?.name} → {lookup?.steps[a.toIndex]?.name}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
        <Button variant="primary" size="lg" onClick={() => navigate('home')}>Back to Home</Button>
      </div>
    )
  }

  const session = sess!
  const allDone = session.plan.every(item => {
    const sets = session.results[itemKey(item)] ?? []
    return sets.length >= item.targetSets
  })
  const anyLogged = session.plan.some(item => (session.results[itemKey(item)] ?? []).length > 0)

  return (
    <div class="stack">
      <div class="row row-between">
        <h1 style={{ margin: 0 }}>Session</h1>
        <Button variant="ghost" size="sm" onClick={() => {
          if (confirm('Cancel this session? Logged sets will be lost.')) {
            cancelSession()
            navigate('home')
          }
        }}>Cancel</Button>
      </div>

      {session.plan.map(item => {
        const key = itemKey(item)
        const sets = session.results[key] ?? []
        const label = exerciseLabel(item)
        const remaining = Math.max(0, item.targetSets - sets.length)

        return (
          <Card key={key}>
            <CardHeader>
              <div style={{ flex: 1 }}>
                <CardTitle>{label.name}</CardTitle>
                <CardSubtitle>{label.step}</CardSubtitle>
              </div>
              <Badge variant={remaining === 0 ? 'done' : 'active'}>
                {sets.length}/{item.targetSets}
              </Badge>
            </CardHeader>

            {label.desc && <p class="text-small text-muted">{label.desc}</p>}
            {label.cues.length > 0 && (
              <ul class="text-small text-muted">
                {label.cues.map(c => <li key={c}>{c}</li>)}
              </ul>
            )}

            <div class="exercise-block">
              {Array.from({ length: item.targetSets }).map((_, i) => {
                const logged = sets[i]
                return (
                  <div key={i} class="set-row">
                    <span class="set-row-index">#{i + 1}</span>
                    <span class="set-row-target">
                      Target: {item.hold ? `${item.hold}s hold` : `${item.targetReps} reps`}
                    </span>
                    {logged ? (
                      <>
                        <Badge variant={logged.result}>{logged.result}</Badge>
                        {i === sets.length - 1 && (
                          <Button variant="ghost" size="sm" onClick={() => undoLastSet(item)}>undo</Button>
                        )}
                      </>
                    ) : i === sets.length ? (
                      <ButtonGroup>
                        <Button variant="failed" size="sm" onClick={() => logSet(item, { result: 'failed', reps: 0 })}>Failed</Button>
                        <Button variant="success" size="sm" onClick={() => logSet(item, { result: 'done', reps: item.targetReps })}>Done</Button>
                        <Button variant="easy" size="sm" onClick={() => logSet(item, { result: 'easy', reps: item.targetReps })}>Easy</Button>
                      </ButtonGroup>
                    ) : (
                      <span class="text-muted text-small">—</span>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        )
      })}

      <div class="btn-group">
        <Button
          variant="primary"
          size="lg"
          block
          disabled={!anyLogged}
          onClick={() => {
            const result = finalizeSession()
            summary.value = result
          }}
        >
          {allDone ? 'Finish session' : 'Finish early'}
        </Button>
      </div>
    </div>
  )
}
