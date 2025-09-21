import { ThemeProvider } from './components/ThemeProvider';
import Dashboard from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';
import { WelcomePage } from './components/WelcomePage';
import { signOutUser } from './lib/auth';
import { Sparkles } from 'lucide-react';

function AuthGate() {
  const { user, userProfile, loading } = useAuth();

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
    return <WelcomePage />;
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

