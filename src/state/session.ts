import type {
  ActiveSession as _ActiveSession,
  LoggedSet,
  SessionPlanItem,
  WorkoutLog,
  LogEntry,
  AdjustmentResult,
} from '../data/types.ts'
import { activeSession, workoutLog, userProgress } from './store.ts'
import { generateDailyPlan } from './planner.ts'
import { decideAdjustment, applyDecision } from './adjustment.ts'
import { progressionById, allSkillById } from '../data/pathways.ts'

export function startSession(): void {
  const plan = generateDailyPlan()
  const results: Record<string, LoggedSet[]> = {}
  for (const item of plan) {
    results[itemKey(item)] = []
  }
  activeSession.value = {
    startedAt: Date.now(),
    plan,
    results,
  }
}

export function itemKey(item: SessionPlanItem): string {
  return `${item.exerciseKind}:${item.exerciseId}`
}

export function logSet(item: SessionPlanItem, set: LoggedSet): void {
  const sess = activeSession.value
  if (!sess) return
  const key = itemKey(item)
  const cur = sess.results[key] ?? []
  activeSession.value = {
    ...sess,
    results: { ...sess.results, [key]: [...cur, set] },
  }
}

export function undoLastSet(item: SessionPlanItem): void {
  const sess = activeSession.value
  if (!sess) return
  const key = itemKey(item)
  const cur = sess.results[key] ?? []
  if (cur.length === 0) return
  activeSession.value = {
    ...sess,
    results: { ...sess.results, [key]: cur.slice(0, -1) },
  }
}

function maxIndexFor(item: SessionPlanItem): number {
  if (item.exerciseKind === 'progression') {
    const p = progressionById.get(item.exerciseId)
    return p ? p.steps.length - 1 : 0
  }
  const s = allSkillById.get(item.exerciseId)
  return s ? s.steps.length - 1 : 0
}

export function finalizeSession(): { adjustments: AdjustmentResult[]; log: WorkoutLog } {
  const sess = activeSession.value
  if (!sess) throw new Error('No active session')

  const adjustments: AdjustmentResult[] = []
  const entries: LogEntry[] = []

  for (const item of sess.plan) {
    const sets = sess.results[itemKey(item)] ?? []
    if (sets.length === 0) continue

    entries.push({
      exerciseId: item.exerciseId,
      exerciseKind: item.exerciseKind,
      stepIndex: item.stepIndex,
      sets,
    })

    const decision = decideAdjustment(sets.map(s => s.result))
    const max = maxIndexFor(item)
    const next = applyDecision(item.stepIndex, decision, { minIndex: 0, maxIndex: max })

    if (next !== item.stepIndex || decision !== 'stay') {
      adjustments.push({
        exerciseId: item.exerciseId,
        exerciseKind: item.exerciseKind,
        fromIndex: item.stepIndex,
        toIndex: next,
        decision,
      })
    }
  }

  const updated = { ...userProgress.value }
  updated.progressions = { ...updated.progressions }
  updated.skills = { ...updated.skills }
  for (const a of adjustments) {
    if (a.exerciseKind === 'progression') {
      updated.progressions[a.exerciseId] = a.toIndex
    } else {
      updated.skills[a.exerciseId] = a.toIndex
    }
  }
  userProgress.value = updated

  const log: WorkoutLog = {
    date: new Date(sess.startedAt).toISOString().slice(0, 10),
    startedAt: sess.startedAt,
    completedAt: Date.now(),
    entries,
  }
  workoutLog.value = [...workoutLog.value, log]
  activeSession.value = null

  return { adjustments, log }
}

export function cancelSession(): void {
  activeSession.value = null
}
