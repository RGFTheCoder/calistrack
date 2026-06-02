/* Inline-rendered SVG icons referenced by name. Stylable via currentColor. */

const PATHS: Record<string, string> = {
  check: 'M5 12l5 5L20 7',
  x: 'M6 6l12 12M6 18L18 6',
  bolt: 'M13 2L3 14h7l-1 8 11-13h-7l1-7z',
  arrow_up: 'M12 5v14M6 11l6-6 6 6',
  arrow_down: 'M12 19V5M18 13l-6 6-6-6',
  lock: 'M6 10V7a6 6 0 0112 0v3M5 10h14v11H5z',
  unlock: 'M6 10V7a6 6 0 0112 0M5 10h14v11H5z',
  dumbbell: 'M2 12h2M6 8v8M10 6v12M18 6v12M22 12h-2M14 8v8',
  flame: 'M12 22a7 7 0 007-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 007 7z',
}

export function Icon({
  name,
  size = 16,
}: {
  name: keyof typeof PATHS | string
  size?: number
}) {
  const d = PATHS[name] ?? PATHS.check
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
