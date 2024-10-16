const TOKEN_KEY = "jwt";

const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export { setToken };

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export { getToken };

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export { removeToken };
