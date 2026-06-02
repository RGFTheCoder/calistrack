import { describe, it, expect } from 'vitest'
import { decideAdjustment, applyDecision } from './adjustment.ts'

describe('decideAdjustment', () => {
  it('returns stay for empty', () => {
    expect(decideAdjustment([])).toBe('stay')
  })

  it('accelerates when all easy', () => {
    expect(decideAdjustment(['easy', 'easy', 'easy'])).toBe('accelerate')
  })

  it('advances when all done', () => {
    expect(decideAdjustment(['done', 'done', 'done'])).toBe('advance')
  })

  it('advances when mix of done/easy', () => {
    expect(decideAdjustment(['easy', 'done', 'done'])).toBe('advance')
  })

  it('regresses when early failures', () => {
    expect(decideAdjustment(['failed', 'failed', 'done'])).toBe('regress')
  })

  it('regresses on first-set failure in short session', () => {
    expect(decideAdjustment(['failed', 'done'])).toBe('regress')
  })

  it('treats fatigue (early easy + late failed) as advance', () => {
    expect(decideAdjustment(['easy', 'done', 'failed'])).toBe('advance')
  })

  it('stays when mid-session failures without early easies', () => {
    expect(decideAdjustment(['done', 'failed', 'done'])).toBe('stay')
  })

  it('stays when only late failure with no early easy', () => {
    expect(decideAdjustment(['done', 'done', 'failed'])).toBe('stay')
  })
})

describe('applyDecision', () => {
  const bounds = { minIndex: 0, maxIndex: 5 }

  it('advances by 1', () => {
    expect(applyDecision(2, 'advance', bounds)).toBe(3)
  })

  it('accelerates by 2', () => {
    expect(applyDecision(2, 'accelerate', bounds)).toBe(4)
  })

  it('regresses by 1', () => {
    expect(applyDecision(2, 'regress', bounds)).toBe(1)
  })

  it('stays', () => {
    expect(applyDecision(2, 'stay', bounds)).toBe(2)
  })

  it('clamps to max', () => {
    expect(applyDecision(5, 'accelerate', bounds)).toBe(5)
  })

  it('clamps to min', () => {
    expect(applyDecision(0, 'regress', bounds)).toBe(0)
  })
})
