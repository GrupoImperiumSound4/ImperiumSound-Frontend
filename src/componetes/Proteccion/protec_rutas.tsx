import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ValidToken } from '../ValidToken/ValidToken';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await ValidToken();
      
      if (result === null) {
        // Si hay error, no está autenticado
        setIsAuthenticated(false);
      } else{
        // Si hay resultado válido, está autenticado
        setIsAuthenticated(true);
      } 
    };

    checkAuth();
  }, []);

  // Mostrar loading mientras verifica
  if (isAuthenticated === null) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px',
        color: '#666',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Verificando sesión...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/inicio-sesion" state={{ from: location.pathname}} replace />;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}