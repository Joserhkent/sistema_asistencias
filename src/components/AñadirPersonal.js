import React, { useState } from 'react';

function AñadirPersonal({ onBack, agregarPersonal, personal, recargarPersonal }) {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    if (!dni.trim() || !nombre.trim() || !apellido.trim()) {
      setMensaje('Por favor, complete todos los campos');
      setTipoMensaje('error');
      return;
    }

    if (dni.length !== 8) {
      setMensaje('El DNI debe tener 8 dígitos');
      setTipoMensaje('error');
      return;
    }

    setLoading(true);
    const result = await agregarPersonal({ dni, nombre, apellido });
    setLoading(false);

    if (result.success) {
      setMensaje(`Personal ${nombre} ${apellido} agregado exitosamente`);
      setTipoMensaje('success');
      setDni('');
      setNombre('');
      setApellido('');
    } else {
      setMensaje(result.error);
      setTipoMensaje('error');
    }
  };

  return (
    <div className="form-container">
      <h2>Añadir Personal</h2>
      
      <div className="form-group">
        <label>DNI:</label>
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
          placeholder="Ej: 12345678"
          maxLength="8"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese el nombre"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ingrese el apellido"
          disabled={loading}
        />
      </div>

      {mensaje && (
        <div className={`mensaje ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      <div className="form-buttons">
        <button className="btn-guardar" onClick={handleGuardar} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      <h3>Personal Registrado:</h3>
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

export default AñadirPersonal;
