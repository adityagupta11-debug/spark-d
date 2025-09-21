import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// User profile interface
export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  major: string;
  year: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}

// Sign up function
export const signUp = async (
  email: string, 
  password: string, 
  userData: Omit<UserProfile, 'uid' | 'email' | 'createdAt' | 'updatedAt' | 'isVerified'>
): Promise<UserCredential> => {
  try {
    // Validate college email (optional - you can remove this for general use)
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });

    // Send email verification
    await sendEmailVerification(user);

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);

    return userCredential;
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

// Sign in function
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

// Sign out function
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  }
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    console.error('Get user profile error:', error);
    throw new Error('Failed to get user profile');
  }
};

// Update user profile
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...updates,
      updatedAt: new Date()
    }, { merge: true });
  } catch (error: any) {
    console.error('Update user profile error:', error);
    throw new Error('Failed to update user profile');
  }
};

// Error message helper
const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    default:
      return 'An error occurred. Please try again';
  }
};