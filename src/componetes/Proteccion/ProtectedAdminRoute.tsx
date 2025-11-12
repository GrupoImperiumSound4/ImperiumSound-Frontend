import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string>("");

  const API_URL = "https://imperium-sound-backend.vercel.app";

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        console.log("🛡️ Verificando permisos de administrador...");

        const response = await fetch(`${API_URL}/user/me`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log("📡 Status de verificación admin:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("👤 Datos del usuario:", data);
          console.log("🎭 Rol detectado:", data.role);

          if (data.role === 'admin') {
            console.log(" Usuario es ADMIN - Acceso permitido");
            setIsAdmin(true);
          } else {
            console.log(" Usuario NO es admin - Rol:", data.role);
            setError(`Acceso denegado. Tu rol es: ${data.role}`);
            setIsAdmin(false);
          }
        } else {
          console.log(" No autenticado - Status:", response.status);
          setError("No estás autenticado");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error(' Error verificando permisos de admin:', error);
        setError("Error al verificar permisos");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ fontSize: '48px' }}>🛡️</div>
        <div>Verificando permisos de administrador...</div>
      </div>
    );
  }

  if (!isAdmin) {
    console.log("Acceso denegado al panel de admin");
    console.log("Redirigiendo a cuenta");
    
    // Mostrar mensaje antes de redirigir
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '64px' }}>🚫</div>
        <div>Acceso Denegado</div>
        <div style={{ fontSize: '16px', opacity: 0.9 }}>
          {error || "No tienes permisos de administrador"}
        </div>
        <div style={{ fontSize: '14px', opacity: 0.7 }}>
          Redirigiendo...
        </div>
        <Navigate to="/cuenta" replace />
      </div>
    );
  }

  console.log("Acceso al panel de admin PERMITIDO");
  return <>{children}</>;
}