import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { signIn } from '../lib/auth';
import { Alert, AlertDescription } from './ui/alert';

interface SignInFormProps {
  onToggleMode?: () => void;
}

export function SignInForm({ onToggleMode }: SignInFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Validate email format
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      await signIn(formData.email, formData.password);
      // The AuthContext will handle the redirect automatically
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-white text-2xl mb-2">Welcome Back!</h2>
        <p className="text-gray-400">Sign in to your Spark'd account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <Alert className="bg-red-900/20 border-red-700/30">
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            placeholder="yourname@asu.edu"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-black"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="text-yellow-500 hover:text-yellow-400 p-0 h-auto"
              onClick={onToggleMode}
            >
              Sign Up
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
}