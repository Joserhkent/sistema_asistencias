import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import MenuPrincipal from './components/MenuPrincipal';
import Asistencia from './components/Asistencia';
import AñadirPersonal from './components/AñadirPersonal';
import EliminarPersonal from './components/EliminarPersonal';
import Reporte from './components/Reporte';
import * as api from './services/api';

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [vista, setVista] = useState('menu');
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar personal desde la API
  const cargarPersonal = async () => {
    try {
      setLoading(true);
      const data = await api.getPersonal();
      setPersonal(data);
      setError(null);
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Verificar si ya está autenticado al iniciar
  useEffect(() => {
    const estaAutenticado = localStorage.getItem('autenticado') === 'true';
    setAutenticado(estaAutenticado);
    if (estaAutenticado) {
      cargarPersonal();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    setAutenticado(true);
    localStorage.setItem('autenticado', 'true');
    cargarPersonal();
  };

  const handleLogout = () => {
    setAutenticado(false);
    localStorage.removeItem('autenticado');
    setVista('menu');
    setPersonal([]);
  };

  // Si no está autenticado, mostrar login
  if (!autenticado) {
    return <Login onLogin={handleLogin} />;
  }

  // Funciones CRUD
  const agregarPersonal = async (nuevoPersonal) => {
    try {
      await api.crearPersonal(nuevoPersonal);
      await cargarPersonal(); // Recargar lista
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const eliminarPersonalHandler = async (dni) => {
    try {
      await api.eliminarPersonal(dni);
      await cargarPersonal(); // Recargar lista
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const registrarAsistenciaHandler = async (dni, tipo) => {
    try {
      const result = await api.registrarAsistencia(dni, tipo);
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const renderVista = () => {
    if (loading && vista === 'menu') {
      return <div className="loading">Cargando...</div>;
    }

    if (error && vista === 'menu') {
      return (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={cargarPersonal}>Reintentar</button>
        </div>
      );
    }

    switch (vista) {
      case 'menu':
        return <MenuPrincipal onNavigate={setVista} onLogout={handleLogout} />;
      case 'asistencia':
        return (
          <Asistencia 
            onBack={() => setVista('menu')} 
            personal={personal}
            registrarAsistencia={registrarAsistenciaHandler}
          />
        );
      case 'añadir':
        return (
          <AñadirPersonal 
            onBack={() => setVista('menu')} 
            agregarPersonal={agregarPersonal}
            personal={personal}
            recargarPersonal={cargarPersonal}
          />
        );
      case 'eliminar':
        return (
          <EliminarPersonal 
            onBack={() => setVista('menu')} 
            personal={personal}
            eliminarPersonal={eliminarPersonalHandler}
          />
        );
      case 'reporte':
        return (
          <Reporte 
            onBack={() => setVista('menu')} 
            personal={personal}
          />
        );
      default:
        return <MenuPrincipal onNavigate={setVista} />;
    }
  };

  return (
    <div className="App">
      {renderVista()}
    </div>
  );
}

export default App;
