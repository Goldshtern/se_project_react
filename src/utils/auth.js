import { checkResponse } from "./api";

import { BASE_URL } from "../utils/constants";

function signUp({ name, avatarUrl, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatarUrl, email, password }),
  }).then(checkResponse);
}

export { signUp };

function signIn({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export { signIn };

const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export { getUserInfo };

const updateCurrentUser = ({ name, avatarUrl }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatarUrl }),
  }).then(checkResponse);
};

export { updateCurrentUser };
