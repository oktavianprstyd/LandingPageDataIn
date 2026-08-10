// src/components/common/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

const variantClasses: Record<'primary' | 'secondary', string> = {
  primary:
    'bg-blue-500 hover:bg-blue-600 text-white focus:ring-offset-[#0a0a0f]',
  secondary:
    'border border-blue-500/60 text-blue-400 hover:bg-blue-500/10 focus:ring-offset-[#0a0a0f]',
};

/**
 * Reusable button with primary (filled blue) and secondary (outlined) variants.
 * Includes focus ring for keyboard accessibility. Satisfies Requirements 9.4, 9.7.
 */
export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'px-6 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button className={`${base} ${variantClasses[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
