import type { Progression } from '../data/types.ts'
import { allProgressions } from '../data/pathways.ts'

export type CalibrationAnswer = 'yes' | 'no'

export type CalibrationState = {
  progressionIndex: number
  low: number
  high: number
  probe: number
  done: boolean
  results: Record<string, number>
}

export function initCalibration(noEquipment: boolean): CalibrationState {
  const list = filterProgressions(noEquipment)
  return startProgression(0, list)
}

export function filterProgressions(noEquipment: boolean): Progression[] {
  if (!noEquipment) return allProgressions
  return allProgressions
    .map(p => ({
      ...p,
      steps: p.steps.filter(s => s.noEquipment),
    }))
    .filter(p => p.steps.length > 0)
}

function startProgression(idx: number, list: Progression[]): CalibrationState {
  if (idx >= list.length) {
    return {
      progressionIndex: idx,
      low: 0,
      high: 0,
      probe: 0,
      done: true,
      results: {},
    }
  }
  const p = list[idx]
  const high = p.steps.length - 1
  return {
    progressionIndex: idx,
    low: 0,
    high,
    probe: Math.floor(high / 2),
    done: false,
    results: {},
  }
}

export function currentProgression(
  state: CalibrationState,
  list: Progression[],
): Progression | null {
  return list[state.progressionIndex] ?? null
}

export function answer(
  state: CalibrationState,
  list: Progression[],
  ans: CalibrationAnswer,
): CalibrationState {
  if (state.done) return state
  const p = list[state.progressionIndex]
  if (!p) return { ...state, done: true }

  let { low, high, probe } = state

  if (ans === 'yes') {
    low = probe
  } else {
    high = probe - 1
  }

  if (low >= high) {
    const finalIndex = Math.max(0, low)
    const results = { ...state.results, [p.id]: finalIndex }
    const next = state.progressionIndex + 1
    if (next >= list.length) {
      return {
        progressionIndex: next,
        low: 0,
        high: 0,
        probe: 0,
        done: true,
        results,
      }
    }
    const np = list[next]
    const nhigh = np.steps.length - 1
    return {
      progressionIndex: next,
      low: 0,
      high: nhigh,
      probe: Math.floor(nhigh / 2),
      done: false,
      results,
    }
  }

  const newProbe = Math.ceil((low + high) / 2)
  return { ...state, low, high, probe: newProbe }
}

export function progressOf(state: CalibrationState, list: Progression[]): { current: number; total: number } {
  return {
    current: Math.min(state.progressionIndex + 1, list.length),
    total: list.length,
  }
}
