export function ProgressBar({
  value,
  max,
  label,
}: {
  value: number
  max: number
  label?: string
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  return (
    <div>
      <div class="progress" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <div class="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {label && <div class="progress-label"><span>{label}</span><span>{value} / {max}</span></div>}
    </div>
  )
}
