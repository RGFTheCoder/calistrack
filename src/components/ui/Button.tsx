import type { ComponentChildren, JSX } from 'preact'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'easy'
  | 'failed'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  disabled?: boolean
  children?: ComponentChildren
} & Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size'>

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  class: extra,
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    'btn',
    `btn-variant-${variant}`,
    `btn-size-${size}`,
    block ? 'btn-block' : '',
    extra ?? '',
  ].filter(Boolean).join(' ')
  return (
    <button class={cls} {...rest}>{children}</button>
  )
}

export function ButtonGroup({ children }: { children: ComponentChildren }) {
  return <div class="btn-group">{children}</div>
}
