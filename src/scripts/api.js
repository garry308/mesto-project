import { imageInput, profileNameInput, profileBioInput,
  cardNameInput, cardLinkInput} from "./utils.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9',
    'Content-Type': 'application/json'
  }
}

export const profileLoading = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export const defaultCardsLoading = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse);
}

export const newImagePatch = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-9/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageInput.value,
    })
  })
  .then(checkResponse);
}

export const profileInfoPatch = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileNameInput.value,
      about: profileBioInput.value
    })
  })
  .then(checkResponse);
}

export const pushCard = (evt) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardLinkInput.value
    })
  })
  .then(checkResponse);
}

export const postLike = (method, evt) => {
  const cardId = evt.target.offsetParent.id;
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
  .then(checkResponse);
}

export const fetchDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}
