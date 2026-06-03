export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'
export type AccentColor = 'blue' | 'violet' | 'emerald' | 'rose'

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system'
export const DEFAULT_ACCENT_COLOR: AccentColor = 'blue'

export const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const satisfies ReadonlyArray<{ value: ThemePreference; label: string }>

export const accentOptions = [
  { value: 'blue', label: 'Blue', primary: '#4a9eff', hover: '#6db0ff', active: '#2d7ddb' },
  { value: 'violet', label: 'Violet', primary: '#9b7bff', hover: '#b093ff', active: '#7f60e5' },
  { value: 'emerald', label: 'Emerald', primary: '#26b67a', hover: '#43cb92', active: '#179060' },
  { value: 'rose', label: 'Rose', primary: '#ef5a8a', hover: '#f27aa2', active: '#d63c6e' },
] as const satisfies ReadonlyArray<{
  value: AccentColor
  label: string
  primary: string
  hover: string
  active: string
}>

const accentPaletteMap = accentOptions.reduce<Record<AccentColor, (typeof accentOptions)[number]>>(
  (map, option) => {
    map[option.value] = option
    return map
  },
  {} as Record<AccentColor, (typeof accentOptions)[number]>,
)

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark'
}

export function isAccentColor(value: unknown): value is AccentColor {
  return value === 'blue' || value === 'violet' || value === 'emerald' || value === 'rose'
}

export function getAccentOption(accent: AccentColor) {
  return accentPaletteMap[accent]
}

export function resolveTheme(preference: ThemePreference, prefersDark: boolean): ResolvedTheme {
  if (preference === 'system') return prefersDark ? 'dark' : 'light'
  return preference
}

export function applyAppearance(
  root: HTMLElement,
  preference: ThemePreference,
  accent: AccentColor,
  prefersDark: boolean,
): ResolvedTheme {
  const resolved = resolveTheme(preference, prefersDark)
  const palette = getAccentOption(accent)

  root.dataset.theme = resolved
  root.style.setProperty('--color-primary', palette.primary)
  root.style.setProperty('--color-primary-hover', palette.hover)
  root.style.setProperty('--color-primary-active', palette.active)

  return resolved
}
