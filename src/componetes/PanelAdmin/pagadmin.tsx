import { useState, useEffect } from 'react';
import "../../styles/admin.css"

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}

interface Sound {
  id: number;
  decibels: number;
  date: string;
  id_point: number;
  point?: {
    floor: number;
    area: string;
  };
}

interface Stats {
  total_users: number;
  total_sounds: number;
  total_points: number;
  avg_decibels: number;
  sounds_today: number;
  top_noisy_areas: Array<{
    area: string;
    avg_decibels: number;
    count: number;
  }>;
}

export default function PanelAdmin() {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'sounds'>('stats');
  const [users, setUsers] = useState<User[]>([]);
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/stats`, {

        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setError('Error al cargar estadísticas');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/users?limit=100`, {

        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        setError('Error al cargar usuarios');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Cargar sonidos
  const loadSounds = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/sounds?limit=100`, {

        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSounds(data.sounds);
      } else {
        setError('Error al cargar sonidos');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {

        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        alert('Usuario eliminado exitosamente');
        loadUsers();
      } else {
        const data = await response.json();
        alert(data.detail || 'Error al eliminar usuario');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  // Cambiar rol
  const changeRole = async (userId: number, newRole: string) => {
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}/role?role=${newRole}`, {

        method: 'PUT',
        credentials: 'include'
      });
      
      if (response.ok) {
        alert('Rol actualizado exitosamente');
        loadUsers();
      } else {
        const data = await response.json();
        alert(data.detail || 'Error al actualizar rol');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  // Eliminar sonido
  const deleteSound = async (soundId: number) => {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;
    
    try {
      const response = await fetch(`${API_URL}/admin/sounds/${soundId}`, {

        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        alert('Sonido eliminado exitosamente');
        loadSounds();
      } else {
        alert('Error al eliminar sonido');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  useEffect(() => {
    if (activeTab === 'stats') loadStats();
    else if (activeTab === 'users') loadUsers();
    else if (activeTab === 'sounds') loadSounds();
  }, [activeTab]);

  return (
<div className="ContainerUser-sp">
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
          🛡 Panel de Administrador
        </h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #e5e7eb' }}>
          {['stats', 'users', 'sounds'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab ? 'white' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid #667eea' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                color: activeTab === tab ? '#667eea' : '#666',
                fontSize: '16px'
              }}
            >
              {tab === 'stats' && '📊 Estadísticas'}
              {tab === 'users' && '👥 Usuarios'}
              {tab === 'sounds' && '🔊 Sonidos'}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {loading && <p>Cargando...</p>}

        {/* ESTADÍSTICAS */}
        {activeTab === 'stats' && stats && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{stats.total_users}</div>
                <div style={{ color: '#666', marginTop: '5px' }}>Total Usuarios</div>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{stats.total_sounds}</div>
                <div style={{ color: '#666', marginTop: '5px' }}>Total Sonidos</div>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{stats.avg_decibels} dB</div>
                <div style={{ color: '#666', marginTop: '5px' }}>Promedio dB</div>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>{stats.sounds_today}</div>
                <div style={{ color: '#666', marginTop: '5px' }}>Hoy</div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>🔥 Top 5 Áreas Más Ruidosas</h3>
              {stats.top_noisy_areas.map((area, i) => (
                <div key={i} style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{area.area}</span>
                  <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{area.avg_decibels} dB ({area.count} registros)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USUARIOS */}
        {activeTab === 'users' && (
          <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>ID</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Nombre</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Email</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Rol</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '15px' }}>{user.id}</td>
                    <td style={{ padding: '15px' }}>{user.name}</td>
                    <td style={{ padding: '15px' }}>{user.email}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        background: user.role === 'admin' ? '#fef3c7' : '#e0e7ff',
                        color: user.role === 'admin' ? '#92400e' : '#3730a3'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <select
                        onChange={(e) => changeRole(user.id, e.target.value)}
                        defaultValue={user.role}
                        style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #d1d5db' }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        onClick={() => deleteUser(user.id)}
                        style={{
                          padding: '5px 15px',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SONIDOS */}
        {activeTab === 'sounds' && (
          <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>ID</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Decibeles</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Área</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Piso</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Fecha</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sounds.map(sound => (
                  <tr key={sound.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '15px' }}>{sound.id}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold', color: sound.decibels > 80 ? '#ef4444' : '#10b981' }}>
                      {sound.decibels} dB
                    </td>
                    <td style={{ padding: '15px' }}>{sound.point?.area || 'N/A'}</td>
                    <td style={{ padding: '15px' }}>{sound.point?.floor || 'N/A'}</td>
                    <td style={{ padding: '15px', fontSize: '14px', color: '#666' }}>
                      {new Date(sound.date).toLocaleString('es-CO')}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <button
                        onClick={() => deleteSound(sound.id)}
                        style={{
                          padding: '5px 15px',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
 </div>
  );
}