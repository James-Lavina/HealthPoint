import React, { type ButtonHTMLAttributes, type ComponentType } from 'react';
import { Loader2Icon } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'md' | 'lg' | 'xl';
type IconComponent = ComponentType<{className?: string;'aria-hidden'?: boolean | 'true' | 'false';}>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconComponent;
  iconRight?: IconComponent;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
  'bg-brand text-white shadow-sm hover:bg-brand-dark active:bg-brand-deep disabled:bg-line disabled:text-ink-muted disabled:shadow-none',
  secondary:
  'bg-white text-info-dark ring-2 ring-inset ring-info/40 hover:bg-info-light disabled:text-ink-muted disabled:ring-line',
  outline:
  'bg-white text-ink ring-2 ring-inset ring-line hover:bg-canvas hover:ring-ink-muted/40 disabled:text-ink-muted',
  ghost: 'bg-transparent text-ink hover:bg-canvas',
  danger: 'bg-danger text-white shadow-sm hover:bg-danger-dark'
};

const sizeClasses: Record<Size, string> = {
  md: 'h-14 min-w-14 gap-2.5 rounded-xl px-4 text-[18px]',
  lg: 'h-16 gap-3 rounded-xl px-6 text-button',
  xl: 'h-[76px] gap-3 rounded-2xl px-8 text-[20px]'
};

export function Button({
  variant = 'primary',
  size = 'lg',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const iconSize = size === 'md' ? 'h-5 w-5' : 'h-6 w-6';
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-semibold leading-none transition-[background-color,color,box-shadow,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 enabled:active:scale-[0.98] disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}>
      
      {loading ?
      <Loader2Icon className={`${iconSize} shrink-0 animate-spin`} aria-hidden="true" /> :

      Icon && <Icon className={`${iconSize} shrink-0`} aria-hidden="true" />
      }
      {children}
      {IconRight && !loading && <IconRight className={`${iconSize} shrink-0`} aria-hidden="true" />}
    </button>);

}