// Button UI component

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClass = 'button';
  const variantClass = `button--${variant}`;
  const sizeClass = `button--${size}`;
  const disabledClass = disabled || isLoading ? 'button--disabled' : '';

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="button__loading">
          <span className="spinner-dot"></span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
