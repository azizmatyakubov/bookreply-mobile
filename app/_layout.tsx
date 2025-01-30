import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../global.css";

// Define types for our context
type User = {
  id?: string;
  username: string;
  password?: string;
  // Add other user properties as needed
};

type AuthContextType = {
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // Check for stored user data on mount
  useEffect(() => {
    loadUser();
  }, []);

  // Handle navigation based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    
    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // Redirect to main app if authenticated
      router.replace("/(auth)/login");
    }
  }, [user, segments, isLoading]);

  // Load user data from storage
  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        console.log(JSON.parse(storedUser));
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async (userData: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error signing in:", error);
      throw new Error("Failed to sign in");
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out:", error);
      throw new Error("Failed to sign out");
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Root layout component
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="(auth)" 
          options={{
            headerShown: false,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
            gestureEnabled: false,
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}