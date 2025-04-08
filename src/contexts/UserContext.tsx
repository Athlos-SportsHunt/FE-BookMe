import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface User {
  id: string;
  username: string;
  role: 'host' | 'player' | 'admin';
  // Add other user properties as needed
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [serverDown, setServerDown] = useState(false);
  const navigate = useNavigate();
  const location = window.location;

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await authService.checkAuth();
      
      if (response.serverDown) {
        setServerDown(true);
        setError(new Error(response.error));
        if (location.pathname !== '/error') {
          navigate('/error');
        }
        return;
      }

      if (response.isAuthenticated && response.user) {
        setUser(response.user);
        setServerDown(false);
      }
    } catch (err) {
      setError(err as Error);
      setServerDown(true);
      if (location.pathname !== '/error') {
        navigate('/error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // Prevent navigation to other routes if server is down
    if (serverDown && location.pathname !== '/error') {
      navigate('/error');
    }
  }, [serverDown, location.pathname]);

  const value = {
    user,
    loading,
    error,
    serverDown,
    refetchUser: fetchUser,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
