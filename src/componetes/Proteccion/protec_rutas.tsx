import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ValidToken } from '../ValidToken/ValidToken';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  console.log("🛡️ [PROTECTED_ROUTE] Verificando acceso a:", location.pathname);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔐 [PROTECTED_ROUTE] Iniciando verificación...");
      
      try {
        const result = await ValidToken();
        console.log("📊 [PROTECTED_ROUTE] Resultado de ValidToken:", result);
        
        if (result === null) {
          // No hay token válido
          console.log("❌ [PROTECTED_ROUTE] Token inválido o no existe");
          setIsAuthenticated(false);
        } else {
          // Token válido
          console.log("✅ [PROTECTED_ROUTE] Token válido. Usuario:", result);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("❌ [PROTECTED_ROUTE] Error al verificar:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location.pathname]); // Se ejecuta cada vez que cambia la ruta

  // Mostrar loading mientras verifica
  if (isAuthenticated === null) {
    console.log("⏳ [PROTECTED_ROUTE] Verificando autenticación...");
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
        <p style={{ fontSize: '14px', color: '#999' }}>
          Ruta: {location.pathname}
        </p>
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
    console.log("🚫 [PROTECTED_ROUTE] Acceso denegado. Redirigiendo a /inicio-sesion");
    console.log("📍 [PROTECTED_ROUTE] Guardando ruta de origen:", location.pathname);
    return <Navigate to="/inicio-sesion" state={{ from: location.pathname }} replace />;
  }

  // Si está autenticado, mostrar el contenido
  console.log("✅ [PROTECTED_ROUTE] Acceso permitido. Mostrando contenido");
  return <>{children}</>;
}