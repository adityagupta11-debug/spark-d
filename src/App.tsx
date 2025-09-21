import { ThemeProvider } from './components/ThemeProvider';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard user={null as any} userProfile={{} as any} onSignOut={() => {}} />
    </ThemeProvider>
  );
}