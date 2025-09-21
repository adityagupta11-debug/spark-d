import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Code, Palette, Layers } from 'lucide-react';

interface FigmaImporterProps {
  figmaUrl?: string;
  frameName?: string;
  onImport?: (componentCode: string) => void;
}

/**
 * FigmaImporter Component
 * 
 * This component provides multiple methods to import Figma designs into React components.
 * Since we cannot directly access the Figma API without authentication, this component
 * serves as a guide and placeholder for the import process.
 */
export const FigmaImporter: React.FC<FigmaImporterProps> = ({
  figmaUrl,
  frameName = "College Dating App Frame",
  onImport
}) => {
  const handleManualImport = () => {
    // This would typically open a dialog or form for manual import
    console.log('Manual import process initiated');
  };

  const handleCodeGeneration = () => {
    // This would typically trigger automated code generation
    console.log('Code generation process initiated');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Figma to React Component Importer
        </h1>
        <p className="text-muted-foreground">
          Import your Figma frame "{frameName}" as a React component using one of the methods below.
        </p>
        {figmaUrl && (
          <p className="text-sm text-blue-600 mt-2">
            Source: <a href={figmaUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {figmaUrl}
            </a>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Method 1: Manual Recreation */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Code className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold">Manual Recreation</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Manually recreate the design using existing UI components and Tailwind CSS.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <p>✓ Full control over implementation</p>
            <p>✓ Uses existing design system</p>
            <p>✓ Optimized for performance</p>
            <p>✓ Maintainable code</p>
          </div>
          <Button onClick={handleManualImport} className="w-full">
            Start Manual Recreation
          </Button>
        </Card>

        {/* Method 2: Figma Plugin Export */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Download className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold">Figma Plugin Export</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Use Figma plugins to export React code directly from your design.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <p>• Figma to React Component</p>
            <p>• Anima</p>
            <p>• Quest</p>
            <p>• UI2CODE.AI</p>
          </div>
          <Button variant="outline" onClick={handleCodeGeneration} className="w-full">
            View Plugin Options
          </Button>
        </Card>

        {/* Method 3: Design Token Extraction */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold">Design Token Extraction</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Extract design tokens (colors, spacing, typography) from Figma.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <p>✓ Consistent design system</p>
            <p>✓ Easy maintenance</p>
            <p>✓ Scalable approach</p>
          </div>
          <Button variant="outline" className="w-full">
            Extract Tokens
          </Button>
        </Card>

        {/* Method 4: Component Library Integration */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Layers className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="text-xl font-semibold">Component Library</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Use existing Radix UI components to match the Figma design.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <p>✓ Accessibility built-in</p>
            <p>✓ Consistent behavior</p>
            <p>✓ Well-tested components</p>
          </div>
          <Button variant="outline" className="w-full">
            Browse Components
          </Button>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Step-by-Step Instructions</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium">Option 1: Using Figma Plugins (Recommended)</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>Open your Figma design</li>
              <li>Select the frame you want to export</li>
              <li>Go to Plugins → Browse plugins in community</li>
              <li>Search for "Figma to React" or "UI2CODE"</li>
              <li>Install and run the plugin</li>
              <li>Copy the generated React code</li>
              <li>Paste it into a new component file</li>
            </ol>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium">Option 2: Manual Recreation (Most Control)</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>Inspect the Figma design for layout, colors, and typography</li>
              <li>Create a new React component file</li>
              <li>Use Tailwind CSS classes to match the design</li>
              <li>Utilize existing UI components from the project</li>
              <li>Test responsiveness and accessibility</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FigmaImporter;