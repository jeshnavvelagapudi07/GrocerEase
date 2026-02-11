/**
 * Badge Component
 * Used for displaying counts, labels, etc.
 */
export function Badge({ 
  children, 
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props 
}) {
  const baseClass = 'badge';
  const variantClass = `badge--${variant}`;
  const sizeClass = `badge--${size}`;

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

