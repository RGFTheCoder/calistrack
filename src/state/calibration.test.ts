import { describe, it, expect } from 'vitest'
import {
  initCalibration,
  filterProgressions,
  answer,
  currentProgression,
} from './calibration.ts'

describe('calibration binary search', () => {
  const list = filterProgressions(false)

  it('initializes on first progression', () => {
    const s = initCalibration(false)
    expect(s.done).toBe(false)
    expect(s.progressionIndex).toBe(0)
    expect(currentProgression(s, list)?.id).toBe(list[0].id)
  })

  it('all yes answers find highest step', () => {
    let s = initCalibration(false)
    const first = list[0]
    while (currentProgression(s, list)?.id === first.id && !s.done) {
      s = answer(s, list, 'yes')
    }
    expect(s.results[first.id]).toBe(first.steps.length - 1)
  })

  it('all no answers settle at step 0', () => {
    let s = initCalibration(false)
    const first = list[0]
    while (currentProgression(s, list)?.id === first.id && !s.done) {
      s = answer(s, list, 'no')
    }
    expect(s.results[first.id]).toBe(0)
  })

  it('terminates after all progressions answered', () => {
    let s = initCalibration(false)
    let safety = 1000
    while (!s.done && safety-- > 0) {
      s = answer(s, list, 'yes')
    }
    expect(s.done).toBe(true)
    expect(Object.keys(s.results).length).toBe(list.length)
  })

  it('uses logarithmic number of questions per progression', () => {
    const single = list[1]
    const synthetic = [single]
    let s = {
      progressionIndex: 0,
      low: 0,
      high: single.steps.length - 1,
      probe: Math.floor((single.steps.length - 1) / 2),
      done: false,
      results: {},
    }
    let questions = 0
    while (!s.done && questions < 100) {
      s = answer(s, synthetic, 'yes')
      questions++
    }
    expect(questions).toBeLessThanOrEqual(Math.ceil(Math.log2(single.steps.length)) + 1)
  })

  it('no-equipment mode filters steps requiring gear', () => {
    const ne = filterProgressions(true)
    for (const p of ne) {
      for (const step of p.steps) {
        expect(step.noEquipment).toBe(true)
      }
    }
  })
})
