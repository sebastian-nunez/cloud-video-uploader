import { onAuthStateChangedHelper } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

/**
 * Custom hook to get the current user from Firebase Auth
 * @returns The current user
 */
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper(user => {
      setUser(user);
    });

    // cleanup
    return () => unsubscribe();
  });

  return { user };
};

export default useAuth;
