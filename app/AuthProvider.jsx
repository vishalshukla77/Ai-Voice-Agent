"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { useEffect, useState, createContext } from "react";

// Create context
export const UserContext = createContext();

function AuthProvider({ children }) {
  const user = useUser();
  const createUser = useMutation(api.users.CreateNewUser);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (user) {
      (async () => {
        const result = await createUser({
          name: user?.displayName,
          email: user?.primaryEmail,
        });
        console.log(result);
        setUserData(result);
      })();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthProvider;
