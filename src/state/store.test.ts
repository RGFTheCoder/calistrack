import { beforeEach, describe, expect, it } from 'vitest'
import {
  userProgress,
  workoutLog,
  focuses,
  activeSession,
  noEquipmentMode,
  hasCalibrated,
  themePreference,
  accentColor,
  resetProgress,
  resetWorkoutHistory,
  resetAllData,
} from './store.ts'

describe('store reset helpers', () => {
  beforeEach(() => {
    userProgress.value = { progressions: { pullup: 2 }, skills: { handstand: 1 } }
    workoutLog.value = [{
      date: '2026-01-01',
      startedAt: 1,
      completedAt: 2,
      entries: [],
    }]
    focuses.value = { skills: ['handstand'], flexibility: ['pancake'] }
    activeSession.value = {
      startedAt: 123,
      plan: [],
      results: {},
    }
    noEquipmentMode.value = true
    hasCalibrated.value = true
    themePreference.value = 'dark'
    accentColor.value = 'rose'
  })

  it('resetProgress clears level state and calibration', () => {
    resetProgress()
    expect(userProgress.value).toEqual({ progressions: {}, skills: {} })
    expect(hasCalibrated.value).toBe(false)
    expect(activeSession.value).toBeNull()
  })

  it('resetWorkoutHistory clears logs only', () => {
    resetWorkoutHistory()
    expect(workoutLog.value).toEqual([])
    expect(userProgress.value.progressions.pullup).toBe(2)
  })

  it('resetAllData restores defaults for app state', () => {
    resetAllData()
    expect(userProgress.value).toEqual({ progressions: {}, skills: {} })
    expect(workoutLog.value).toEqual([])
    expect(focuses.value).toEqual({ skills: [], flexibility: [] })
    expect(activeSession.value).toBeNull()
    expect(noEquipmentMode.value).toBe(false)
    expect(hasCalibrated.value).toBe(false)
    expect(themePreference.value).toBe('system')
    expect(accentColor.value).toBe('blue')
  })
})
