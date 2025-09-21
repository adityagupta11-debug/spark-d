# Figma Import Components

This directory contains React components imported from Figma designs.

## CollegeDatingFrame

A React component based on the College Dating App Figma design. This component showcases a modern dating app interface with ASU (Arizona State University) theming.

### Features

- **ASU Branding**: Uses the official ASU colors (red #8C1D40 and gold #FFC627)
- **Modern UI**: Clean, card-based design with gradients and shadows
- **Interactive Elements**: Buttons for liking/passing profiles, planning dates
- **Profile Cards**: Displays user information, interests, and ratings
- **Activity Feed**: Shows recent matches and planned dates
- **Responsive Design**: Works on both mobile and desktop viewports

### Usage

```tsx
import { CollegeDatingFrame } from './components/figma/CollegeDatingFrame';

// Basic usage
<CollegeDatingFrame />

// With custom styling
<CollegeDatingFrame className="shadow-2xl border-2 border-red-200" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes to apply to the component |

### Dependencies

- React 18+
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide React icons

### Design System

The component follows the existing design system:
- Uses the same color palette as the main app
- Consistent typography with the Zodiak font
- Matches the button and UI component styles
- Responsive breakpoints and spacing

### Integration

The component is integrated into the main app through:
- `FigmaImportPage` - A demo page showcasing the component
- Accessible via the Figma icon in the app header
- Full-screen display with navigation back to the main app