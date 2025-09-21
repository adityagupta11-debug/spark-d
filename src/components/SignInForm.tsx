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

      // Validate ASU email
      if (!formData.email.endsWith('@asu.edu')) {
        throw new Error('Please use your ASU email address');
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
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Welcome Back!
        </h2>
        <p className="text-gray-300 text-lg">Sign in to your Sun Devil Match account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <Alert className="bg-red-500/20 border-red-400/30 backdrop-blur-sm">
            <AlertDescription className="text-red-100 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="email" className="text-white font-semibold text-sm mb-2 block">ASU Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
            placeholder="yourname@asu.edu"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white font-semibold text-sm mb-2 block">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="text-yellow-400 hover:text-yellow-300 p-0 h-auto font-semibold"
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