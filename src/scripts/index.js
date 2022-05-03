import '../styles/index.css';
import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { profilePopup, cardPopup, fsPopup, imagePopup, page } from './utils.js';
import { profileLoading, defaultCardsLoading, newImagePatch, profileInfoPatch,
  pushCard } from './api.js';

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

(function () {
  profileLoading();
  defaultCardsLoading();
  imageEditButton.addEventListener('click', showImagePopup);
  editButton.addEventListener('click', showProfilePopup);
  addCardButton.addEventListener('click', showCardPopup);
  closeProfilePopup.addEventListener('click', () => {closePopup(profilePopup);});
  closeCardPopup.addEventListener('click', () => {closePopup(cardPopup);});
  closeFsPopup.addEventListener('click', () => {closePopup(fsPopup);});
  closeImagePopup.addEventListener('click', () => {closePopup(imagePopup);})
  profilePopup.addEventListener('submit', profileInfoPatch);
  cardPopup.addEventListener('submit', pushCard);
  imagePopup.addEventListener('submit', newImagePatch);

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
