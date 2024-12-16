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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

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
      >
        Sign In
      </Button>
    </form>
  );
};