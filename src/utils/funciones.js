function obtenerAnioActual() {
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  return anio;
}

module.exports = {
  obtenerAnioActual,
};
