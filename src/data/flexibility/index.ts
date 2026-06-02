import type { Skill, ProgressionStep } from '../types.ts'

const step = (
  id: string,
  name: string,
  description: string,
  cues: string[],
  hold: number,
): ProgressionStep => ({
  id,
  name,
  description,
  cues,
  graduation: { sets: 3, reps: 1, hold },
  noEquipment: true,
})

export const flexibility: Skill[] = [
  {
    id: 'pike-flex',
    name: 'Pike Compression',
    pathway: 'flexibility',
    description: 'Forward fold with legs together — hamstring and lower back flexibility.',
    prereqs: [],
    steps: [
      step('pf-1', 'Supine Hamstring Stretch', 'Lying on back, pull leg toward chest.', ['Keep leg straight', 'Relax'], 30),
      step('pf-2', 'Standing Toe Touch', 'Standing forward fold.', ['Hinge at hips', 'Bend knees if needed'], 30),
      step('pf-3', 'Seated Pike (rounded)', 'Seated, fold forward, rounded back ok.', ['Reach for toes', 'Breathe'], 45),
      step('pf-4', 'Seated Pike (flat back)', 'Seated, fold with flat back.', ['Hinge at hips', 'Chest to thighs'], 45),
      step('pf-5', 'Active Compression', 'Lift legs while in pike.', ['Engage hip flexors', 'Hold'], 30),
    ],
  },
  {
    id: 'pancake',
    name: 'Pancake / Straddle',
    pathway: 'flexibility',
    description: 'Wide-leg forward fold — adductor and hamstring flexibility.',
    prereqs: [],
    steps: [
      step('pc-1', 'Seated Straddle', 'Sit with legs spread wide.', ['Knees up', 'Sit tall'], 30),
      step('pc-2', 'Side Reaches', 'Reach to each foot in straddle.', ['Side body stretch', 'Don\'t round'], 30),
      step('pc-3', 'Pancake Fold (rounded)', 'Fold forward in straddle.', ['Chest forward', 'Breathe'], 45),
      step('pc-4', 'Pancake Fold (flat back)', 'Fold with flat back.', ['Hinge from hips', 'Chest to floor'], 45),
      step('pc-5', 'Active Pancake', 'Lift legs slightly off floor in pancake.', ['Engage adductors', 'Hold'], 20),
    ],
  },
  {
    id: 'frontsplit',
    name: 'Front Split',
    pathway: 'flexibility',
    description: 'Forward leg split — hip flexor and hamstring flexibility.',
    prereqs: [],
    steps: [
      step('fs-1', 'Hip Flexor Lunge', 'Low lunge stretch, rear knee down.', ['Tuck pelvis', 'Press hips forward'], 45),
      step('fs-2', 'Half Split', 'Front leg straight, rear knee down.', ['Flex front foot', 'Hinge forward'], 45),
      step('fs-3', 'Pigeon Pose', 'Front shin across, fold forward.', ['Square hips', 'Breathe'], 45),
      step('fs-4', 'Sliding Half Split', 'Slide into deeper split.', ['Use socks/towels', 'Slow'], 30),
      step('fs-5', 'Full Front Split', 'Full split, hips square.', ['Both legs straight', 'Hold'], 30),
    ],
  },
  {
    id: 'middlesplit',
    name: 'Middle Split',
    pathway: 'flexibility',
    description: 'Side split — adductor flexibility.',
    prereqs: [],
    steps: [
      step('ms-1', 'Wide Squat', 'Sumo squat hold.', ['Knees out', 'Sit tall'], 45),
      step('ms-2', 'Cossack Squat', 'Side-to-side squat.', ['Heel down', 'Other leg straight'], 30),
      step('ms-3', 'Wide Stance Lean', 'Wide stance, lean side to side.', ['Toes forward', 'Slow'], 30),
      step('ms-4', 'Sliding Straddle', 'Slide legs wider into split.', ['Use socks/towels', 'Hands support'], 30),
      step('ms-5', 'Full Middle Split', 'Full side split.', ['Toes up', 'Hold'], 30),
    ],
  },
  {
    id: 'bridge',
    name: 'Bridge / Thoracic',
    pathway: 'flexibility',
    description: 'Back extension — spinal and shoulder mobility.',
    prereqs: [],
    steps: [
      step('br-1', 'Glute Bridge Hold', 'Lying glute bridge hold.', ['Squeeze glutes', 'Don\'t hyperextend'], 30),
      step('br-2', 'Shoulder Flossing', 'Arms behind back, clasp hands and lift.', ['Slow', 'Breathe'], 30),
      step('br-3', 'Wall Slides', 'Back to wall, slide arms overhead.', ['Maintain contact', 'Active'], 30),
      step('br-4', 'Full Bridge', 'Full bridge hold from floor.', ['Press chest forward', 'Straight arms'], 30),
      step('br-5', 'Stand-to-Stand Bridge', 'From standing, lower into bridge and return.', ['Control', 'Strong shoulders'], 3),
    ],
  },
]

export const flexibilityById = new Map(flexibility.map(f => [f.id, f]))
