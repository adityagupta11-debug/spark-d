import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { signUp } from '../lib/auth';
import { Alert, AlertDescription } from './ui/alert';

export function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    major: '',
    year: '',
    bio: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password strength
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.password || !formData.age || !formData.major || !formData.year) {
        throw new Error('Please fill in all required fields');
      }

      // Validate ASU email
      if (!formData.email.endsWith('@asu.edu')) {
        throw new Error('Please use your ASU email address');
      }

      // Validate age
      const ageNum = parseInt(formData.age);
      if (ageNum < 18 || ageNum > 100) {
        throw new Error('Please enter a valid age (18-100)');
      }

      // Create user account
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: formData.age,
        major: formData.major.trim(),
        year: formData.year,
        bio: formData.bio.trim()
      });

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  // Show success message
  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="text-white text-xl mb-2">Account Created Successfully!</h2>
          <p className="text-green-200/80 mb-4">
            We've sent a verification email to <strong>{formData.email}</strong>. 
            Please check your inbox and click the verification link to activate your account.
          </p>
          <p className="text-green-200/60 text-sm">
            Once verified, you'll be able to sign in and start connecting with fellow Sun Devils!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Error message */}
      {error && (
        <Alert className="mb-6 bg-red-500/20 border-red-400/30 backdrop-blur-sm">
          <AlertDescription className="text-red-100 font-medium">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === currentStep 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg scale-110' 
                  : step < currentStep 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400 shadow-md' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Let's get started!
              </h2>
              <p className="text-gray-300 text-lg">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white font-semibold text-sm mb-2 block">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white font-semibold text-sm mb-2 block">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white font-semibold text-sm mb-2 block">ASU Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
                placeholder="yourname@asu.edu"
                pattern=".*@asu\.edu$"
                required
              />
              <p className="text-xs text-gray-400 mt-2 flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span>
                Must use your ASU email address
              </p>
            </div>

            <div>
              <Label htmlFor="password" className="text-white font-semibold text-sm mb-2 block">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
                placeholder="Create a secure password"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white font-semibold text-sm mb-2 block">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Academic Info
              </h2>
              <p className="text-gray-300 text-lg">Help us connect you with fellow Sun Devils</p>
            </div>

            <div>
              <Label htmlFor="age" className="text-white font-semibold text-sm mb-2 block">Age</Label>
              <Select onValueChange={(value) => handleInputChange('age', value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/95 border-white/20 backdrop-blur-xl">
                  {Array.from({ length: 13 }, (_, i) => i + 18).map(age => (
                    <SelectItem key={age} value={age.toString()} className="text-white hover:bg-white/10 focus:bg-white/10">
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="major" className="text-white font-semibold text-sm mb-2 block">Major</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200"
                placeholder="e.g., Business Administration"
                required
              />
            </div>

            <div>
              <Label htmlFor="year" className="text-white font-semibold text-sm mb-2 block">Year</Label>
              <Select onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/95 border-white/20 backdrop-blur-xl">
                  <SelectItem value="freshman" className="text-white hover:bg-white/10 focus:bg-white/10">Freshman</SelectItem>
                  <SelectItem value="sophomore" className="text-white hover:bg-white/10 focus:bg-white/10">Sophomore</SelectItem>
                  <SelectItem value="junior" className="text-white hover:bg-white/10 focus:bg-white/10">Junior</SelectItem>
                  <SelectItem value="senior" className="text-white hover:bg-white/10 focus:bg-white/10">Senior</SelectItem>
                  <SelectItem value="graduate" className="text-white hover:bg-white/10 focus:bg-white/10">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Tell us about yourself
              </h2>
              <p className="text-gray-300 text-lg">What makes you unique?</p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white font-semibold text-sm mb-2 block">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm transition-all duration-200 min-h-[120px] resize-none"
                placeholder="Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?"
                maxLength={300}
              />
              <p className="text-xs text-gray-400 mt-2 flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span>
                  Help others get to know you better
                </span>
                <span className={`${formData.bio.length > 250 ? 'text-yellow-400' : 'text-gray-500'}`}>
                  {formData.bio.length}/300
                </span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <h4 className="text-white font-semibold mb-2 text-lg">Almost done!</h4>
                  <p className="text-yellow-100/90 text-sm leading-relaxed">
                    By creating an account, you agree to our Terms of Service and Privacy Policy. 
                    We'll verify your ASU student status before activating your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200 px-6 py-2"
            >
              Back
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200 ml-auto"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}