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

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.password || !formData.age || !formData.major || !formData.year) {
        throw new Error('Please fill in all required fields');
      }

      // Validate ASU email
      if (!formData.email.endsWith('@asu.edu')) {
        throw new Error('Please use your ASU email address');
      }

      // Create user account
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        major: formData.major,
        year: formData.year,
        bio: formData.bio
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
        <Alert className="mb-6 bg-red-900/20 border-red-700/30">
          <AlertDescription className="text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${
                step === currentStep 
                  ? 'bg-green-500' 
                  : step < currentStep 
                    ? 'bg-green-500' 
                    : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-white mb-2">Let's get started!</h2>
              <p className="text-gray-400">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white">ASU Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="yourname@asu.edu"
                pattern=".*@asu\.edu$"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Must use your ASU email address</p>
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="Create a secure password"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-white mb-2">Academic Info</h2>
              <p className="text-gray-400">Help us connect you with fellow Sun Devils</p>
            </div>

            <div>
              <Label htmlFor="age" className="text-white">Age</Label>
              <Select onValueChange={(value) => handleInputChange('age', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {Array.from({ length: 13 }, (_, i) => i + 18).map(age => (
                    <SelectItem key={age} value={age.toString()} className="text-white hover:bg-gray-700">
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="major" className="text-white">Major</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="e.g., Business Administration"
                required
              />
            </div>

            <div>
              <Label htmlFor="year" className="text-white">Year</Label>
              <Select onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="freshman" className="text-white hover:bg-gray-700">Freshman</SelectItem>
                  <SelectItem value="sophomore" className="text-white hover:bg-gray-700">Sophomore</SelectItem>
                  <SelectItem value="junior" className="text-white hover:bg-gray-700">Junior</SelectItem>
                  <SelectItem value="senior" className="text-white hover:bg-gray-700">Senior</SelectItem>
                  <SelectItem value="graduate" className="text-white hover:bg-gray-700">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-white mb-2">Tell us about yourself</h2>
              <p className="text-gray-400">What makes you unique?</p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
                placeholder="Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?"
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/300 characters</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-white mb-2">Almost done! 🎉</h4>
              <p className="text-gray-400 text-sm">
                By creating an account, you agree to our Terms of Service and Privacy Policy. 
                We'll verify your ASU student status before activating your account.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Back
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-yellow-600 hover:bg-yellow-700 text-black ml-auto"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-black ml-auto"
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