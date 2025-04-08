import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import LoadingSpinner from '@/components/LoadingSpinner';

interface RequireRoleProps {
  allowedRoles: ('host' | 'player' | 'admin')[];
}

export default function RequireRole({ allowedRoles }: RequireRoleProps) {
  const { user, loading } = useUser();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
