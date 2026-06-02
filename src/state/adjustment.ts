import type { SetResult, AdjustmentDecision } from '../data/types.ts'

export type StepBounds = {
  minIndex: number
  maxIndex: number
}

export function decideAdjustment(results: SetResult[]): AdjustmentDecision {
  if (results.length === 0) return 'stay'

  const allEasy = results.every(r => r === 'easy')
  if (allEasy) return 'accelerate'

  const allDoneOrEasy = results.every(r => r === 'done' || r === 'easy')
  if (allDoneOrEasy) return 'advance'

  const earlyCount = Math.max(1, Math.ceil(results.length / 2))
  const earlyResults = results.slice(0, earlyCount)
  const earlyFailures = earlyResults.filter(r => r === 'failed').length
  const allEarlyFailed = earlyResults.length > 0 && earlyFailures === earlyResults.length

  if (earlyFailures >= 2 || allEarlyFailed) {
    return 'regress'
  }

  const lateResults = results.slice(earlyCount)
  const lateFailures = lateResults.filter(r => r === 'failed').length
  const earlyEasies = earlyResults.filter(r => r === 'easy').length

  if (earlyEasies > 0 && lateFailures > 0 && earlyFailures === 0) {
    return 'advance'
  }

  return 'stay'
}

export function applyDecision(
  fromIndex: number,
  decision: AdjustmentDecision,
  bounds: StepBounds,
): number {
  let next = fromIndex
  switch (decision) {
    case 'advance':
      next = fromIndex + 1
      break
    case 'accelerate':
      next = fromIndex + 2
      break
    case 'regress':
      next = fromIndex - 1
      break
    case 'stay':
      next = fromIndex
      break
  }
  return Math.max(bounds.minIndex, Math.min(bounds.maxIndex, next))
}
