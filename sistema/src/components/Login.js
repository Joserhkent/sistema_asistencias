import React, { useState } from 'react';
import * as api from '../services/api';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (!usuario.trim()) {
      setError('Por favor ingrese un usuario');
      setLoading(false);
      return;
    }

    if (!contraseña.trim()) {
      setError('Por favor ingrese la contraseña');
      setLoading(false);
      return;
    }

    try {
      // Llamar al backend para obtener JWT
      const response = await api.login(usuario, contraseña);
      
      // Guardar token en localStorage
      localStorage.setItem('autenticado', 'true');
      localStorage.setItem('token', response.token);
      localStorage.setItem('loginTime', new Date().toISOString());
      
      onLogin();
    } catch (err) {
      setError(err.message || 'Usuario o contraseña incorrectos');
      setContraseña('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Sistema de Asistencias</h1>
          <p>Corporación R&L Service</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-group">
            <label htmlFor="usuario">Usuario:</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="login-group">
            <label htmlFor="contraseña">Contraseña:</label>
            <div className="password-input-wrapper">
              <input
                id="contraseña"
                type={mostrarContraseña ? 'text' : 'password'}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Ingrese su contraseña"
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin(e);
                  }
                }}
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
                disabled={loading}
                title={mostrarContraseña ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {mostrarContraseña ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error">
              <strong>⚠️ {error}</strong>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p>Maquinaria Pesada - Control de Personal</p>
        </div>
      </div>

      {/* Créditos de los desarrolladores */}
      <div className="github-credits">
        <a 
          href="https://github.com/Joserhkent" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Joserhkent"
        >
          <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
        <a 
          href="https://github.com/RyanAlessandro12" 
          target="_blank" 
          rel="noopener noreferrer"
          title="RyanAlessandro12"
        >
          <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Login;
