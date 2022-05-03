import { mainPageName, mainPageBio, mainPagePhoto, imageInput, profileNameInput, profileBioInput, cardNameInput, cardLinkInput, cardsContainer } from "./utils.js";
import { loadDefaultCard, createCard } from "./card.js";

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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      mainPageName.textContent = result.name;
      mainPageName.setAttribute('id', result._id);
      mainPageBio.textContent = result.about;
      mainPagePhoto.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const defaultCardsLoading = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
    .then((result) => {
      result.forEach(loadDefaultCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const newImagePatch = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-9/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageInput.value,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log(result);
      mainPagePhoto.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const pushCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardLinkInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      const newCard = createCard(result);
      cardsContainer.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}
