import type { ComponentChildren } from 'preact'
import { Button } from './Button.tsx'

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ComponentChildren
}) {
  if (!open) return null
  return (
    <div class="modal-backdrop" onClick={onClose}>
      <div class="modal" onClick={e => e.stopPropagation()}>
        <div class="modal-header">
          <h2 class="modal-title">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        {children}
      </div>
    </div>
  )
}
