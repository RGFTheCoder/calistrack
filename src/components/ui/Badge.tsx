import type { ComponentChildren } from 'preact'

export type BadgeVariant =
  | 'locked'
  | 'unlocked'
  | 'active'
  | 'done'
  | 'failed'
  | 'easy'
  | 'pathway'

export function Badge({
  variant = 'pathway',
  children,
}: {
  variant?: BadgeVariant
  children: ComponentChildren
}) {
  return <span class={`badge badge-${variant}`}>{children}</span>
}
