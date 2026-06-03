# CalisTrack — Project Plan

## Overview
A calisthenics progression tracker PWA built with Preact + Vite. Users track their current level in exercise progressions, unlock skills when prerequisites are met, and log workouts over time.

---

## Core Concepts

### 1. Progressions
Ordered lists of exercise variations from easiest → hardest. Each step has a name, description, and a "graduation" criteria (e.g. "3×8 with good form").

### 2. Pathways
Grouped collections of progressions organized by movement pattern. Based on the r/bodyweightfitness Recommended Routine structure:

| Pathway | Progressions |
|---|---|
| **Pull** | Rows, Pull-ups |
| **Push** | Push-ups, Dips, Pike/HSPU |
| **Legs** | Squat, Hip Hinge |
| **Core** | Leg raises, Hollow body, Back extension |
| **Skills** | L-sit, Handstand, Front Lever, Back Lever, Planche, Muscle-up |
| **Flexibility** | Pike, Pancake/Straddle, Front Splits, Middle Splits, Bridge/Thoracic |

### 3. Skills
Advanced goals that can be "enabled" (added to your training focus) once minimum prerequisite progression levels are met. Skills have their own internal progressions.

---

## Exercise Data

### Pull Pathway

#### Rows
1. Australian Row (horizontal pull)
2. Elevated Feet Row
3. Archer Row
4. Single-arm Row

#### Pull-ups
1. Dead Hang
2. Scapular Pull-ups
3. Negative Pull-ups
4. Assisted Pull-ups
5. Chin-up
6. Pull-up
7. Archer Pull-up
8. One-arm Pull-up

---

### Push Pathway

#### Push-ups
1. Wall Push-up
2. Incline Push-up
3. Knee Push-up
4. Full Push-up
5. Diamond Push-up
6. Archer Push-up
7. One-arm Push-up

#### Dips
1. Bench Dip
2. Parallel Bar Dip
3. Ring Dip

#### Pike / HSPU
1. Pike Push-up
2. Elevated Pike Push-up
3. Wall HSPU (eccentric)
4. Wall HSPU (full ROM)

---

### Legs Pathway

#### Squat
1. Box Squat
2. Full Squat
3. Bulgarian Split Squat
4. Shrimp Squat
5. Pistol Squat

#### Hip Hinge
1. Glute Bridge
2. Single-leg Glute Bridge
3. Romanian Deadlift (bodyweight / single leg)
4. Nordic Curl

---

### Core Pathway

#### Leg Raises
1. Lying Knee Raise
2. Lying Leg Raise
3. Hanging Knee Raise
4. Hanging Leg Raise
5. Toes to Bar

#### Hollow Body
1. Tuck Hollow Hold
2. Hollow Body Hold
3. Hollow Body Rocks

#### Back Extension
1. Superman Hold
2. Back Extension
3. Arch Body Hold

---

### Rings / Bar Mobility *(no equipment variant: active shoulder stretches)*

#### Skin the Cat
1. Active Shoulder Stretch (no equipment — doorframe or floor)
2. German Hang (bar/rings)
3. Partial Skin the Cat
4. Full Skin the Cat
5. German Hang Hold (10s+)

---

### Skills

#### L-sit *(prereq: Hanging Knee Raise)*
1. Support Hold
2. Tuck L-sit (floor)
3. One Leg Extended
4. Full L-sit
5. V-sit

#### Handstand *(prereq: Wall HSPU eccentric)*
1. Wall Plank
2. Kick-up to Wall Handstand
3. Wall Handstand (chest to wall)
4. Freestanding Handstand (kick-up)
5. Freestanding Handstand (press)

#### Front Lever *(prereqs: Pull-up ×10, Hollow Body Hold 30s)*
1. Tuck Front Lever
2. Advanced Tuck Front Lever
3. Single-leg Front Lever
4. Straddle Front Lever
5. Full Front Lever

#### Back Lever *(prereq: Skin the Cat full, German Hang 10s)*
1. Tuck Back Lever
2. Advanced Tuck Back Lever
3. Single-leg Back Lever
4. Straddle Back Lever
5. Full Back Lever

#### Planche *(prereqs: Push-up ×20, Diamond Push-up)*
1. Planche Lean
2. Tuck Planche
3. Advanced Tuck Planche
4. Straddle Planche
5. Full Planche

#### Muscle-up *(prereqs: Pull-up ×10, Parallel Bar Dip)*
1. Jumping Muscle-up
2. Negative Muscle-up
3. Band-assisted Muscle-up
4. Chest-to-bar Pull-up
5. Strict Muscle-up

---

### Flexibility Skills *(no or minimal prereqs — available to all)*

#### Pike *(no prereq)*
1. Supine Hamstring Stretch (strap/band)
2. Standing Toe Touch
3. Seated Pike Hold (bent back)
4. Seated Pike Hold (flat back)
5. Weighted Pike Stretch
6. Elevated Pike Stretch

#### Pancake / Straddle *(no prereq)*
1. Seated Straddle Hold
2. Side-to-Side Reaches
3. Pancake Fold (chest forward, rounded back)
4. Pancake Fold (flat back)
5. Weighted Pancake
6. Active Compression (lift legs in straddle)

#### Front Splits *(no prereq)*
1. Hip Flexor Lunge Stretch
2. Half Split (rear knee down)
3. Pigeon Pose Hold
4. Sliding Half Split
5. Full Front Split

#### Middle Splits / Side Splits *(no prereq)*
1. Seated Straddle (knees soft)
2. Cossack Squat
3. Wide Stance Side Lean
4. Sliding Straddle
5. Full Middle Split

#### Bridge / Thoracic *(no prereq)*
1. Glute Bridge Hold
2. Shoulder Dislocates (band/stick)
3. Wall Slides
4. Full Bridge (hold)
5. Bridge Wall Walk
6. Stand-to-Stand Bridge

---

## Features

### MVP
- [ ] View all pathways and progressions
- [ ] Set current level in each progression (persisted locally)
- [ ] Skills page: shows locked/unlocked state based on prereqs
- [ ] Enable an unlocked skill to add it to active training
- [ ] **Daily plan**: generated at session start based on current progression levels; flexibility work appended at end of session (RR-style), only if focuses are enabled
- [ ] **Workout logger**: user marks each set as ✅ Done / ❌ Failed / ⚡ Too Easy
- [ ] **Post-session adjustment**: at end of session, analyze all set results together (accounting for fatigue — early easy + late failed is normal) and adjust progression levels accordingly
- [ ] **Auto skill progression**: skill steps advance automatically when underlying exercise prereqs are met and sets are completed
- [ ] Progress view: see history per exercise

### Post-MVP
- [ ] Workout templates (e.g. "RR Full Body Day")
- [ ] Rest timer
- [ ] Charts/graphs for progress over time
- [ ] Export/import data (JSON)
- [ ] PWA offline support

### Potential Yjs Integrations
- **Multi-device sync**: treat the user's local training state as a Yjs document so sessions started on phone/desktop can merge cleanly after offline edits.
- **Shared coaching plans**: let a coach and athlete collaboratively edit progression levels, notes, and skill/flexibility focuses without clobbering each other's changes.
- **Collaborative workout templates**: store reusable routines as shared docs so training groups can iterate on the same template in real time.
- **Live session handoff**: sync an in-progress session between devices so the user can start on one device and continue on another without manual export/import.
- **Partner accountability**: add shared comments/check-ins on completed sessions or milestones, backed by Yjs awareness/presence for lightweight collaboration.
- **Future mobile/web clients**: if CalisTrack expands beyond a single local-first web app, Yjs could provide conflict-free state replication while keeping offline-first behavior.

---

## Progression Adjustment Logic

The post-session algorithm runs once after the user finishes all sets:

1. **Collect results** per exercise: array of `"done" | "failed" | "easy"` per set
2. **Fatigue normalization**: a pattern of `[easy, done, done, failed]` is treated as a success (fatigue is expected) — only flag a step as "too hard" if failures appear in early sets
3. **Advance step** if: all sets "done" or "easy", or a fatigue-normal pattern with no early failures
4. **Regress step** if: failures in the first 1–2 sets (indicates step is genuinely too hard)
5. **Stay** if: mixed results that fall within the fatigue-normal band
6. **Accelerate** if: all sets "easy" → skip one step ahead instead of one
7. Skills auto-advance when their underlying progression step requirements are satisfied by session results

---

## Data Model

```ts
// Static content (bundled)
type ProgressionStep = {
  id: string
  name: string
  description: string
  cues: string[]        // form tips
  graduation: string    // e.g. "3×8 clean reps"
}

type Progression = {
  id: string
  name: string
  pathway: PathwayId
  steps: ProgressionStep[]
}

type Skill = {
  id: string
  name: string
  description: string
  prereqs: SkillPrereq[]   // { progressionId, minStep }
  steps: ProgressionStep[]
}

// User state (localStorage)
type UserProgress = {
  progressions: Record<string, number>  // progressionId → current step index
  skills: {
    enabled: string[]                   // skill ids user has turned on
    progress: Record<string, number>    // skillId → current step index
  }
}

type WorkoutLog = {
  date: string         // ISO date
  entries: LogEntry[]
}

type SetResult = "done" | "failed" | "easy"

type LogEntry = {
  exerciseId: string   // progressionId or skillId
  stepIndex: number
  sets: { result: SetResult; reps: number; notes?: string }[]
}
```

---

## Tech Stack
- **Framework**: Preact + Preact Signals (state)
- **Build**: Vite 8 + Deno
- **Styling**: Plain CSS (no CSS Modules, no inline styles, no gradient backgrounds — user-restyable with Stylus)
- **Storage**: IndexedDB via `idb`, localStorage fallback
- **Routing**: Hash-based (`/#/skills`, etc.) — zero-config for GitHub Pages static deploy
- **Testing**: Vitest
- **Deploy**: GitHub Pages via GitHub Actions

---

## Component Architecture

### Principles
- **Composition over duplication** — a `Button` component handles all button variants via props, not separate components
- **Preact Signals** for all shared/global state — no prop-drilling, no context boilerplate
- **Local signals** for ephemeral UI state (e.g. open/closed accordion)
- **No inline styles** — all styling via CSS classes
- **No gradient backgrounds**

### Base / Primitive Components
These are the only "atomic" UI elements — everything else is composed from these:

| Component | Variants / Props |
|---|---|
| `Button` | `variant`: primary, secondary, ghost, danger; `size`: sm, md, lg |
| `Card` | `clickable?`, `padded?` |
| `Badge` | `variant`: locked, unlocked, active, easy, done, failed |
| `ProgressBar` | `value`, `max` |
| `Modal` | `open` (signal), `title`, `children` |
| `Icon` | SVG icon set, referenced by name |

### Composition Examples
- A `SkillCard` is a `Card` + `Badge` + `ProgressBar` + `Button`
- A `SetRow` is an `Icon` label + three `Button` (done/failed/easy)
- A `WorkoutSession` is a list of `ExerciseBlock`, each composed of `SetRow`s

### State (Preact Signals)
```ts
// Global signals — defined once, imported anywhere
export const userProgress: Signal<UserProgress>
export const workoutLog: Signal<WorkoutLog[]>
export const activeSession: Signal<SessionState | null>
export const enabledSkills: Signal<string[]>
export const enabledFlexibility: Signal<string[]>
```

### Persistence (IndexedDB via `idb`)
- On **app boot**: read all keys from IDB → hydrate signals. App renders a loading state until hydration completes.
- On **signal change**: `effect(() => db.put(...))` — async, fire-and-forget, never blocks rendering.
- Fall back to **localStorage** only if IDB is unavailable (private browsing on some browsers).

```ts
// Pattern
const db = await openDB('calistrack', 1, { upgrade })

// Boot
const saved = await db.get('store', 'userProgress')
userProgress.value = saved ?? defaultProgress

// Persist
effect(() => { db.put('store', userProgress.value, 'userProgress') })
```

```
src/
  data/                   # Static exercise definitions (pure TS, no UI)
    progressions/
    skills/
    flexibility/
    pathways.ts
  state/                  # Preact Signals — global store
    userProgress.ts
    workoutLog.ts
    session.ts
    focuses.ts            # enabled skills + flexibility
  components/
    ui/                   # Primitive base components (Button, Card, Badge, etc.)
      Button.tsx
      Card.tsx
      Badge.tsx
      ProgressBar.tsx
      Modal.tsx
      Icon.tsx
    progression/          # Composed from ui/
      ProgressionStep.tsx
      ProgressionList.tsx
    workout/
      ExerciseBlock.tsx   # Card + SetRow list
      SetRow.tsx          # Icon + Button group (done/failed/easy)
      SessionSummary.tsx  # Post-session adjustment review
    skills/
      SkillCard.tsx       # Card + Badge + ProgressBar + Button
      SkillGrid.tsx
    nav/
      NavBar.tsx
      NavLink.tsx
  pages/
    Home.tsx              # Today's plan / start session CTA
    Pathways.tsx          # Browse all progressions
    Skills.tsx            # Enable/view skill focuses
    Session.tsx           # Active workout
    History.tsx           # Past sessions
  App.tsx
  main.tsx
  style/
    base.css              # Reset + CSS variables (colors, spacing, type)
    components.css        # Shared structural styles
```

---

## Open Questions
~~All resolved.~~

### Resolved
- Daily plan structure → **Full body RR every session, 3 sets, 3×/week**
- Sets per exercise → **3 (fixed)**
- Manual override → **No — self-correcting**
- Graduation criteria → **Fixed per step**
- Flexibility timing → **End of session, RR-style, only when focuses enabled**
- Routing → **Hash-based**
- Back Lever prereq → **Skin the Cat progression added; no-equipment step (active shoulder stretch) included**
