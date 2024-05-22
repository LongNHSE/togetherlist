'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
}

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    setUser(userFromStorage ? JSON.parse(userFromStorage) : null);
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
