import React from 'react';

function MenuPrincipal({ onNavigate, onLogout }) {
  return (
    <>
      <div className="menu-principal">
        <h1>Sistema de Control de Asistencias</h1>
        <div className="menu-buttons">
          <button className="menu-btn asistencia" onClick={() => onNavigate('asistencia')}>
            Asistencia
          </button>
          <button className="menu-btn añadir" onClick={() => onNavigate('añadir')}>
            Añadir Personal
          </button>
          <button className="menu-btn eliminar" onClick={() => onNavigate('eliminar')}>
            Eliminar Personal
          </button>
          <button className="menu-btn reporte" onClick={() => onNavigate('reporte')}>
            Reporte
          </button>
        </div>
      </div>
      <button className="btn-logout" onClick={onLogout}>
        🚪 Cerrar Sesión
      </button>
    </>
  );
}

export default MenuPrincipal;
