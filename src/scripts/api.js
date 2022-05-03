import { profilePopup, imagePopup, cardPopup, mainPageName, mainPageBio,
  mainPagePhoto, imageInput, profileNameInput, profileBioInput,
  cardNameInput, cardLinkInput, cardsContainer } from "./utils.js";
import { loadDefaultCard, createCard } from "./card.js";
import { closePopup } from "./modal.js";

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
      profileNameInput.value = mainPageName.textContent;
      profileBioInput.value = mainPageBio.textContent;
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

export const newImagePatch = (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
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
      evt.submitter.classList.remove('popup__save-button_active');
      imageInput.value = "";
      mainPagePhoto.src = result.avatar;
      closePopup(imagePopup);
      evt.submitter.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

export const profileInfoPatch = (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
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
      mainPageName.textContent = result.name;
      mainPageBio.textContent = result.about;
      closePopup(profilePopup);
      evt.submitter.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

export const pushCard = (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
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
      closePopup(cardPopup);
      evt.submitter.textContent = "Сохранить";
      evt.submitter.classList.remove('popup__save-button_active');
      cardNameInput.value = "";
      cardLinkInput.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

export const postLike = (method, evt) => {
  const cardId = evt.target.offsetParent.id;
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    evt.target.nextElementSibling.textContent = result.likes.length;
    evt.target.classList.toggle('cards__like_active');
  })
  .catch((err) => {
    console.log(err);
  });
}

export const fetchDeleteCard = (btnevt) => {
  const cardId = btnevt.target.nextSibling.parentNode.id;
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return btnevt.target.closest('.cards__card').remove();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}
