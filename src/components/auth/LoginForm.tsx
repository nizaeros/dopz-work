import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '../../types/auth';
import { ROUTES } from '../../constants/routes';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    try {
      await login(credentials);
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const getEmailError = () => {
    if (!touched.email) return '';
    if (!credentials.email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(credentials.email)) return 'Invalid email format';
    return '';
  };

  const getPasswordError = () => {
    if (!touched.password) return '';
    if (!credentials.password) return 'Password is required';
    if (credentials.password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const emailError = getEmailError();
  const passwordError = getPasswordError();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        icon={Mail}
        placeholder="Enter your email address"
        required
        value={credentials.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={emailError}
        autoComplete="email"
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        icon={Lock}
        placeholder="Enter your password"
        required
        value={credentials.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={passwordError}
        autoComplete="current-password"
      />

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="link"
          onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
          className="text-sm"
        >
          Forgot password?
        </Button>
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
        disabled={!!emailError || !!passwordError}
      >
        Sign In
      </Button>
    </form>
  );
};