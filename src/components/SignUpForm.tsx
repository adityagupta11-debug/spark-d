import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { signUp } from '../lib/auth';
import { Alert, AlertDescription } from './ui/alert';
import { User, Mail, Lock, Calendar, BookOpen, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';

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
      <div className="w-full max-w-md mx-auto text-center animate-slide-up">
        <div className="glass rounded-3xl p-8 border border-green-400/20">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">Welcome to Sun Devil Match! 🎉</h2>
          <p className="text-white/80 mb-6 leading-relaxed">
            We've sent a verification email to <span className="text-yellow-400 font-semibold">{formData.email}</span>. 
            Please check your inbox and click the verification link to activate your account.
          </p>
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-white/90 text-sm">
              Once verified, you'll join thousands of Sun Devils already making connections!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Error message */}
      {error && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/20 backdrop-blur-sm">
          <AlertDescription className="text-red-300 font-medium">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-center space-x-3 mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step === currentStep 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white scale-110 shadow-lg' 
                    : step < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/10 text-white/40 border border-white/20'
                }`}
              >
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-0.5 mx-1 transition-all ${
                  step < currentStep ? 'bg-green-500' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white/60 text-sm">
            Step {currentStep} of 3: {currentStep === 1 ? 'Basic Info' : currentStep === 2 ? 'Academic Details' : 'About You'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4 animate-slide-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Let's create your profile</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Welcome, Future Sun Devil Match! 👋</h2>
              <p className="text-white/60">First, let's get your basic information</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white font-medium flex items-center space-x-2">
                  <User className="w-4 h-4 text-yellow-400" />
                  <span>First Name</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white font-medium flex items-center space-x-2">
                  <User className="w-4 h-4 text-yellow-400" />
                  <span>Last Name</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white font-medium flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>ASU Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="yourname@asu.edu"
                pattern=".*@asu\.edu$"
                required
              />
              <p className="text-xs text-yellow-400/60 mt-1 flex items-center space-x-1">
                <span>🔒</span>
                <span>Must use your official ASU email for verification</span>
              </p>
            </div>

            <div>
              <Label htmlFor="password" className="text-white font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4 text-yellow-400" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="Create a secure password"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4 text-yellow-400" />
                <span>Confirm Password</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-slide-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <BookOpen className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Academic Profile</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Your ASU Journey 🎓</h2>
              <p className="text-white/60">Help us match you with compatible Sun Devils</p>
            </div>

            <div>
              <Label htmlFor="age" className="text-white font-medium flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span>Age</span>
              </Label>
              <Select onValueChange={(value) => handleInputChange('age', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl">
                  {Array.from({ length: 13 }, (_, i) => i + 18).map(age => (
                    <SelectItem key={age} value={age.toString()} className="text-white hover:bg-white/10 focus:bg-white/10">
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="major" className="text-white font-medium flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-yellow-400" />
                <span>Major</span>
              </Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                placeholder="e.g., Computer Science, Business, Engineering"
                required
              />
            </div>

            <div>
              <Label htmlFor="year" className="text-white font-medium flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span>Academic Year</span>
              </Label>
              <Select onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10 backdrop-blur-xl">
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
          <div className="space-y-4 animate-slide-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Final Step</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Show Your Personality ✨</h2>
              <p className="text-white/60">What makes you unique? Let others get to know you!</p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white font-medium mb-2">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all min-h-[150px] resize-none"
                placeholder="Share your story! What are your passions? What do you love about ASU? What kind of connections are you looking for? Be authentic and let your personality shine ✨"
                maxLength={300}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-white/40">💡 Tip: Authentic profiles get 3x more matches!</p>
                <p className="text-xs text-yellow-400">{formData.bio.length}/300</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 border border-yellow-400/20">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Ready to Join Sun Devil Match! 🎉</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    By creating your account, you agree to our Terms of Service and Privacy Policy. 
                    We'll verify your ASU student status to ensure a safe, authentic community.
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
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold ml-auto transform hover:scale-105 transition-all shadow-lg flex items-center space-x-2"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold ml-auto transform hover:scale-105 transition-all shadow-lg flex items-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create My Account</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}