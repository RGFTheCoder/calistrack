import { signal, effect, type Signal } from '@preact/signals'
import { loadKey, saveKey } from './persistence.ts'
import {
  applyAppearance,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_THEME_PREFERENCE,
  isAccentColor,
  isThemePreference,
  type AccentColor,
  type ThemePreference,
} from './appearance.ts'
import type {
  UserProgress,
  WorkoutLog,
  Focuses,
  ActiveSession,
} from '../data/types.ts'

export const hydrated = signal(false)

function defaultUserProgress(): UserProgress {
  return {
    progressions: {},
    skills: {},
  }
}

function defaultFocuses(): Focuses {
  return {
    skills: [],
    flexibility: [],
  }
}

export const userProgress: Signal<UserProgress> = signal(defaultUserProgress())

export const workoutLog: Signal<WorkoutLog[]> = signal([])

export const focuses: Signal<Focuses> = signal(defaultFocuses())

export const activeSession: Signal<ActiveSession | null> = signal(null)

export const noEquipmentMode: Signal<boolean> = signal(false)

export const hasCalibrated: Signal<boolean> = signal(false)

export const themePreference: Signal<ThemePreference> = signal(DEFAULT_THEME_PREFERENCE)

export const accentColor: Signal<AccentColor> = signal(DEFAULT_ACCENT_COLOR)

let persisting = false

export async function hydrate(): Promise<void> {
  const [up, log, fc, sess, ne, cal, theme, accent] = await Promise.all([
    loadKey<UserProgress>('userProgress'),
    loadKey<WorkoutLog[]>('workoutLog'),
    loadKey<Focuses>('focuses'),
    loadKey<ActiveSession | null>('activeSession'),
    loadKey<boolean>('noEquipmentMode'),
    loadKey<boolean>('hasCalibrated'),
    loadKey<ThemePreference>('themePreference'),
    loadKey<AccentColor>('accentColor'),
  ])
  if (up) userProgress.value = up
  if (log) workoutLog.value = log
  if (fc) focuses.value = fc
  if (sess !== undefined) activeSession.value = sess
  if (ne !== undefined) noEquipmentMode.value = ne
  if (cal !== undefined) hasCalibrated.value = cal
  if (isThemePreference(theme)) themePreference.value = theme
  if (isAccentColor(accent)) accentColor.value = accent

  applyCurrentAppearance()

  persisting = true
  hydrated.value = true
  installPersistEffects()
  installAppearanceEffects()
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
  effect(() => {
    const v = hasCalibrated.value
    if (persisting) saveKey('hasCalibrated', v)
  })
  effect(() => {
    const v = themePreference.value
    if (persisting) saveKey('themePreference', v)
  })
  effect(() => {
    const v = accentColor.value
    if (persisting) saveKey('accentColor', v)
  })
}

function applyCurrentAppearance(prefersDark = getPrefersDark()): void {
  if (typeof document === 'undefined') return
  applyAppearance(document.documentElement, themePreference.value, accentColor.value, prefersDark)
}

function getPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function installAppearanceEffects() {
  effect(() => {
    const preference = themePreference.value
    const accent = accentColor.value

    if (typeof document === 'undefined') return

    const mediaQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null
    const sync = () => {
      applyAppearance(
        document.documentElement,
        preference,
        accent,
        mediaQuery?.matches ?? true,
      )
    }

    sync()

    if (preference !== 'system' || !mediaQuery) return

    const handleChange = () => { sync() }
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }

    mediaQuery.addListener(handleChange)
    return () => {
      mediaQuery.removeListener(handleChange)
    }
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

export function resetProgress(): void {
  userProgress.value = defaultUserProgress()
  hasCalibrated.value = false
  activeSession.value = null
}

export function resetWorkoutHistory(): void {
  workoutLog.value = []
}

export function resetAllData(): void {
  userProgress.value = defaultUserProgress()
  workoutLog.value = []
  focuses.value = defaultFocuses()
  activeSession.value = null
  noEquipmentMode.value = false
  hasCalibrated.value = false
  themePreference.value = DEFAULT_THEME_PREFERENCE
  accentColor.value = DEFAULT_ACCENT_COLOR
}
