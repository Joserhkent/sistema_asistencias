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
    </div>
  );
}

export default Login;
