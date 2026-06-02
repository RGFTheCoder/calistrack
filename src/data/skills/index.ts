import type { Skill, ProgressionStep } from '../types.ts'

const step = (
  id: string,
  name: string,
  description: string,
  cues: string[],
  sets: number,
  reps: number,
  hold?: number,
  noEquipment = true,
): ProgressionStep => ({
  id,
  name,
  description,
  cues,
  graduation: { sets, reps, hold },
  noEquipment,
})

export const skills: Skill[] = [
  {
    id: 'lsit',
    name: 'L-sit',
    pathway: 'skills',
    description: 'Static hold with legs extended parallel to ground.',
    prereqs: [{ progressionId: 'legraise', minStepIndex: 2 }],
    steps: [
      step('lsit-1', 'Support Hold', 'Hold yourself up on parallettes/floor, arms locked.', ['Depress shoulders', 'Tight'], 3, 1, 20),
      step('lsit-2', 'Tuck L-sit', 'Knees tucked to chest, arms supporting.', ['Active push', 'Hollow'], 3, 1, 15),
      step('lsit-3', 'One-leg L-sit', 'One leg extended, other tucked.', ['Switch sides', 'Pointed toe'], 3, 1, 10),
      step('lsit-4', 'Full L-sit', 'Both legs extended parallel to floor.', ['Push down', 'Compress hips'], 3, 1, 15),
      step('lsit-5', 'V-sit', 'Legs raised above parallel.', ['Active compression', 'Lean back slightly'], 3, 1, 10),
    ],
  },
  {
    id: 'handstand',
    name: 'Handstand',
    pathway: 'skills',
    description: 'Inverted balance on hands.',
    prereqs: [{ progressionId: 'pike', minStepIndex: 2 }],
    steps: [
      step('hs-1', 'Wall Plank', 'Feet on wall, hands far away, hollow shape.', ['Hollow', 'Stack shoulders'], 3, 1, 30),
      step('hs-2', 'Kick-up to Wall Handstand', 'Kick up against wall, back to wall.', ['Light kick', 'Find balance'], 3, 5),
      step('hs-3', 'Wall Handstand (chest to wall)', 'Stomach facing wall, full body line.', ['Active shoulders', 'Tight'], 3, 1, 30),
      step('hs-4', 'Freestanding Handstand', 'Balance without wall support.', ['Eyes between hands', 'Finger pressure'], 3, 1, 15),
      step('hs-5', 'Handstand Press', 'Press into handstand from pike.', ['Strong shoulders', 'Compress'], 3, 3),
    ],
  },
  {
    id: 'frontlever',
    name: 'Front Lever',
    pathway: 'skills',
    description: 'Hanging horizontal hold facing up.',
    prereqs: [
      { progressionId: 'pullups', minStepIndex: 5 },
      { progressionId: 'hollow', minStepIndex: 1 },
    ],
    steps: [
      step('fl-1', 'Tuck Front Lever', 'Hanging tuck position parallel to ground.', ['Pull bar to hips', 'Hollow'], 3, 1, 15, false),
      step('fl-2', 'Advanced Tuck Front Lever', 'Tuck with back flat, hips open.', ['Open hips', 'Stay horizontal'], 3, 1, 10, false),
      step('fl-3', 'Single-leg Front Lever', 'One leg extended, other tucked.', ['Pointed toe', 'Alternate sides'], 3, 1, 8, false),
      step('fl-4', 'Straddle Front Lever', 'Legs straddled wide.', ['Press legs apart', 'Tight'], 3, 1, 8, false),
      step('fl-5', 'Full Front Lever', 'Body fully horizontal.', ['Pull arms down hard', 'Squeeze everything'], 3, 1, 5, false),
    ],
  },
  {
    id: 'backlever',
    name: 'Back Lever',
    pathway: 'skills',
    description: 'Hanging horizontal hold facing down.',
    prereqs: [{ progressionId: 'skinthecat', minStepIndex: 3 }],
    steps: [
      step('bl-1', 'Tuck Back Lever', 'From inverted hang, tuck and lower to horizontal.', ['Tight tuck', 'Stay horizontal'], 3, 1, 15, false),
      step('bl-2', 'Advanced Tuck Back Lever', 'Tuck with back flat.', ['Open hips slightly', 'Maintain shape'], 3, 1, 10, false),
      step('bl-3', 'Single-leg Back Lever', 'One leg extended.', ['Switch sides', 'Tight'], 3, 1, 8, false),
      step('bl-4', 'Straddle Back Lever', 'Legs straddled.', ['Wide straddle', 'Press out'], 3, 1, 8, false),
      step('bl-5', 'Full Back Lever', 'Body fully horizontal, face down.', ['Squeeze glutes', 'Tight'], 3, 1, 5, false),
    ],
  },
  {
    id: 'planche',
    name: 'Planche',
    pathway: 'skills',
    description: 'Horizontal hold supported by hands only.',
    prereqs: [{ progressionId: 'pushups', minStepIndex: 4 }],
    steps: [
      step('pl-1', 'Planche Lean', 'Push-up position, lean shoulders forward.', ['Protract scapulae', 'Lean far'], 3, 1, 30),
      step('pl-2', 'Tuck Planche', 'Knees tucked to chest, feet off ground, supported on hands.', ['Round back', 'Lean forward'], 3, 1, 15),
      step('pl-3', 'Advanced Tuck Planche', 'Tuck with back flat.', ['Open hips', 'Stay forward'], 3, 1, 10),
      step('pl-4', 'Straddle Planche', 'Legs straddled wide.', ['Press apart', 'Lean way forward'], 3, 1, 8),
      step('pl-5', 'Full Planche', 'Body fully horizontal.', ['Maximum lean', 'Tight everything'], 3, 1, 5),
    ],
  },
  {
    id: 'muscleup',
    name: 'Muscle-up',
    pathway: 'skills',
    description: 'Pull-up transitioning into a dip above the bar.',
    prereqs: [
      { progressionId: 'pullups', minStepIndex: 5 },
      { progressionId: 'dips', minStepIndex: 2 },
    ],
    steps: [
      step('mu-1', 'High Pull-up', 'Pull-up to sternum/chest level.', ['Explosive pull', 'Lean back at top'], 3, 5, undefined, false),
      step('mu-2', 'Negative Muscle-up', 'Lower from top of muscle-up under control.', ['3-5s', 'Control transition'], 3, 3, undefined, false),
      step('mu-3', 'Band-assisted Muscle-up', 'Muscle-up with band assistance.', ['False grip', 'Smooth transition'], 3, 3, undefined, false),
      step('mu-4', 'Strict Muscle-up', 'Slow strict muscle-up.', ['No kip', 'Pause at transition'], 3, 3, undefined, false),
      step('mu-5', 'Strict Ring Muscle-up', 'Strict muscle-up on rings.', ['False grip', 'Turn out at top'], 3, 3, undefined, false),
    ],
  },
]

export const skillById = new Map(skills.map(s => [s.id, s]))
