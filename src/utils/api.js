import { getToken } from "./token";
import { BASE_URL } from "../utils/constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { checkResponse };

function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
}

export { getItems };

function postItems(name, imageUrl, weather, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
}

export { postItems };

function deleteItems(_id, token) {
  console.log(_id);
  return fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { deleteItems };

function addCardLike(_id) {
  console.log(_id);
  const token = getToken();
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { addCardLike };

function removeCardLike(_id) {
  console.log(_id);
  const token = getToken();
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { removeCardLike };
