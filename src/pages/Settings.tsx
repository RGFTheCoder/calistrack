import type { JSX } from 'preact'
import { accentOptions, themeOptions } from '../state/appearance.ts'
import {
  noEquipmentMode,
  hasCalibrated,
  themePreference,
  accentColor,
  resetProgress,
  resetWorkoutHistory,
  resetAllData,
} from '../state/store.ts'
import { navigate } from '../state/router.ts'
import { Button, Card, CardHeader, CardTitle, CardSubtitle, ButtonGroup } from '../components/ui/index.ts'

export function Settings() {
  return (
    <div class="stack">
      <h1>Settings</h1>
      <p class="text-muted">Manage app preferences and reset local data.</p>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardSubtitle>Choose an accent color and how the app theme should behave.</CardSubtitle>
        </CardHeader>
        <div class="settings-section">
          <div class="settings-field">
            <span class="text-muted text-small">Theme</span>
            <ButtonGroup>
              {themeOptions.map(option => (
                <Button
                  key={option.value}
                  size="sm"
                  variant={themePreference.value === option.value ? 'primary' : 'secondary'}
                  onClick={() => { themePreference.value = option.value }}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>

          <div class="settings-field">
            <span class="text-muted text-small">Accent color</span>
            <div class="settings-accent-grid">
              {accentOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  class={`accent-option${accentColor.value === option.value ? ' is-selected' : ''}`}
                  aria-pressed={accentColor.value === option.value}
                  onClick={() => { accentColor.value = option.value }}
                  style={{ '--accent-option-color': option.primary } as JSX.CSSProperties}
                >
                  <span class="accent-option-swatch" aria-hidden="true" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Training</CardTitle>
        </CardHeader>
        <label class="home-mode-toggle">
          <input
            type="checkbox"
            checked={noEquipmentMode.value}
            onChange={(e) => { noEquipmentMode.value = (e.target as HTMLInputElement).checked }}
          />
          <span>No-equipment mode</span>
        </label>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calibration</CardTitle>
          <CardSubtitle>{hasCalibrated.value ? 'Completed' : 'Not completed yet'}</CardSubtitle>
        </CardHeader>
        <Button variant="secondary" onClick={() => navigate('calibrate')}>
          Run calibration
        </Button>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reset data</CardTitle>
          <CardSubtitle>These actions cannot be undone.</CardSubtitle>
        </CardHeader>
        <ButtonGroup>
          <Button
            variant="danger"
            onClick={() => {
              if (confirm('Reset all progression and skill levels?')) resetProgress()
            }}
          >
            Reset progress
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirm('Clear all workout history?')) resetWorkoutHistory()
            }}
          >
            Clear history
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirm('Reset all app data (progress, history, focuses, and settings)?')) {
                resetAllData()
                navigate('home')
              }
            }}
          >
            Reset everything
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  )
}
