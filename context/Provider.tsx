'use client';
import { createContext, useContext, useEffect, useState } from 'react';

import { WorkspaceType as Workspace } from '@/lib/schema/workspace/workspace.schema';
interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  avatar: string;
}

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  members: any;
  setMembers: any;
  clearAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null,
  );
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    const currentWorkspaceFromStorage =
      localStorage.getItem('current_workspace');

    setUser(
      userFromStorage && userFromStorage !== 'undefined'
        ? JSON.parse(userFromStorage)
        : null,
    );
    setCurrentWorkspace(
      currentWorkspaceFromStorage && currentWorkspaceFromStorage !== 'undefined'
        ? JSON.parse(currentWorkspaceFromStorage)
        : null,
    );
  }, []);

  const clearAll = () => {
    setUser(null);
    setMembers([]);
    setLoading(false);
    setCurrentWorkspace(null);
    localStorage.removeItem('user');
    localStorage.removeItem('current_workspace');
  };
  return (
    <AppContext.Provider
      value={{
        members,
        setMembers,
        user,
        setUser,
        currentWorkspace,
        setCurrentWorkspace,
        loading,
        setLoading,
        clearAll,
      }}
    >
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
