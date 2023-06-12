// Función para obtener el token del localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return JSON.parse(user);
};

export const getImagenP = () => {
  return localStorage.getItem("imagenP");
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Devuelve true si el token existe
};

// Función para eliminar el token del localStorage
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("imagenP");
};
