// Loading spinner UI Component

function LoadingSpinner({ size = 'medium', className = '' }) {
  return (
    <div className={`spinner spinner--${size} ${className}`}>
      <div className="spinner-ring"></div>
    </div>
  );
}

export default LoadingSpinner;
