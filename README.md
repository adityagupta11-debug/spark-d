# Spark'd - College Dating App

A modern, streamlined dating app designed specifically for ASU students. Built with React, TypeScript, Firebase, and Tailwind CSS.

## Features

- **ASU Student Verification**: Only verified ASU students can join using their @asu.edu email
- **Multi-step Signup Process**: Clean, guided signup with academic information collection
- **Secure Authentication**: Firebase Authentication with email verification
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Live authentication state management
- **Modern Dashboard**: Comprehensive user profile and stats display

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd spark-d
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your Firebase configuration
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Copy your Firebase config to the `.env` file

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── SignUpForm.tsx  # Multi-step signup form
│   └── SignInForm.tsx  # Sign-in form
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── lib/                # Utility functions
│   ├── auth.ts         # Authentication functions
│   └── firebase.ts     # Firebase configuration
├── assets/             # Static assets (images, etc.)
└── App.tsx             # Main application component
```

## Key Features

### Authentication Flow
- Email/password authentication with Firebase
- ASU email validation
- Email verification required
- Persistent login state

### Signup Process
1. **Personal Info**: Name, email, password
2. **Academic Info**: Age, major, year
3. **Profile**: Bio and preferences

### Dashboard
- User profile display
- Quick action buttons
- Statistics tracking
- Responsive grid layout

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.