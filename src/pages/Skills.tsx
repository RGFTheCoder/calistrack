import { skills, flexibility, progressionById } from '../data/pathways.ts'
import { focuses, userProgress, toggleFocus } from '../state/store.ts'
import { isSkillUnlocked } from '../state/planner.ts'
import { Card, CardHeader, CardTitle, CardSubtitle, Badge, Button, ProgressBar } from '../components/ui/index.ts'
import type { Skill } from '../data/types.ts'

function SkillCard({ skill, kind }: { skill: Skill; kind: 'skills' | 'flexibility' }) {
  const enabled = focuses.value[kind].includes(skill.id)
  const unlocked = isSkillUnlocked(skill)
  const cur = userProgress.value.skills[skill.id] ?? 0
  const max = skill.steps.length - 1
  const currentStep = skill.steps[cur]

  return (
    <Card>
      <CardHeader>
        <div style={{ flex: 1 }}>
          <CardTitle>{skill.name}</CardTitle>
          <CardSubtitle>{skill.description}</CardSubtitle>
        </div>
        {unlocked
          ? enabled
            ? <Badge variant="active">enabled</Badge>
            : <Badge variant="unlocked">unlocked</Badge>
          : <Badge variant="locked">locked</Badge>}
      </CardHeader>

      {!unlocked && skill.prereqs.length > 0 && (
        <div class="text-small text-muted">
          <strong>Prereqs:</strong>
          <ul>
            {skill.prereqs.map(pr => {
              const p = progressionById.get(pr.progressionId)
              const have = userProgress.value.progressions[pr.progressionId] ?? 0
              const met = have >= pr.minStepIndex
              return (
                <li key={pr.progressionId}>
                  {p?.name}: {p?.steps[pr.minStepIndex]?.name}{' '}
                  {met ? '✓' : `(at step ${have + 1}, need ${pr.minStepIndex + 1})`}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {unlocked && currentStep && (
        <>
          <p class="text-small text-muted">Current: <strong>{currentStep.name}</strong></p>
          <ProgressBar value={cur} max={max} label="Progress" />
        </>
      )}

      <div class="btn-group" style={{ marginTop: '0.75rem' }}>
        <Button
          variant={enabled ? 'secondary' : 'primary'}
          size="sm"
          disabled={!unlocked}
          onClick={() => toggleFocus(kind, skill.id)}
        >
          {enabled ? 'Disable' : 'Enable focus'}
        </Button>
      </div>
    </Card>
  )
}

export function Skills() {
  return (
    <div class="stack">
      <h1>Focuses</h1>
      <p class="text-muted">
        Enable skills to add them to your daily plan. Flexibility is always available.
      </p>

      <section class="pathway-section">
        <h2>Skills <small>strength + balance</small></h2>
        {skills.map(s => <SkillCard key={s.id} skill={s} kind="skills" />)}
      </section>

      <section class="pathway-section">
        <h2>Flexibility <small>no prereqs</small></h2>
        {flexibility.map(s => <SkillCard key={s.id} skill={s} kind="flexibility" />)}
      </section>
    </div>
  )
}
