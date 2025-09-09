import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Cookies from "js-cookie";
import type { FirebaseError } from "firebase/app";
import type { ProductRow } from "../view/uploadSheet";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<User | null>;
  registerWithEmail: (
    name: string,
    email: string,
    password: string
  ) => Promise<User | null>;
  loginWithEmail: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  sheetData: ProductRow[];
  setSheetData: (data: ProductRow[]) => void;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [sheetData, setSheetData] = useState<ProductRow[]>(() => {
    const storedData = localStorage.getItem("sheetData");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Helper function to handle token setting
  const setUserAndToken = async (user: User) => {
    setUser(user);
    const idToken = await user.getIdToken();
    setToken(idToken);
    Cookies.set("authToken", idToken, { expires: 1 });
  };

  const loginWithGoogle = async (): Promise<User | null> => {
    try {
      // Clear any existing auth state
      await signOut(auth);
  
      provider.setCustomParameters({ prompt: "select_account" });
  
      const result = await signInWithPopup(auth, provider);
  
      if (result?.user) {
        await setUserAndToken(result.user);
        return result.user;
      }
      return null;
    } catch (error) {
      console.error("Google Login Error:", error);
      const firebaseError = error as FirebaseError;
  
      if (firebaseError.code === "auth/popup-closed-by-user") {
        throw new Error("Login cancelled by user");
      } else if (firebaseError.code === "auth/popup-blocked") {
        throw new Error("Popup blocked. Please enable popups.");
      }
  
      throw new Error("Google login failed");
    }
  };
  

  const registerWithEmail = async (
    name: string,
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      // Create user account
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user profile with the display name
      await updateProfile(result.user, { displayName: name });
      
      // Reload user to get updated profile
      await result.user.reload();
      
      await setUserAndToken(result.user);
      return result.user;
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error("Registration Error:", firebaseError);

      // Handle specific registration errors
      let errorMessage = "Registration failed. Please try again.";
      
      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Please use a different email or try logging in.";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters long.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password authentication is not enabled. Please contact support or try Google sign-in.";
          break;
        default:
          errorMessage = "Registration failed. Please try again.";
      }
      
      throw new Error(errorMessage);
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await setUserAndToken(result.user);
      return result.user;
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error("Login Error:", firebaseError);
      
      // Handle specific login errors
      let errorMessage = "Login failed. Please try again.";
      
      switch (firebaseError.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email. Please sign up first.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        default:
          errorMessage = "Login failed. Please check your credentials.";
      }
      
      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      setToken("");
      Cookies.remove("authToken");
      localStorage.removeItem("sheetData");
      setSheetData([]);
    } catch (error) {
      console.error("Logout Error:", error);
      throw new Error("Logout failed");
    }
  };

  useEffect(() => {
    // Handle redirect result for mobile Google login
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          await setUserAndToken(result.user);
        }
      } catch (error) {
        console.error("Redirect result error:", error);
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          await setUserAndToken(currentUser);
        } else {
          setUser(null);
          setToken("");
          Cookies.remove("authToken");
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUser(null);
        setToken("");
        Cookies.remove("authToken");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update localStorage when sheetData changes
  useEffect(() => {
    if (sheetData.length > 0) {
      localStorage.setItem("sheetData", JSON.stringify(sheetData));
    }
  }, [sheetData]);

  const value: AuthContextType = {
    user,
    loading,
    loginWithGoogle,
    registerWithEmail,
    loginWithEmail,
    logout,
    isAuthenticated: !!user,
    sheetData,
    setSheetData,
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;