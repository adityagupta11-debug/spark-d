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
      <div className="w-full text-center">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-white text-2xl font-bold mb-4">Welcome to Sun Devil Match! 🎉</h2>
          <p className="text-white/90 mb-6 leading-relaxed">
            We've sent a verification email to <strong className="text-green-400">{formData.email}</strong>. 
            Please check your inbox and click the verification link to activate your account.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/80 text-sm leading-relaxed">
              Once verified, you'll be able to sign in and start connecting with fellow Sun Devils! 
              Get ready to discover amazing relationships on campus.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Error message */}
      {error && (
        <Alert className="mb-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl">
          <AlertDescription className="text-red-200 font-medium">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Progress indicator */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step === currentStep 
                    ? 'bg-gradient-to-br from-[#ffc627] to-[#ffb000] text-black shadow-lg scale-110' 
                    : step < currentStep 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md' 
                      : 'bg-white/20 text-white/60 backdrop-blur-sm'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
              {step < 3 && (
                <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                  step < currentStep ? 'bg-green-400' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2">Let's get started! ✨</h2>
              <p className="text-white/70 text-lg">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white font-semibold">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white font-semibold">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-semibold">ASU Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
                placeholder="yourname@asu.edu"
                pattern=".*@asu\.edu$"
                required
              />
              <p className="text-xs text-white/60 mt-1 flex items-center">
                <span className="w-1 h-1 bg-[#ffc627] rounded-full mr-2"></span>
                Must use your ASU email address
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
                placeholder="Create a secure password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white font-semibold">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2">Academic Info 🎓</h2>
              <p className="text-white/70 text-lg">Help us connect you with fellow Sun Devils</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-white font-semibold">Age</Label>
              <Select onValueChange={(value) => handleInputChange('age', value)}>
                <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-12 rounded-xl focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/90 backdrop-blur-xl border-white/20 rounded-xl">
                  {Array.from({ length: 13 }, (_, i) => i + 18).map(age => (
                    <SelectItem key={age} value={age.toString()} className="text-white hover:bg-white/10 focus:bg-white/10 rounded-lg">
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="major" className="text-white font-semibold">Major</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all"
                placeholder="e.g., Business Administration"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-white font-semibold">Academic Year</Label>
              <Select onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-12 rounded-xl focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/90 backdrop-blur-xl border-white/20 rounded-xl">
                  <SelectItem value="freshman" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-lg">Freshman</SelectItem>
                  <SelectItem value="sophomore" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-lg">Sophomore</SelectItem>
                  <SelectItem value="junior" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-lg">Junior</SelectItem>
                  <SelectItem value="senior" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-lg">Senior</SelectItem>
                  <SelectItem value="graduate" className="text-white hover:bg-white/10 focus:bg-white/10 rounded-lg">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2">Tell us about yourself 💫</h2>
              <p className="text-white/70 text-lg">What makes you unique?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white font-semibold">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 min-h-[140px] rounded-xl focus:border-[#ffc627] focus:ring-2 focus:ring-[#ffc627]/20 transition-all resize-none"
                placeholder="Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?"
                maxLength={300}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-white/60 flex items-center">
                  <span className="w-1 h-1 bg-[#ffc627] rounded-full mr-2"></span>
                  Share your interests, hobbies, and what you're looking for
                </p>
                <p className="text-xs text-white/60 font-mono">{formData.bio.length}/300</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ffc627]/20 to-[#ffb000]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#ffc627]/30">
              <h4 className="text-white font-bold mb-3 flex items-center">
                <span className="mr-2">🎉</span>
                Almost done!
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">
                By creating an account, you agree to our Terms of Service and Privacy Policy. 
                We'll verify your ASU student status before activating your account to ensure 
                a safe and authentic community.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 rounded-xl h-12 px-6 transition-all"
            >
              ← Back
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-[#ffc627] to-[#ffb000] hover:from-[#ffb000] hover:to-[#ffc627] text-black font-bold ml-auto rounded-xl h-12 px-8 shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Next →
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#ffc627] to-[#ffb000] hover:from-[#ffb000] hover:to-[#ffc627] text-black font-bold ml-auto rounded-xl h-12 px-8 shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account ✨'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}