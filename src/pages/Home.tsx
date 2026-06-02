import { useComputed } from '@preact/signals'
import { activeSession, noEquipmentMode, workoutLog } from '../state/store.ts'
import { generateDailyPlan } from '../state/planner.ts'
import { startSession } from '../state/session.ts'
import { navigate } from '../state/router.ts'
import { Button, Card, CardHeader, CardTitle, Badge } from '../components/ui/index.ts'
import { progressionById, allSkillById } from '../data/pathways.ts'

function exerciseName(id: string, kind: 'progression' | 'skill'): string {
  if (kind === 'progression') return progressionById.get(id)?.name ?? id
  return allSkillById.get(id)?.name ?? id
}

function stepName(id: string, kind: 'progression' | 'skill', stepIndex: number): string {
  if (kind === 'progression') {
    return progressionById.get(id)?.steps[stepIndex]?.name ?? '?'
  }
  return allSkillById.get(id)?.steps[stepIndex]?.name ?? '?'
}

export function Home() {
  const plan = useComputed(() => generateDailyPlan())
  const ne = noEquipmentMode
  const hasActive = activeSession.value !== null
  const sessionsCount = workoutLog.value.length

  return (
    <div class="stack">
      <h1>Today's Plan</h1>

      <Card>
        <div class="row row-between">
          <label class="row" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={ne.value}
              onChange={(e) => { ne.value = (e.target as HTMLInputElement).checked }}
            />
            <span>No-equipment mode</span>
          </label>
          <span class="text-muted text-small">{sessionsCount} session{sessionsCount === 1 ? '' : 's'} logged</span>
        </div>
      </Card>

      {plan.value.length === 0 ? (
        <Card>
          <p class="empty">No exercises in today's plan. Enable some focuses on the Skills page.</p>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>Plan ({plan.value.length} exercises)</CardTitle></CardHeader>
          <ul class="progression-list">
            {plan.value.map(item => (
              <li key={`${item.exerciseKind}:${item.exerciseId}`} class="step-row">
                <Badge variant={item.exerciseKind === 'skill' ? 'active' : 'pathway'}>
                  {item.exerciseKind === 'skill' ? 'Skill' : 'Lift'}
                </Badge>
                <span class="step-row-name">
                  <strong>{exerciseName(item.exerciseId, item.exerciseKind)}</strong>{' '}
                  <span class="text-muted">— {stepName(item.exerciseId, item.exerciseKind, item.stepIndex)}</span>
                </span>
                <span class="text-muted text-small text-mono">
                  {item.targetSets}×{item.hold ? `${item.hold}s` : item.targetReps}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div class="btn-group">
        {hasActive ? (
          <Button variant="primary" size="lg" onClick={() => navigate('session')}>
            Resume Session
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            disabled={plan.value.length === 0}
            onClick={() => { startSession(); navigate('session') }}
          >
            Start Session
          </Button>
        )}
      </div>
    </div>
  )
}
