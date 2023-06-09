// Función para obtener el token del localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Devuelve true si el token existe
};

// Función para eliminar el token del localStorage
export const logout = () => {
  localStorage.removeItem("token");
};
