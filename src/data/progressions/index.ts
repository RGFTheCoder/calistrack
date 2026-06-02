import type { Progression, ProgressionStep } from '../types.ts'

const step = (
  id: string,
  name: string,
  description: string,
  cues: string[],
  sets: number,
  reps: number,
  noEquipment = true,
): ProgressionStep => ({
  id,
  name,
  description,
  cues,
  graduation: { sets, reps },
  noEquipment,
})

export const pull: Progression[] = [
  {
    id: 'rows',
    name: 'Rows',
    pathway: 'pull',
    steps: [
      step('rows-1', 'Door Row', 'Hold a door handle/sturdy frame and lean back, pull chest in.', ['Keep body straight', 'Squeeze shoulder blades'], 3, 8),
      step('rows-2', 'Australian Row', 'Horizontal pull under a low bar/table.', ['Body straight', 'Pull chest to bar'], 3, 8, false),
      step('rows-3', 'Elevated Feet Row', 'Australian row with feet on a bench.', ['Hollow body', 'Full ROM'], 3, 8, false),
      step('rows-4', 'Archer Row', 'One arm pulls, other extended along the bar.', ['Stay tight', 'Switch sides each rep'], 3, 6, false),
      step('rows-5', 'Single-arm Row', 'One-arm horizontal row.', ['Don\'t twist', 'Slow eccentric'], 3, 5, false),
    ],
  },
  {
    id: 'pullups',
    name: 'Pull-ups',
    pathway: 'pull',
    steps: [
      step('pu-1', 'Dead Hang', 'Passive hang from a bar.', ['Relax shoulders', 'Build grip'], 3, 30, false),
      step('pu-2', 'Scapular Pull-ups', 'From dead hang, pull shoulder blades down.', ['No bend in arms', 'Initiate from scaps'], 3, 8, false),
      step('pu-3', 'Negative Pull-up', 'Jump to top, lower under control.', ['3-5s descent', 'Full ROM'], 3, 5, false),
      step('pu-4', 'Assisted Pull-up', 'Band or feet-assisted pull-up.', ['Minimal assistance', 'Strict form'], 3, 6, false),
      step('pu-5', 'Chin-up', 'Underhand grip pull-up.', ['Chin over bar', 'No kipping'], 3, 5, false),
      step('pu-6', 'Pull-up', 'Overhand grip pull-up.', ['Chest to bar if possible', 'Strict'], 3, 6, false),
      step('pu-7', 'Archer Pull-up', 'Pull to one side at a time.', ['Strong side does the work', 'Alternate'], 3, 4, false),
      step('pu-8', 'One-arm Pull-up', 'Single-arm pull-up.', ['Use other hand for spotting if needed', 'Slow'], 3, 2, false),
    ],
  },
]

export const push: Progression[] = [
  {
    id: 'pushups',
    name: 'Push-ups',
    pathway: 'push',
    steps: [
      step('pup-1', 'Wall Push-up', 'Push-up against a wall.', ['Body straight', 'Full ROM'], 3, 12),
      step('pup-2', 'Incline Push-up', 'Hands on counter/table, push-up at angle.', ['Lower the angle as you progress', 'Brace core'], 3, 10),
      step('pup-3', 'Knee Push-up', 'Push-up from knees.', ['Hips don\'t sag', 'Chest to floor'], 3, 10),
      step('pup-4', 'Full Push-up', 'Standard push-up.', ['Body in a line', 'Elbows ~45°'], 3, 8),
      step('pup-5', 'Diamond Push-up', 'Hands close together forming a diamond.', ['Keep elbows close', 'Engage triceps'], 3, 8),
      step('pup-6', 'Archer Push-up', 'Push-up shifting weight to one side.', ['Other arm stays straight', 'Alternate sides'], 3, 5),
      step('pup-7', 'One-arm Push-up', 'Single-arm push-up.', ['Wide stance for stability', 'Slow'], 3, 3),
    ],
  },
  {
    id: 'dips',
    name: 'Dips',
    pathway: 'push',
    steps: [
      step('dip-1', 'Bench Dip', 'Hands on bench/chair behind you, lower hips.', ['Don\'t shrug', 'Full ROM'], 3, 10),
      step('dip-2', 'Negative Bar Dip', 'Lower from support hold under control.', ['3-5s descent', 'Full depth'], 3, 5, false),
      step('dip-3', 'Parallel Bar Dip', 'Full dip on parallel bars.', ['Chest forward slightly', 'Lock out top'], 3, 6, false),
      step('dip-4', 'Ring Dip', 'Dip on rings.', ['Stabilize rings', 'Turn out at top'], 3, 5, false),
    ],
  },
  {
    id: 'pike',
    name: 'Pike / HSPU',
    pathway: 'push',
    steps: [
      step('pike-1', 'Pike Push-up', 'Push-up with hips piked.', ['Push through head', 'Hips high'], 3, 8),
      step('pike-2', 'Elevated Pike Push-up', 'Feet on box, more vertical.', ['Stack shoulders over hands', 'Full ROM'], 3, 6),
      step('pike-3', 'Wall HSPU (eccentric)', 'Lower from wall handstand under control.', ['3-5s down', 'Bail safely'], 3, 3),
      step('pike-4', 'Wall HSPU (full ROM)', 'Full handstand push-up against wall.', ['Head to floor', 'Press to lockout'], 3, 5),
    ],
  },
]

export const legs: Progression[] = [
  {
    id: 'squat',
    name: 'Squat',
    pathway: 'legs',
    steps: [
      step('sq-1', 'Box Squat', 'Squat to a box/chair.', ['Sit back', 'Knees track toes'], 3, 12),
      step('sq-2', 'Full Squat', 'Bodyweight squat to depth.', ['Heels down', 'Chest up'], 3, 15),
      step('sq-3', 'Bulgarian Split Squat', 'Rear foot elevated single-leg squat.', ['Front knee tracks toe', 'Vertical torso'], 3, 8),
      step('sq-4', 'Shrimp Squat', 'Hold rear foot behind, single-leg squat.', ['Slow descent', 'Knee close to floor'], 3, 5),
      step('sq-5', 'Pistol Squat', 'Single-leg squat with leg extended.', ['Heel down', 'Full depth'], 3, 5),
    ],
  },
  {
    id: 'hinge',
    name: 'Hip Hinge',
    pathway: 'legs',
    steps: [
      step('hh-1', 'Glute Bridge', 'Lying glute bridge.', ['Squeeze glutes', 'Don\'t arch low back'], 3, 15),
      step('hh-2', 'Single-leg Glute Bridge', 'One leg extended, bridge with the other.', ['Hips level', 'Squeeze top'], 3, 10),
      step('hh-3', 'Single-leg RDL (BW)', 'Single-leg Romanian deadlift, bodyweight.', ['Hips square', 'Slight knee bend'], 3, 10),
      step('hh-4', 'Nordic Curl', 'Knees anchored, lower torso under control.', ['Use bands/assist as needed', 'Max ROM'], 3, 5),
    ],
  },
]

export const core: Progression[] = [
  {
    id: 'legraise',
    name: 'Leg Raises',
    pathway: 'core',
    steps: [
      step('lr-1', 'Lying Knee Raise', 'On back, raise knees to chest.', ['Lower back stays flat', 'Slow'], 3, 12),
      step('lr-2', 'Lying Leg Raise', 'On back, raise straight legs.', ['Lower back flat', 'Don\'t swing'], 3, 10),
      step('lr-3', 'Hanging Knee Raise', 'Hanging from bar, raise knees to chest.', ['No swinging', 'Full ROM'], 3, 8, false),
      step('lr-4', 'Hanging Leg Raise', 'Hanging straight leg raise.', ['Compress hips', 'Strict'], 3, 6, false),
      step('lr-5', 'Toes to Bar', 'Hanging, raise toes to touch bar.', ['Active shoulders', 'Compress hard'], 3, 5, false),
    ],
  },
  {
    id: 'hollow',
    name: 'Hollow Body',
    pathway: 'core',
    steps: [
      step('hb-1', 'Tuck Hollow Hold', 'On back, knees tucked, lower back flat.', ['Lower back pressed down', 'Breathe'], 3, 20),
      step('hb-2', 'Hollow Body Hold', 'Arms and legs straight, lower back flat.', ['Squeeze everything', 'Lower back glued'], 3, 30),
      step('hb-3', 'Hollow Body Rocks', 'Rock in hollow position.', ['Maintain shape', 'Smooth motion'], 3, 20),
    ],
  },
  {
    id: 'arch',
    name: 'Back Extension',
    pathway: 'core',
    steps: [
      step('ar-1', 'Superman Hold', 'Lying face down, lift arms and legs.', ['Squeeze glutes', 'Look down'], 3, 20),
      step('ar-2', 'Arch Body Hold', 'Full arch hold, arms overhead.', ['Squeeze glutes', 'Press legs together'], 3, 30),
      step('ar-3', 'Arch Body Rocks', 'Rock in arch position.', ['Tight arch', 'Smooth motion'], 3, 15),
    ],
  },
]

export const mobility: Progression[] = [
  {
    id: 'skinthecat',
    name: 'Skin the Cat',
    pathway: 'mobility',
    steps: [
      step('stc-1', 'Active Shoulder Stretch', 'Arms behind, hands clasped, lift to stretch shoulders. No equipment needed.', ['Don\'t force', 'Gradual'], 3, 30),
      step('stc-2', 'German Hang Prep', 'Hang from bar, slowly invert to vertical.', ['Controlled', 'Relax shoulders'], 3, 15, false),
      step('stc-3', 'Partial Skin the Cat', 'Inverted hang, pass legs partway through.', ['Slow', 'Controlled'], 3, 5, false),
      step('stc-4', 'Full Skin the Cat', 'Pass legs fully through to back lever start position.', ['Stay tight', 'Reverse with control'], 3, 5, false),
      step('stc-5', 'German Hang Hold', 'Hold full inverted-back position.', ['Breathe', 'Open shoulders'], 3, 15, false),
    ],
  },
]

export const allProgressions: Progression[] = [
  ...pull,
  ...push,
  ...legs,
  ...core,
  ...mobility,
]

export const progressionById = new Map(allProgressions.map(p => [p.id, p]))
