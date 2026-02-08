import React, { useState } from 'react';

function EliminarPersonal({ onBack, personal, eliminarPersonal }) {
  const [dniBusqueda, setDniBusqueda] = useState('');
  const [personaEncontrada, setPersonaEncontrada] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuscar = () => {
    if (!dniBusqueda.trim()) {
      setMensaje('Por favor, ingrese un DNI');
      setTipoMensaje('error');
      setPersonaEncontrada(null);
      return;
    }

    const persona = personal.find(p => p.dni === dniBusqueda);
    if (persona) {
      setPersonaEncontrada(persona);
      setMensaje('');
    } else {
      setPersonaEncontrada(null);
      setMensaje('No se encontró personal con ese DNI');
      setTipoMensaje('error');
    }
  };

  const handleEliminar = async () => {
    if (personaEncontrada) {
      setLoading(true);
      const result = await eliminarPersonal(personaEncontrada.dni);
      setLoading(false);

      if (result.success) {
        setMensaje(`Personal ${personaEncontrada.nombre} ${personaEncontrada.apellido} eliminado exitosamente`);
        setTipoMensaje('success');
        setPersonaEncontrada(null);
        setDniBusqueda('');
      } else {
        setMensaje(result.error);
        setTipoMensaje('error');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Eliminar Personal</h2>
      
      <div className="form-group">
        <label>Buscar por DNI:</label>
        <div className="busqueda-container">
          <input
            type="text"
            value={dniBusqueda}
            onChange={(e) => setDniBusqueda(e.target.value.replace(/\D/g, ''))}
            placeholder="Ingrese DNI a buscar"
            maxLength="8"
            disabled={loading}
          />
          <button className="btn-buscar" onClick={handleBuscar} disabled={loading}>
            Buscar
          </button>
        </div>
      </div>

      {mensaje && (
        <div className={`mensaje ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      {personaEncontrada && (
        <div className="persona-encontrada">
          <h3>Personal Encontrado:</h3>
          <div className="datos-persona">
            <p><strong>DNI:</strong> {personaEncontrada.dni}</p>
            <p><strong>Nombre:</strong> {personaEncontrada.nombre}</p>
            <p><strong>Apellido:</strong> {personaEncontrada.apellido}</p>
          </div>
          <button className="btn-eliminar" onClick={handleEliminar} disabled={loading}>
            {loading ? 'Eliminando...' : 'Eliminar Personal'}
          </button>
        </div>
      )}

      <h3>Lista de Personal:</h3>
      <table className="tabla-personal">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {personal.map((p, index) => (
            <tr key={index}>
              <td>{p.dni}</td>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn-volver" onClick={onBack}>← Volver al Menú</button>
    </div>
  );
}

export default EliminarPersonal;
