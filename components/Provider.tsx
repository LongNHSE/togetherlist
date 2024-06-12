'use client';
import React from 'react';
import { createContext, useContext, useState } from 'react';
type AppContextType = {
  sessionToken: string;
  setSessionToken: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an Provider');
  }
  return context;
};

export default function Provider({ children }: { children: React.ReactNode }) {
  const [sessionToken, setSessionToken] = useState('');

  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}
