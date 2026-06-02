import { workoutLog } from '../state/store.ts'
import { progressionById, allSkillById } from '../data/pathways.ts'
import { Card, CardHeader, CardTitle, CardSubtitle, Badge } from '../components/ui/index.ts'

export function History() {
  const log = workoutLog.value

  if (log.length === 0) {
    return (
      <div class="stack">
        <h1>History</h1>
        <Card>
          <p class="empty">No sessions logged yet. Complete your first session from Home.</p>
        </Card>
      </div>
    )
  }

  const sorted = [...log].sort((a, b) => b.startedAt - a.startedAt)

  return (
    <div class="stack">
      <h1>History</h1>
      <p class="text-muted">{log.length} session{log.length === 1 ? '' : 's'} logged.</p>

      {sorted.map(entry => {
        const duration = Math.round((entry.completedAt - entry.startedAt) / 60000)
        return (
          <Card key={entry.startedAt}>
            <CardHeader>
              <div style={{ flex: 1 }}>
                <CardTitle>{entry.date}</CardTitle>
                <CardSubtitle>{duration} min · {entry.entries.length} exercises</CardSubtitle>
              </div>
            </CardHeader>
            <ul class="progression-list">
              {entry.entries.map(e => {
                const lookup = e.exerciseKind === 'progression'
                  ? progressionById.get(e.exerciseId)
                  : allSkillById.get(e.exerciseId)
                const stepName = lookup?.steps[e.stepIndex]?.name ?? '?'
                const counts = e.sets.reduce(
                  (acc, s) => { acc[s.result]++; return acc },
                  { done: 0, failed: 0, easy: 0 } as Record<'done' | 'failed' | 'easy', number>,
                )
                return (
                  <li key={e.exerciseId} class="step-row">
                    <span class="step-row-name">
                      <strong>{lookup?.name}</strong>
                      <span class="text-muted text-small"> — {stepName}</span>
                    </span>
                    <div class="row" style={{ gap: '0.25rem' }}>
                      {counts.done > 0 && <Badge variant="done">{counts.done}✓</Badge>}
                      {counts.easy > 0 && <Badge variant="easy">{counts.easy}⚡</Badge>}
                      {counts.failed > 0 && <Badge variant="failed">{counts.failed}✗</Badge>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </Card>
        )
      })}
    </div>
  )
}
