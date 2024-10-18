import { checkResponse } from "./api";

const baseUrl = "http://localhost:3001";

function signUp(name, avatarUrl, email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatarUrl, email, password }),
  }).then(checkResponse);
}

export { signUp };

function signIn() {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export { signIn };

const getUserInfo = (token) => {
  return fetch(`${baseUrl}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export { getUserInfo };
