function obtenerAnioActual() {
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  return anio;
}

function diferenciaHoras(hora1, hora2) {
  // Convertir las cadenas de tiempo en objetos Date
  const fecha1 = new Date(`2000-01-01T${hora1}`);
  const fecha2 = new Date(`2000-01-01T${hora2}`);

  // Obtener la diferencia en milisegundos
  const diferenciaMs = fecha2 - fecha1;

  // Convertir la diferencia a horas
  const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));

  // Convertir la diferencia a minutos restantes
  const minutosRestantes = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));

  // Devolver la diferencia en formato "HH:mm"
  return `${horas}:${minutosRestantes.toString().padStart(2, '0')}`;
}

module.exports = {
  obtenerAnioActual,
  diferenciaHoras
};
