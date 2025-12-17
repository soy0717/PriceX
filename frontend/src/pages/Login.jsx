// Login page

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  // Mode toggle
  const [isLogin, setIsLogin] = useState(true);
  
  // Form Fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // New field
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New field
  
  // UI States
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success msg
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isLogin) {
      // --- LOGIN LOGIC ---
      const result = login(username, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } else {
      // --- REGISTRATION LOGIC ---
      
      // Basic Validation
      if (!username || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (password.length <= 6) {
        setError('Password must be longer than 6 characters');
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // If validation passes (Mock Backend Success)
      setSuccessMessage('Registration successful! Please log in with your credentials.');
      
      // Optional: Automatically switch to login view and clear sensitive fields
      setTimeout(() => {
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      }, 1500);
    }

    setIsLoading(false);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              Price<span className="logo-x">X</span>
            </h1>
            <p className="login-subtitle">
              {isLogin ? 'Smart Pricing Application' : 'Create your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            
            {/* Username Field */}
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={error && !username ? 'Username required' : ''}
              disabled={isLoading}
            />

            {/* Email Field - Only for Registration */}
            {!isLogin && (
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && !email ? 'Email required' : ''}
                disabled={isLoading}
              />
            )}

            {/* Password Field */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? 'Password required' : ''}
              disabled={isLoading}
            />

            {/* Confirm Password Field - Only for Registration */}
            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error && !confirmPassword ? 'Confirmation required' : ''}
                disabled={isLoading}
              />
            )}

            {/* Error Message Display */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Success Message Display */}
            {successMessage && (
              <div className="login-success" style={{ color: 'green', textAlign: 'center', marginBottom: '1rem' }}>
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="large"
              isLoading={isLoading}
              className="login-submit"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              {' '}
              <button
                onClick={toggleAuthMode}
                className="login-toggle"
                type="button"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </Card>

        <div className="login-background">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;