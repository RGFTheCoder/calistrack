import { signal, effect, type Signal } from '@preact/signals'
import { loadKey, saveKey } from './persistence.ts'
import type {
  UserProgress,
  WorkoutLog,
  Focuses,
  ActiveSession,
} from '../data/types.ts'

export const hydrated = signal(false)

export const userProgress: Signal<UserProgress> = signal({
  progressions: {},
  skills: {},
})

export const workoutLog: Signal<WorkoutLog[]> = signal([])

export const focuses: Signal<Focuses> = signal({
  skills: [],
  flexibility: [],
})

export const activeSession: Signal<ActiveSession | null> = signal(null)

export const noEquipmentMode: Signal<boolean> = signal(false)

let persisting = false

export async function hydrate(): Promise<void> {
  const [up, log, fc, sess, ne] = await Promise.all([
    loadKey<UserProgress>('userProgress'),
    loadKey<WorkoutLog[]>('workoutLog'),
    loadKey<Focuses>('focuses'),
    loadKey<ActiveSession | null>('activeSession'),
    loadKey<boolean>('noEquipmentMode'),
  ])
  if (up) userProgress.value = up
  if (log) workoutLog.value = log
  if (fc) focuses.value = fc
  if (sess !== undefined) activeSession.value = sess
  if (ne !== undefined) noEquipmentMode.value = ne

  persisting = true
  hydrated.value = true
  installPersistEffects()
}

function installPersistEffects() {
  effect(() => {
    const v = userProgress.value
    if (persisting) saveKey('userProgress', v)
  })
  effect(() => {
    const v = workoutLog.value
    if (persisting) saveKey('workoutLog', v)
  })
  effect(() => {
    const v = focuses.value
    if (persisting) saveKey('focuses', v)
  })
  effect(() => {
    const v = activeSession.value
    if (persisting) saveKey('activeSession', v)
  })
  effect(() => {
    const v = noEquipmentMode.value
    if (persisting) saveKey('noEquipmentMode', v)
  })
}

export function getProgressionStep(progressionId: string): number {
  return userProgress.value.progressions[progressionId] ?? 0
}

export function getSkillStep(skillId: string): number {
  return userProgress.value.skills[skillId] ?? 0
}

export function setProgressionStep(progressionId: string, index: number) {
  userProgress.value = {
    ...userProgress.value,
    progressions: {
      ...userProgress.value.progressions,
      [progressionId]: Math.max(0, index),
    },
  }
}

export function setSkillStep(skillId: string, index: number) {
  userProgress.value = {
    ...userProgress.value,
    skills: {
      ...userProgress.value.skills,
      [skillId]: Math.max(0, index),
    },
  }
}

export function toggleFocus(kind: 'skills' | 'flexibility', id: string) {
  const cur = focuses.value
  const list = cur[kind]
  const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id]
  focuses.value = { ...cur, [kind]: next }
}
