const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { checkResponse };

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export { getItems };

function postItems(name, imageUrl, weather, token) {
  return fetch(`${baseUrl}/items`, {
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
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export { deleteItems };
