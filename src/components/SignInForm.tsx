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
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl font-bold mb-2">Welcome Back! 👋</h2>
        <p className="text-white/70 text-lg">Sign in to your Sun Devil Match account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <Alert className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl">
            <AlertDescription className="text-red-200 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white font-semibold">ASU Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
            placeholder="yourname@asu.edu"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white font-semibold">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#ffc627] to-[#ffb000] hover:from-[#ffb000] hover:to-[#ffc627] text-black font-bold rounded-xl h-12 shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing In...
            </div>
          ) : (
            'Sign In ✨'
          )}
        </Button>

        <div className="text-center pt-4">
          <p className="text-white/60 text-sm">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="text-[#ffc627] hover:text-[#ffb000] p-0 h-auto font-semibold transition-colors"
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