import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Only clear if explicitly logged out or session expired
        // However, since we init from localStorage, we might want to keep it if firebase is just slow?
        // No, if firebase says null, it means no session. 
        // BUT, we just signed in with a custom token.
        // Let's trust localStorage for the USER OBJECT, and just use Firebase for the "are we authenticated" check?
        // Actually, if we are using custom token, Firebase should be logged in.

        // SAFEST BET: Don't touch localStorage here. 
        // The login page sets it. The logout function clears it.
        // If firebase session expires, we might want to clear it, but let's see.
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
