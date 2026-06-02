import type { ComponentChildren, JSX } from 'preact'

export type CardProps = {
  clickable?: boolean
  padded?: boolean
  children?: ComponentChildren
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'>

export function Card({
  clickable = false,
  padded = true,
  children,
  ...rest
}: CardProps) {
  const cls = [
    'card',
    padded ? 'card-padded' : '',
    clickable ? 'card-clickable' : '',
  ].filter(Boolean).join(' ')
  return <div class={cls} {...rest}>{children}</div>
}

export function CardHeader({ children }: { children: ComponentChildren }) {
  return <div class="card-header">{children}</div>
}

export function CardTitle({ children }: { children: ComponentChildren }) {
  return <h3 class="card-title">{children}</h3>
}

export function CardSubtitle({ children }: { children: ComponentChildren }) {
  return <span class="card-subtitle">{children}</span>
}
