"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  hasSeenPreloader: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
  hasSeenPreloader: false,
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSeenPreloader, setHasSeenPreloader] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("820lab-preloader-seen") === "1") {
        setHasSeenPreloader(true);
        setIsLoaded(true);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isLoaded && !hasSeenPreloader) {
      try {
        sessionStorage.setItem("820lab-preloader-seen", "1");
      } catch (e) {}
    }
  }, [isLoaded, hasSeenPreloader]);

  // Fallback to true if something goes wrong or preloader is disabled
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 10000); // 10 seconds max wait time for safety
    return () => clearTimeout(timeout);
  }, [isLoaded]);

  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded, hasSeenPreloader }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
