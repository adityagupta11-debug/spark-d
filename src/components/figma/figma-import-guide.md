# Figma to React Component Import Guide

This guide will help you import the College Dating App frame from Figma into a React component.

## Figma URL
`https://www.figma.com/make/h1IighE64Yi29UxpScokW3/College-Dating-App?node-id=0-1&t=HbXwjmEfJAQmq7t7-1`

## Available Methods

### Method 1: Figma Plugins (Recommended)

1. **Open Figma Design**
   - Go to your Figma link
   - Navigate to the specific frame (node-id=0-1)

2. **Install a Figma to React Plugin**
   - **UI2CODE.AI**: Most advanced AI-powered converter
   - **Figma to React Component**: Simple and reliable
   - **Anima**: Good for interactive components
   - **Quest**: Great for Material UI integration

3. **Export Process**
   - Select the frame you want to export
   - Run the plugin
   - Choose React + TypeScript
   - Configure options (Tailwind CSS, component structure)
   - Copy the generated code

4. **Integration**
   - Create a new file: `/workspace/src/components/figma/CollegeDatingFrame.tsx`
   - Paste the generated code
   - Import and use existing UI components where possible
   - Adjust styling to match the project's design system

### Method 2: Manual Recreation

1. **Analyze the Design**
   - Study the layout, colors, typography
   - Identify reusable components
   - Note spacing, dimensions, and responsive behavior

2. **Use Existing Components**
   - Card, Button, Avatar from `/src/components/ui/`
   - Follow the existing color scheme (ASU colors: #8C1D40, #FFC627)
   - Use Tailwind CSS classes for styling

3. **Template Structure**
   ```tsx
   import React from 'react';
   import { Card } from '../ui/card';
   import { Button } from '../ui/button';
   // ... other imports

   export const CollegeDatingFrame: React.FC = () => {
     return (
       <div className="max-w-sm mx-auto">
         {/* Your component structure here */}
       </div>
     );
   };
   ```

### Method 3: Design Token Extraction

1. **Extract Design Tokens**
   - Colors, fonts, spacing from Figma
   - Create CSS custom properties
   - Update Tailwind config if needed

2. **Component Library Mapping**
   - Map Figma components to existing UI components
   - Identify gaps and create new components as needed

## Project-Specific Considerations

### Existing Design System
- **Colors**: ASU Maroon (#8C1D40), Gold (#FFC627)
- **Components**: Radix UI with Tailwind CSS
- **Typography**: System fonts with Tailwind typography classes
- **Layout**: Mobile-first, max-width containers

### Integration Points
- Add to existing navigation in `App.tsx`
- Use existing state management patterns
- Follow the component structure in `/src/components/`

### File Structure
```
/src/components/figma/
├── CollegeDatingFrame.tsx    # Your imported component
├── FigmaImporter.tsx         # Import utility (already created)
├── FigmaFrameTemplate.tsx    # Template reference (already created)
├── ImageWithFallback.tsx     # Existing image component
└── figma-import-guide.md     # This guide
```

## Code Template

```tsx
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface CollegeDatingFrameProps {
  className?: string;
  // Add other props as needed
}

export const CollegeDatingFrame: React.FC<CollegeDatingFrameProps> = ({
  className = ""
}) => {
  return (
    <div className={`max-w-sm mx-auto bg-background ${className}`}>
      {/* Replace this with your actual Figma design */}
      <Card className="overflow-hidden shadow-lg">
        {/* Component content here */}
      </Card>
    </div>
  );
};

export default CollegeDatingFrame;
```

## Testing Your Component

1. **Create a test page**
   ```tsx
   // In App.tsx or create a separate test component
   import { CollegeDatingFrame } from './components/figma/CollegeDatingFrame';
   
   // Add to your render function
   <CollegeDatingFrame />
   ```

2. **Check responsiveness**
   - Test on different screen sizes
   - Ensure mobile-first design

3. **Verify accessibility**
   - Check color contrast
   - Ensure keyboard navigation
   - Test with screen readers

## Next Steps

1. Choose your preferred import method
2. Create the component file
3. Import and test in the app
4. Refine styling and functionality
5. Integrate with existing app state and navigation

## Need Help?

- Check the existing components in `/src/components/ui/` for reference
- Use the `FigmaFrameTemplate.tsx` as a starting point
- Refer to Tailwind CSS and Radix UI documentation
- Test frequently during development