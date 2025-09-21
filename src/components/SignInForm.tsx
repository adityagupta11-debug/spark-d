import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { signIn } from '../lib/auth';
import { Alert, AlertDescription } from './ui/alert';
import { Mail, Lock, LogIn, Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="w-full max-w-md mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">Welcome Back</span>
        </div>
        <h2 className="text-white text-3xl font-bold mb-2">Sign In to Sun Devil Match</h2>
        <p className="text-white/60">Continue your journey to find your perfect match</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <Alert className="bg-red-500/10 border-red-500/20 backdrop-blur-sm animate-slide-in">
            <AlertDescription className="text-red-300 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white font-medium flex items-center space-x-2">
            <Mail className="w-4 h-4 text-yellow-400" />
            <span>ASU Email</span>
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all pl-10"
              placeholder="yourname@asu.edu"
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-white font-medium flex items-center space-x-2">
              <Lock className="w-4 h-4 text-yellow-400" />
              <span>Password</span>
            </Label>
            <button type="button" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium hover:underline transition-colors">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all pl-10"
              placeholder="Enter your password"
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-6 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center space-x-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        {/* Additional Options */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/40">or</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="text-yellow-400 hover:text-yellow-300 font-semibold p-0 h-auto underline-offset-4 hover:underline"
                onClick={onToggleMode}
              >
                Sign Up Now
              </Button>
            </p>
          </div>

          {/* Security Notice */}
          <div className="glass rounded-xl p-4 border border-white/10">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Your account is protected with enterprise-grade security. 
                We never share your personal information.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}