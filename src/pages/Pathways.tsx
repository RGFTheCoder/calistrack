import { pathways, progressionsByPathway } from '../data/pathways.ts'
import { userProgress } from '../state/store.ts'
import { Card, CardHeader, CardHeaderMain, CardTitle, CardSubtitle, Badge, ProgressBar } from '../components/ui/index.ts'

export function Pathways() {
  const up = userProgress.value
  const trainingPathways = pathways.filter(p => p.id !== 'skills' && p.id !== 'flexibility')

  return (
    <div class="stack">
      <h1>Pathways</h1>
      <p class="text-muted">Your current step in each progression.</p>

      {trainingPathways.map(pathway => {
        const progressions = progressionsByPathway(pathway.id)
        if (progressions.length === 0) return null
        return (
          <section key={pathway.id} class="pathway-section">
            <h2>{pathway.name} <small>{pathway.description}</small></h2>
            {progressions.map(p => {
              const cur = up.progressions[p.id] ?? 0
              const max = p.steps.length - 1
              const step = p.steps[cur]
              return (
                <Card key={p.id}>
                  <CardHeader>
                    <CardHeaderMain>
                      <CardTitle>{p.name}</CardTitle>
                      <CardSubtitle>Step {cur + 1} of {p.steps.length}: {step?.name}</CardSubtitle>
                    </CardHeaderMain>
                    {step && !step.noEquipment && <Badge variant="unlocked">equipment</Badge>}
                  </CardHeader>
                  {step && (
                    <>
                      <p class="text-small">{step.description}</p>
                      <ProgressBar value={cur} max={max} label="Progress" />
                    </>
                  )}
                  <ol class="progression-list progression-list-detail">
                    {p.steps.map((s, i) => (
                      <li
                        key={s.id}
                        class={`step-row ${i === cur ? 'is-current' : ''} ${i < cur ? 'is-passed' : ''}`}
                      >
                        <span class="step-row-index">{i + 1}.</span>
                        <span class="step-row-name">{s.name}</span>
                        <span class="text-muted text-small text-mono">
                          {s.graduation.sets}×{s.graduation.hold ? `${s.graduation.hold}s` : s.graduation.reps}
                        </span>
                      </li>
                    ))}
                  </ol>
                </Card>
              )
            })}
          </section>
        )
      })}
    </div>
  )
}
