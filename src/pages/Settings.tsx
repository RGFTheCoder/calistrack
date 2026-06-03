import { noEquipmentMode, hasCalibrated, resetProgress, resetWorkoutHistory, resetAllData } from '../state/store.ts'
import { navigate } from '../state/router.ts'
import { Button, Card, CardHeader, CardTitle, CardSubtitle, ButtonGroup } from '../components/ui/index.ts'

export function Settings() {
  return (
    <div class="stack">
      <h1>Settings</h1>
      <p class="text-muted">Manage app preferences and reset local data.</p>

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
