// Input UI component

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function Input({
  label,
  type = 'text',
  placeholder = '',
  error = '',
  icon: Icon = null,
  value,
  onChange,
  disabled = false,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-container">
        {Icon && <Icon className="input-icon input-icon--left" size={18} />}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input ${error ? 'input--error' : ''} ${Icon ? 'input--with-icon' : ''} ${className}`}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="input-password-toggle"
            tabIndex="-1"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}

export default Input;
