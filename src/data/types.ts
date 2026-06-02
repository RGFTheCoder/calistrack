export type PathwayId =
  | 'pull'
  | 'push'
  | 'legs'
  | 'core'
  | 'mobility'
  | 'skills'
  | 'flexibility'

export type SetResult = 'done' | 'failed' | 'easy'

export type RepTarget = {
  sets: number
  reps: number
  hold?: number
}

export type ProgressionStep = {
  id: string
  name: string
  description: string
  cues: string[]
  graduation: RepTarget
  noEquipment: boolean
}

export type Progression = {
  id: string
  name: string
  pathway: PathwayId
  steps: ProgressionStep[]
}

export type SkillPrereq = {
  progressionId: string
  minStepIndex: number
}

export type Skill = {
  id: string
  name: string
  description: string
  pathway: 'skills' | 'flexibility'
  prereqs: SkillPrereq[]
  steps: ProgressionStep[]
}

export type Pathway = {
  id: PathwayId
  name: string
  description: string
}

export type LoggedSet = {
  result: SetResult
  reps: number
  notes?: string
}

export type LogEntry = {
  exerciseId: string
  exerciseKind: 'progression' | 'skill'
  stepIndex: number
  sets: LoggedSet[]
}

export type WorkoutLog = {
  date: string
  startedAt: number
  completedAt: number
  entries: LogEntry[]
}

export type UserProgress = {
  progressions: Record<string, number>
  skills: Record<string, number>
}

export type Focuses = {
  skills: string[]
  flexibility: string[]
}

export type SessionStatus = 'active' | 'finalizing' | 'idle'

export type SessionPlanItem = {
  exerciseId: string
  exerciseKind: 'progression' | 'skill'
  stepIndex: number
  targetSets: number
  targetReps: number
  hold?: number
}

export type ActiveSession = {
  startedAt: number
  plan: SessionPlanItem[]
  results: Record<string, LoggedSet[]>
}

export type AdjustmentDecision = 'advance' | 'accelerate' | 'stay' | 'regress'

export type AdjustmentResult = {
  exerciseId: string
  exerciseKind: 'progression' | 'skill'
  fromIndex: number
  toIndex: number
  decision: AdjustmentDecision
}
