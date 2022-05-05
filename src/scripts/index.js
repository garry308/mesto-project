import '../styles/index.css';
import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { loadDefaultCard, createCard } from "./card.js";
import { profilePopup, cardPopup, fsPopup, imagePopup, page, mainPageName, mainPageBio,
  mainPagePhoto, profileNameInput, imageInput, profileBioInput, cardNameInput, cardLinkInput, cardsContainer } from './utils.js';
import { profileLoading, defaultCardsLoading, newImagePatch, profileInfoPatch,
  pushCard, postLike, fetchDeleteCard } from './api.js';

export const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
export const closeCardPopup = cardPopup.querySelector('.popup__close-icon');
export const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');
export const closeImagePopup = imagePopup.querySelector('.popup__close-icon');
export const editButton = page.querySelector('.profile__edit-button');
export const addCardButton = page.querySelector('.profile__add-button');
export const imageEditButton = page.querySelector('.profile__photo-edit-button');

export function showProfilePopup() {
  openPopup(profilePopup);
}

export function showCardPopup() {
  openPopup(cardPopup);
}

export function showImagePopup() {
  openPopup(imagePopup);
}

export function postProfileInfo(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  profileInfoPatch().then((result) => {
    mainPageName.textContent = result.name;
    mainPageBio.textContent = result.about;
    closePopup(profilePopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => evt.submitter.textContent = "Сохранить", 500);
  });
}

export function postCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  pushCard().then((result) => {
    const newCard = createCard(result);
    cardsContainer.prepend(newCard);
    closePopup(cardPopup);
    evt.submitter.disabled = "true";
    evt.submitter.classList.remove('popup__save-button_active');
    cardNameInput.value = "";
    cardLinkInput.value = "";
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => evt.submitter.textContent = "Создать", 500);
  });
}

export function postImage(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  newImagePatch().then((result) => {
    evt.submitter.classList.remove('popup__save-button_active');
    imageInput.value = "";
    mainPagePhoto.src = result.avatar;
    closePopup(imagePopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => evt.submitter.textContent = "Сохранить", 500);
  });
}

export function toggleLike(evt) {
  if (evt.target.classList.contains('cards__like_active')) {
    postLike('DELETE', evt).then((result) => {
      evt.target.nextElementSibling.textContent = result.likes.length;
      evt.target.classList.toggle('cards__like_active');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else {
    postLike('PUT', evt).then((result) => {
      evt.target.nextElementSibling.textContent = result.likes.length;
      evt.target.classList.toggle('cards__like_active');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export function deleteCard(btnevt) {
  const cardId = btnevt.target.nextSibling.parentNode.id;
  fetchDeleteCard(cardId).then(res => {
    if (res.ok) {
      return btnevt.target.closest('.cards__card').remove();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

(function () {
  Promise.all([profileLoading(), defaultCardsLoading()])
  .then(([userData, cards]) => {
    mainPageName.textContent = userData.name;
    mainPageName.setAttribute('id', userData._id);
    mainPageBio.textContent = userData.about;
    mainPagePhoto.src = userData.avatar;
    profileNameInput.value = userData.name;
    profileBioInput.value = userData.about;
    cards.forEach(loadDefaultCard);
  })
  .catch((err) => {
    console.log(err);
  });

  imageEditButton.addEventListener('click', showImagePopup);
  editButton.addEventListener('click', showProfilePopup);
  addCardButton.addEventListener('click', showCardPopup);
  closeProfilePopup.addEventListener('click', () => {closePopup(profilePopup);});
  closeCardPopup.addEventListener('click', () => {closePopup(cardPopup);});
  closeFsPopup.addEventListener('click', () => {closePopup(fsPopup);});
  closeImagePopup.addEventListener('click', () => {closePopup(imagePopup);})
  profilePopup.addEventListener('submit', postProfileInfo);
  cardPopup.addEventListener('submit', postCard);
  imagePopup.addEventListener('submit', postImage);

  enableValidation({
    formList: '.popup__container',
    fieldsetList: '.popup__inputs',
    oneFieldset: '.popup__input',
    buttonElement: '.popup__save-button',
    activeButtonClass: 'popup__save-button_active',
    activeErrorClass: 'popup__input-error_active',
    inputErrorClass: 'popup__input_error',
    errorClassWithoutId: '-input-error'
  });
}) ();
