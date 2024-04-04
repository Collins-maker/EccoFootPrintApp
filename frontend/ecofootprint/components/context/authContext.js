// components/context/AuthContext.js
import React, { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // The login function is responsible for handling the login API call
  const login = async (inputs) => {
    try {
      const res = await axios.post("http://192.168.100.2:4000/login", inputs, {
        withCredentials: true,
      });

      // Check if the session identifier is present in the response
      if (res.data && res.data.sessionIdentifier) {
        setCurrentUser(res.data.user);

        // Save session identifier in AsyncStorage
        await AsyncStorage.setItem(
          "sessionIdentifier",
          res.data.sessionIdentifier
        );
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.log(
        "Login failed. Error:",
        error.response?.data?.message || "An error occurred"
      );
      setCurrentUser(null);
      throw error;
    }
  };

  // Attempt to restore the user session when the component mounts
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const sessionIdentifier = await AsyncStorage.getItem(
          "sessionIdentifier"
        );
        if (sessionIdentifier) {
          const response = await axios.get(
            `http://192.168.100.2:4000/restore-session/${sessionIdentifier}`
          );
          setCurrentUser(response.data.user);
        }
      } catch (error) {
        console.log("Error restoring session:", error);
      }
    };

    restoreSession();
  }, []);

  // Memoize the value provided to AuthContext using useMemo
  const authContextValue = useMemo(
    () => ({ currentUser, login }),
    [currentUser, login]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
