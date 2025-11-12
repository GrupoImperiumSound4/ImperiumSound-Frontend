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

  const API_URL = "https://imperium-sound-backend.vercel.app";

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/admin/stats`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else if (response.status === 403) {
        setError('No tienes permisos de administrador');
      } else {
        setError('Error al cargar estadísticas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/admin/users?limit=100`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else if (response.status === 403) {
        setError('No tienes permisos de administrador');
      } else {
        setError('Error al cargar usuarios');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Cargar sonidos
  const loadSounds = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/admin/sounds?limit=100`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSounds(data.sounds);
      } else if (response.status === 403) {
        setError('No tienes permisos de administrador');
      } else {
        setError('Error al cargar sonidos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
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
      <div className='cuadro-ad'>
        <div className='panel'>
          <h1 className='titulo'>
             Panel de Administrador
          </h1>

          <div className='cont-botones-pestana'>
            {['stats', 'users', 'sounds'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`boton-pestana ${activeTab === tab ? 'activo' : ''}`}
              >
                {tab === 'stats' && ' Estadísticas'}
                {tab === 'users' && ' Usuarios'}
                {tab === 'sounds' && ' Sonidos'}
              </button>
            ))}
          </div>

          {error && (
            <div className='mensaje-error'>
              ⚠️ {error}
            </div>
          )}

          {loading && (
            <div className='mensaje-carga'>
              ⏳ Cargando datos...
            </div>
          )}

          {/* ESTADÍSTICAS */}
          {activeTab === 'stats' && stats && !loading && (
            <div>
              <div className='cont-tarjetas-stats'>
                <div className='tarjeta-stat azul'>
                  <div className='valor-stat'>{stats.total_users}</div>
                  <div className='etiqueta-stat'>Total Usuarios</div>
                </div>
                <div className='tarjeta-stat verde'>
                  <div className='valor-stat'>{stats.total_sounds}</div>
                  <div className='etiqueta-stat'>Total Sonidos</div>
                </div>
                <div className='tarjeta-stat amarillo'>
                  <div className='valor-stat'>{stats.avg_decibels} dB</div>
                  <div className='etiqueta-stat'>Promedio dB</div>
                </div>
                <div className='tarjeta-stat rojo'>
                  <div className='valor-stat'>{stats.sounds_today}</div>
                  <div className='etiqueta-stat'>Registros Hoy</div>
                </div>
              </div>

              <div className='tarjeta-top-ruidos'>
                <h3 className='titulo-top-ruidos'>🔥 Top 5 Áreas Más Ruidosas</h3>
                {stats.top_noisy_areas.length > 0 ? (
                  stats.top_noisy_areas.map((area, i) => (
                    <div key={i} className='item-area-ruidosa'>
                      <div className='cont-nombre-area'>
                        <span className='posicion-area'>#{i + 1}</span>
                        <span className='nombre-area'>{area.area}</span>
                      </div>
                      <div className='cont-datos-area'>
                        <div className='valor-db-area'>{area.avg_decibels} dB</div>
                        <div className='contador-registros-area'>{area.count} registros</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='mensaje-no-datos'>No hay datos disponibles</p>
                )}
              </div>
            </div>
          )}

          {/* USUARIOS */}
          {activeTab === 'users' && !loading && (
            <div className='cont-tabla-principal'>
              <div className='cont-tabla-scroll'>
                <table className='tabla-datos'>
                  <thead className='encabezado-tabla azul-degradado'>
                    <tr>
                      <th className='celda-encabezado-tabla'>ID</th>
                      <th className='celda-encabezado-tabla'>Nombre</th>
                      <th className='celda-encabezado-tabla'>Email</th>
                      <th className='celda-encabezado-tabla'>Rol</th>
                      <th className='celda-encabezado-tabla centrado'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map(user => (
                        <tr key={user.id} className='fila-tabla' onMouseEnter={(e) => e.currentTarget.classList.add('hover')} onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}>
                          <td className='celda-tabla-id'>{user.id}</td>
                          <td className='celda-tabla'>{user.name}</td>
                          <td className='celda-tabla email'>{user.email}</td>
                          <td className='celda-tabla'>
                            <span className={`etiqueta-rol ${user.role === 'admin' ? 'admin' : 'user'}`}>
                              {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                            </span>
                          </td>
                          <td className='celda-tabla centrado'>
                            <select
                              onChange={(e) => changeRole(user.id, e.target.value)}
                              value={user.role}
                              className='selector-rol'
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className='boton-eliminar'
                            >
                              🗑️ Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className='celda-no-datos'>
                          No hay usuarios registrados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SONIDOS */}
          {activeTab === 'sounds' && !loading && (
            <div className='cont-tabla-principal'>
              <div className='cont-tabla-scroll'>
                <table className='tabla-datos'>
                  <thead className='encabezado-tabla azul-degradado'>
                    <tr>
                      <th className='celda-encabezado-tabla'>ID</th>
                      <th className='celda-encabezado-tabla'>Decibeles</th>
                      <th className='celda-encabezado-tabla'>Ubicación</th>
                      <th className='celda-encabezado-tabla'>Piso</th>
                      <th className='celda-encabezado-tabla'>Fecha</th>
                      <th className='celda-encabezado-tabla centrado'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sounds.length > 0 ? (
                      sounds.map(sound => (
                        <tr key={sound.id} className='fila-tabla' onMouseEnter={(e) => e.currentTarget.classList.add('hover')} onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}>
                          <td className='celda-tabla-id'>{sound.id}</td>
                          <td className='celda-tabla'>
                            <span className={`valor-decibel ${sound.decibels > 80 ? 'rojo' : sound.decibels > 60 ? 'amarillo' : 'verde'}`}>
                              {sound.decibels} dB
                            </span>
                          </td>
                          <td className='celda-tabla'>{sound.point?.area || 'Sin ubicación'}</td>
                          <td className='celda-tabla'>{sound.point?.floor || 'N/A'}</td>
                          <td className='celda-tabla fecha-hora'>
                            {new Date(sound.date).toLocaleString('es-CO', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className='celda-tabla centrado'>
                            <button
                              onClick={() => deleteSound(sound.id)}
                              className='boton-eliminar'
                            >
                              🗑️ Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className='celda-no-datos'>
                          No hay sonidos registrados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}