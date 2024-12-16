import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <Input
        id="email"
        type="email"
        label="Email"
        icon={Mail}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {success && (
        <div className="text-green-600 text-sm">
          Password reset instructions have been sent to your email
        </div>
      )}

      <div className="flex items-center justify-between space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
};