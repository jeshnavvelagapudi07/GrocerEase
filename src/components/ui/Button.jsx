/**
 * Reusable Button Component
 * Supports different variants and sizes
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) {
  const baseClass = 'button';
  const variantClass = `button--${variant}`;
  const sizeClass = `button--${size}`;
  const widthClass = fullWidth ? 'button--full' : '';
  const disabledClass = disabled ? 'button--disabled' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

