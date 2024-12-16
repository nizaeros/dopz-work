import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '../../types/auth';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
        required
        value={credentials.email}
        onChange={handleChange}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        icon={Lock}
        required
        value={credentials.password}
        onChange={handleChange}
      />

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="link"
          onClick={() => navigate('/forgot-password')}
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