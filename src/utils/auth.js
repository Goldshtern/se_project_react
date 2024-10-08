import { checkResponse } from "./api";

const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function signup() {
  return fetch(`${baseUrl}/profile`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export { signup };

function signin() {
  return fetch(`${baseUrl}/profile`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export { signin };
