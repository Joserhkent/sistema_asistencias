const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

/**
 * Obtener token del localStorage
 */
const getToken = () => localStorage.getItem('token');

/**
 * Headers con autenticación JWT
 */
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// ==================== AUTENTICACIÓN ====================

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error de autenticación');
  }
  return data;
};

export const validateToken = async () => {
  const response = await fetch(`${API_URL}/auth/validate`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    localStorage.removeItem('token');
    throw new Error('Token inválido');
  }
  return response.json();
};

// ==================== PERSONAL ====================

export const getPersonal = async () => {
  const response = await fetch(`${API_URL}/personal`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('Error al obtener personal');
  }
  return response.json();
};

export const getPersonalByDni = async (dni) => {
  const response = await fetch(`${API_URL}/personal/${dni}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Error al buscar personal');
  }
  return response.json();
};

export const crearPersonal = async (personal) => {
  const response = await fetch(`${API_URL}/personal`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(personal),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al crear personal');
  }
  return data;
};

export const eliminarPersonal = async (dni) => {
  const response = await fetch(`${API_URL}/personal/${dni}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al eliminar personal');
  }
  return data;
};

// ==================== ASISTENCIAS ====================

export const getAsistencias = async (fecha = null) => {
  const url = fecha 
    ? `${API_URL}/asistencias?fecha=${fecha}` 
    : `${API_URL}/asistencias`;
    
  const response = await fetch(url, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('Error al obtener asistencias');
  }
  return response.json();
};

export const getReporte = async (fecha) => {
  const response = await fetch(`${API_URL}/asistencias/reporte/${fecha}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('Error al obtener reporte');
  }
  return response.json();
};

export const registrarAsistencia = async (dni, tipo) => {
  const response = await fetch(`${API_URL}/asistencias`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ dni, tipo }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al registrar asistencia');
  }
  return data;
};

export const getAsistenciasByDni = async (dni, fechaInicio = null, fechaFin = null) => {
  let url = `${API_URL}/asistencias/empleado/${dni}`;
  
  if (fechaInicio && fechaFin) {
    url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
  }
  
  const response = await fetch(url, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('Error al obtener asistencias');
  }
  return response.json();
};
