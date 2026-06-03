import { describe, expect, it } from 'vitest'
import { applyAppearance, getAccentOption, resolveTheme } from './appearance.ts'

describe('appearance helpers', () => {
  it('resolves the system theme from the OS preference', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })

  it('applies the selected theme and accent variables to the root element', () => {
    applyAppearance(document.documentElement, 'light', 'emerald', false)

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe(getAccentOption('emerald').primary)
    expect(document.documentElement.style.getPropertyValue('--color-primary-hover')).toBe(getAccentOption('emerald').hover)
    expect(document.documentElement.style.getPropertyValue('--color-primary-active')).toBe(getAccentOption('emerald').active)
  })
})
