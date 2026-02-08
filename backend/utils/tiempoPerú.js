/**
 * Funciones para obtener fecha y hora en zona horaria de Perú (UTC-5)
 * Estas funciones funcionan sin importar en qué país/servidor esté corriendo
 */

// Función para obtener la fecha/hora en zona horaria de Perú (UTC-5)
const obtenerFechaHoraPerú = () => {
  const ahora = new Date();
  // Convertir a UTC
  const utc = new Date(ahora.getTime() + ahora.getTimezoneOffset() * 60000);
  // Restar 5 horas para obtener hora de Perú (UTC-5)
  const fechaPerú = new Date(utc.getTime() - 5 * 60 * 60 * 1000);
  return fechaPerú;
};

// Función para obtener la hora en formato HH:MM:SS (zona horaria Perú)
const obtenerHoraPerú = () => {
  const fecha = obtenerFechaHoraPerú();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
};

// Función para obtener la fecha en formato YYYY-MM-DD (zona horaria Perú)
const obtenerFechaPerú = () => {
  const fecha = obtenerFechaHoraPerú();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const día = String(fecha.getDate()).padStart(2, '0');
  return `${año}-${mes}-${día}`;
};

module.exports = {
  obtenerFechaHoraPerú,
  obtenerHoraPerú,
  obtenerFechaPerú
};
