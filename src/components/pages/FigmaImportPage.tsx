import React from 'react';
import { CollegeDatingFrame } from '../figma/CollegeDatingFrame';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface FigmaImportPageProps {
  onBack?: () => void;
}

export const FigmaImportPage: React.FC<FigmaImportPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Figma Import Demo</h1>
              <p className="text-gray-600">College Dating App Frame Component</p>
            </div>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mobile View */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Mobile View</h2>
            <div className="w-full max-w-sm">
              <CollegeDatingFrame />
            </div>
          </div>

          {/* Desktop View */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Desktop View</h2>
            <div className="w-full max-w-md">
              <CollegeDatingFrame className="shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Component Details */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Component Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Design Elements</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• ASU-themed color scheme (red & gold)</li>
                <li>• Gradient backgrounds and modern UI</li>
                <li>• Profile card with user information</li>
                <li>• Interactive action buttons</li>
                <li>• Activity feed with recent updates</li>
                <li>• Bottom navigation preview</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Technical Features</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• TypeScript with proper type definitions</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Radix UI components integration</li>
                <li>• Responsive design patterns</li>
                <li>• Accessible button interactions</li>
                <li>• Customizable className prop</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Usage Example</h3>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{`import { CollegeDatingFrame } from './components/figma/CollegeDatingFrame';

// Basic usage
<CollegeDatingFrame />

// With custom styling
<CollegeDatingFrame className="shadow-2xl border-2 border-red-200" />

// In your app
function MyApp() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CollegeDatingFrame />
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FigmaImportPage;