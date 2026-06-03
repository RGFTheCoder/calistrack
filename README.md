# CalisTrack

CalisTrack is a calisthenics progression tracker built with **Preact + Vite**.

It helps you train toward bodyweight strength and flexibility goals by:
- calibrating your starting level with a quick yes/no flow,
- generating a daily plan from your current progression levels,
- letting you log sets as **done / failed / easy** during a session,
- auto-adjusting progression levels after each session,
- tracking skill and flexibility focuses, and
- showing workout history over time.

## Tech stack

- Preact + Preact Signals
- TypeScript
- Vite
- Vitest
- IndexedDB (`idb`) with localStorage fallback
- Hash-based routing (GitHub Pages friendly)

## Getting started

This project uses Deno tasks:

```bash
deno task dev
```

Then open the local URL shown by Vite.

### Available tasks

```bash
deno task dev    # start dev server
deno task build  # type-check and production build
deno task test   # run tests
```

## Project scope

Current app pages include:
- **Home**: today’s plan + session start/resume
- **Pathways**: progression steps by movement pathway
- **Focuses**: enable/disable skills and flexibility tracks
- **Session**: log set outcomes and finalize adjustments
- **History**: review completed sessions
- **Calibrate**: initial (or repeat) starting-level calibration
