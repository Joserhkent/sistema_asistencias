import React, { useState } from 'react';

function Asistencia({ onBack, personal, registrarAsistencia }) {
  const [modo, setModo] = useState(null); // 'entrada' o 'salida'
  const [dni, setDni] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    if (!dni.trim()) {
      setMensaje('Por favor, ingrese un DNI');
      setTipoMensaje('error');
      return;
    }

    setLoading(true);
    const result = await registrarAsistencia(dni, modo);
    setLoading(false);

    if (result.success) {
      setMensaje(result.data.message);
      setTipoMensaje('success');
      setDni('');
    } else {
      setMensaje(result.error);
      setTipoMensaje('error');
    }
  };

  if (!modo) {
    return (
      <div className="asistencia-container">
        <h2>Registro de Asistencia</h2>
        <div className="asistencia-buttons">
          <button className="btn-entrada" onClick={() => setModo('entrada')}>
            Entrada
          </button>
          <button className="btn-salida" onClick={() => setModo('salida')}>
            Salida
          </button>
        </div>
        <button className="btn-volver" onClick={onBack}>← Volver al Menú</button>
      </div>
    );
  }

  return (
    <div className="asistencia-container">
      <h2>{modo === 'entrada' ? 'Registro de Entrada' : 'Registro de Salida'}</h2>
      
      <div className="form-group">
        <label>Ingrese su DNI:</label>
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
          placeholder="Ej: 12345678"
          maxLength="8"
          disabled={loading}
        />
      </div>

      {mensaje && (
        <div className={`mensaje ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      <div className="form-buttons">
        <button className="btn-aceptar" onClick={handleRegistro} disabled={loading}>
          {loading ? 'Registrando...' : 'Aceptar'}
        </button>
        <button className="btn-cancelar" onClick={() => {
          setModo(null);
          setDni('');
          setMensaje('');
        }} disabled={loading}>
          Atrás
        </button>
      </div>
      
      <button className="btn-volver" onClick={onBack}>← Volver al Menú</button>
    </div>
  );
}

export default Asistencia;
