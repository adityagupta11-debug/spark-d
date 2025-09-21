import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Dashboard from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { signOutUser } from './lib/auth';
import { Button } from './components/ui/button';
import { Sparkles } from 'lucide-react';

function AuthGate() {
  const { user, userProfile, loading } = useAuth();
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Sparkles className="w-10 h-10 mx-auto text-primary mb-3" />
          <div className="text-sm text-muted-foreground">Loading…</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-lg">✨</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Spark'd</h1>
              <p className="text-white/70 text-sm">College dating & date planning</p>
            </div>
          </div>
          {mode === 'sign-in' ? (
            <>
              <SignInForm onToggleMode={() => setMode('sign-up')} />
              <div className="text-center mt-6">
                <Button variant="link" className="text-yellow-500 hover:text-yellow-400 p-0 h-auto" onClick={() => setMode('sign-up')}>
                  Create an account
                </Button>
              </div>
            </>
          ) : (
            <>
              <SignUpForm />
              <div className="text-center mt-6">
                <Button variant="link" className="text-yellow-500 hover:text-yellow-400 p-0 h-auto" onClick={() => setMode('sign-in')}>
                  Already have an account? Sign in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      user={user}
      userProfile={userProfile}
      onSignOut={async () => {
        await signOutUser();
      }}
    />
  );
}

export default function AppRoot() {
  return (
    <ThemeProvider>
      <AuthGate />
    </ThemeProvider>
  );
}

