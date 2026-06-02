import type { SessionPlanItem, ProgressionStep, Skill, Progression } from '../data/types.ts'
import {
  allProgressions,
  progressionsByPathway,
  allSkillById,
} from '../data/pathways.ts'
import {
  userProgress,
  focuses,
  noEquipmentMode,
  getProgressionStep,
  getSkillStep,
} from './store.ts'

function pickStep(p: Progression, currentIndex: number, noEquipment: boolean): { step: ProgressionStep; index: number } | null {
  const step = p.steps[currentIndex]
  if (!step) return null
  if (noEquipment && !step.noEquipment) {
    for (let i = currentIndex; i >= 0; i--) {
      if (p.steps[i].noEquipment) {
        return { step: p.steps[i], index: i }
      }
    }
    return null
  }
  return { step, index: currentIndex }
}

function progressionItem(p: Progression, noEquipment: boolean): SessionPlanItem | null {
  const cur = getProgressionStep(p.id)
  const picked = pickStep(p, cur, noEquipment)
  if (!picked) return null
  return {
    exerciseId: p.id,
    exerciseKind: 'progression',
    stepIndex: picked.index,
    targetSets: picked.step.graduation.sets,
    targetReps: picked.step.graduation.reps,
    hold: picked.step.graduation.hold,
  }
}

function skillItem(skill: Skill, noEquipment: boolean): SessionPlanItem | null {
  const cur = getSkillStep(skill.id)
  const step = skill.steps[cur]
  if (!step) return null
  if (noEquipment && !step.noEquipment) {
    for (let i = cur; i >= 0; i--) {
      if (skill.steps[i].noEquipment) {
        const s = skill.steps[i]
        return {
          exerciseId: skill.id,
          exerciseKind: 'skill',
          stepIndex: i,
          targetSets: s.graduation.sets,
          targetReps: s.graduation.reps,
          hold: s.graduation.hold,
        }
      }
    }
    return null
  }
  return {
    exerciseId: skill.id,
    exerciseKind: 'skill',
    stepIndex: cur,
    targetSets: step.graduation.sets,
    targetReps: step.graduation.reps,
    hold: step.graduation.hold,
  }
}

export function generateDailyPlan(): SessionPlanItem[] {
  const ne = noEquipmentMode.value
  const plan: SessionPlanItem[] = []

  const enabledSkillItems = focuses.value.skills
    .map(id => allSkillById.get(id))
    .filter((s): s is Skill => !!s && isSkillUnlocked(s))
    .map(s => skillItem(s, ne))
    .filter((x): x is SessionPlanItem => !!x)

  plan.push(...enabledSkillItems)

  const groups: Array<typeof allProgressions[number][]> = [
    progressionsByPathway('pull'),
    progressionsByPathway('push'),
    progressionsByPathway('legs'),
    progressionsByPathway('core'),
    progressionsByPathway('mobility'),
  ]
  for (const group of groups) {
    for (const p of group) {
      const item = progressionItem(p, ne)
      if (item) plan.push(item)
    }
  }

  const flexItems = focuses.value.flexibility
    .map(id => allSkillById.get(id))
    .filter((s): s is Skill => !!s)
    .map(s => skillItem(s, ne))
    .filter((x): x is SessionPlanItem => !!x)

  plan.push(...flexItems)

  return plan
}

export function isSkillUnlocked(skill: Skill): boolean {
  if (skill.prereqs.length === 0) return true
  return skill.prereqs.every(pr => {
    const cur = userProgress.value.progressions[pr.progressionId] ?? 0
    return cur >= pr.minStepIndex
  })
}
