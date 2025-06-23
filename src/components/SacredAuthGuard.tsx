
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSacredAuth } from '@/hooks/useSacredAuth';

interface SacredAuthGuardProps {
  children: React.ReactNode;
}

const SacredAuthGuard = ({ children }: SacredAuthGuardProps) => {
  const { user, isLoading } = useSacredAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Connecting to the Sacred Network...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default SacredAuthGuard;
