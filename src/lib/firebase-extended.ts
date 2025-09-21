import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

// Extended User Profile with Music Integration
export interface ExtendedUserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  major: string;
  year: string;
  bio: string;
  campus: 'tempe' | 'downtown' | 'west' | 'polytechnic';
  interests: string[];
  photos: string[];
  musicProfile?: {
    platform: 'spotify' | 'apple';
    isConnected: boolean;
    username?: string;
    topArtists?: string[];
    topGenres?: string[];
    topTracks?: string[];
    lastUpdated?: Date;
  };
  preferences?: {
    ageRange: { min: number; max: number };
    maxDistance: number;
    showMe: 'everyone' | 'men' | 'women';
    musicMatchImportance: 'low' | 'medium' | 'high';
    campusPreference: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Match Data Structure
export interface Match {
  id?: string;
  users: string[]; // Array of two user UIDs
  matchedAt: Date;
  lastMessage?: string;
  lastMessageAt?: Date;
  musicCompatibility?: number;
  commonInterests: string[];
  status: 'active' | 'unmatched' | 'blocked';
}

// Swipe Data Structure
export interface Swipe {
  id?: string;
  fromUserId: string;
  toUserId: string;
  action: 'like' | 'pass';
  swipedAt: Date;
}

// Date Idea Structure
export interface DateIdea {
  id?: string;
  title: string;
  location: string;
  description: string;
  category: 'food' | 'activity' | 'study' | 'entertainment' | 'sports';
  distance: string;
  price: '$' | '$$' | '$$$' | 'Free';
  coordinates?: { lat: number; lng: number };
  campuses: string[]; // Which campuses this is near
  rating?: number;
  reviews?: number;
}

// Save or update extended user profile
export async function saveExtendedProfile(profile: Partial<ExtendedUserProfile>) {
  try {
    const userRef = doc(db, 'users', profile.uid!);
    await setDoc(userRef, {
      ...profile,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error saving extended profile:', error);
    return { success: false, error };
  }
}

// Connect music service
export async function connectMusicService(
  uid: string, 
  platform: 'spotify' | 'apple',
  musicData: any
) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      musicProfile: {
        platform,
        isConnected: true,
        username: musicData.username,
        topArtists: musicData.topArtists || [],
        topGenres: musicData.topGenres || [],
        topTracks: musicData.topTracks || [],
        lastUpdated: serverTimestamp()
      },
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error connecting music service:', error);
    return { success: false, error };
  }
}

// Record a swipe action
export async function recordSwipe(swipe: Omit<Swipe, 'id'>) {
  try {
    const swipeData = {
      ...swipe,
      swipedAt: serverTimestamp()
    };
    
    const swipeRef = await addDoc(collection(db, 'swipes'), swipeData);
    
    // Check for mutual like (match)
    if (swipe.action === 'like') {
      const reverseSwipeQuery = query(
        collection(db, 'swipes'),
        where('fromUserId', '==', swipe.toUserId),
        where('toUserId', '==', swipe.fromUserId),
        where('action', '==', 'like')
      );
      
      const reverseSwipes = await getDocs(reverseSwipeQuery);
      
      if (!reverseSwipes.empty) {
        // Create a match!
        await createMatch(swipe.fromUserId, swipe.toUserId);
        return { success: true, matched: true };
      }
    }
    
    return { success: true, matched: false };
  } catch (error) {
    console.error('Error recording swipe:', error);
    return { success: false, error };
  }
}

// Create a match between two users
export async function createMatch(userId1: string, userId2: string) {
  try {
    // Get both user profiles to calculate compatibility
    const user1Doc = await getDoc(doc(db, 'users', userId1));
    const user2Doc = await getDoc(doc(db, 'users', userId2));
    
    const user1Data = user1Doc.data() as ExtendedUserProfile;
    const user2Data = user2Doc.data() as ExtendedUserProfile;
    
    // Calculate music compatibility
    let musicCompatibility = 0;
    if (user1Data.musicProfile?.isConnected && user2Data.musicProfile?.isConnected) {
      const commonGenres = user1Data.musicProfile.topGenres?.filter(
        g => user2Data.musicProfile?.topGenres?.includes(g)
      ) || [];
      const commonArtists = user1Data.musicProfile.topArtists?.filter(
        a => user2Data.musicProfile?.topArtists?.includes(a)
      ) || [];
      
      musicCompatibility = Math.min(
        100,
        (commonGenres.length * 20) + (commonArtists.length * 15)
      );
    }
    
    // Find common interests
    const commonInterests = user1Data.interests?.filter(
      i => user2Data.interests?.includes(i)
    ) || [];
    
    const matchData: Match = {
      users: [userId1, userId2].sort(), // Sort for consistency
      matchedAt: new Date(),
      musicCompatibility,
      commonInterests,
      status: 'active'
    };
    
    await addDoc(collection(db, 'matches'), {
      ...matchData,
      matchedAt: serverTimestamp()
    });
    
    return { success: true, musicCompatibility, commonInterests };
  } catch (error) {
    console.error('Error creating match:', error);
    return { success: false, error };
  }
}

// Get user's matches
export async function getUserMatches(userId: string) {
  try {
    const matchesQuery = query(
      collection(db, 'matches'),
      where('users', 'array-contains', userId),
      where('status', '==', 'active'),
      orderBy('matchedAt', 'desc')
    );
    
    const matchesSnapshot = await getDocs(matchesQuery);
    const matches: Match[] = [];
    
    for (const doc of matchesSnapshot.docs) {
      const matchData = doc.data() as Match;
      matchData.id = doc.id;
      
      // Get the other user's profile
      const otherUserId = matchData.users.find(id => id !== userId);
      if (otherUserId) {
        const otherUserDoc = await getDoc(doc(db, 'users', otherUserId));
        if (otherUserDoc.exists()) {
          matches.push({
            ...matchData,
            otherUser: otherUserDoc.data()
          } as any);
        }
      }
    }
    
    return { success: true, matches };
  } catch (error) {
    console.error('Error getting matches:', error);
    return { success: false, error, matches: [] };
  }
}

// Get potential profiles to swipe on
export async function getSwipeProfiles(userId: string, limit: number = 10) {
  try {
    // Get user's preferences
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data() as ExtendedUserProfile;
    
    // Get all users (in production, this would be more sophisticated)
    const usersQuery = query(
      collection(db, 'users'),
      where('uid', '!=', userId),
      limit(limit)
    );
    
    const usersSnapshot = await getDocs(usersQuery);
    
    // Get user's previous swipes
    const swipesQuery = query(
      collection(db, 'swipes'),
      where('fromUserId', '==', userId)
    );
    const swipesSnapshot = await getDocs(swipesQuery);
    const swipedUserIds = swipesSnapshot.docs.map(doc => doc.data().toUserId);
    
    // Filter out already swiped profiles
    const profiles = usersSnapshot.docs
      .map(doc => ({ ...doc.data(), id: doc.id } as ExtendedUserProfile))
      .filter(profile => !swipedUserIds.includes(profile.uid));
    
    // Calculate music compatibility for each profile
    const profilesWithCompatibility = profiles.map(profile => {
      let musicCompatibility = 0;
      if (userData.musicProfile?.isConnected && profile.musicProfile?.isConnected) {
        const commonGenres = userData.musicProfile.topGenres?.filter(
          g => profile.musicProfile?.topGenres?.includes(g)
        ) || [];
        musicCompatibility = Math.min(100, commonGenres.length * 33);
      }
      
      return {
        ...profile,
        musicCompatibility
      };
    });
    
    return { success: true, profiles: profilesWithCompatibility };
  } catch (error) {
    console.error('Error getting swipe profiles:', error);
    return { success: false, error, profiles: [] };
  }
}

// Get date ideas for a specific campus
export async function getDateIdeas(campus: string = 'tempe') {
  try {
    const ideasQuery = query(
      collection(db, 'dateIdeas'),
      where('campuses', 'array-contains', campus),
      orderBy('rating', 'desc'),
      limit(20)
    );
    
    const ideasSnapshot = await getDocs(ideasQuery);
    const ideas = ideasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DateIdea));
    
    return { success: true, ideas };
  } catch (error) {
    console.error('Error getting date ideas:', error);
    return { success: false, error, ideas: [] };
  }
}

// Initialize default date ideas (run once to populate database)
export async function initializeDateIdeas() {
  const defaultIdeas: Omit<DateIdea, 'id'>[] = [
    {
      title: 'Coffee at Memorial Union',
      location: 'Memorial Union, Tempe Campus',
      description: 'Grab coffee and enjoy the view from the upper floors',
      category: 'food',
      distance: '0.3 mi',
      price: '$',
      campuses: ['tempe'],
      rating: 4.5,
      reviews: 234
    },
    {
      title: 'Sunset at "A" Mountain',
      location: 'Hayden Butte Preserve',
      description: 'Hike up for amazing sunset views',
      category: 'activity',
      distance: '0.8 mi',
      price: 'Free',
      campuses: ['tempe'],
      rating: 4.8,
      reviews: 567
    },
    // Add more default ideas as needed
  ];
  
  try {
    for (const idea of defaultIdeas) {
      await addDoc(collection(db, 'dateIdeas'), idea);
    }
    return { success: true };
  } catch (error) {
    console.error('Error initializing date ideas:', error);
    return { success: false, error };
  }
}