import '../styles/index.css';
import {enableValidation} from './validate.js';
import {loadDefaultCard, postCard} from './card.js';
import {showProfilePopup, showCardPopup, MouseClosePopup,
  keyClosePopup, postProfileInfo} from './modal.js';
import {closePopup} from "./utils.js";
export const page = document.querySelector('.page');
export const fsPopup = page.querySelector('.popup_fs');
export const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
export const imageFsPopup = fsPopup.querySelector('.popup__image');
export const nameFsPopup = fsPopup.querySelector('.popup__cardname');

export const cardPopup = page.querySelector('.newcard_popup');
export const cardNameInput =  cardPopup.querySelector('.popup__name');
export const cardLinkInput =  cardPopup.querySelector('.popup__bio');
export const closeCardPopup = cardPopup.querySelector('.popup__close-icon');

export const profilePopup = page.querySelector('.profile_popup');
export const profileNameInput =  profilePopup.querySelector('.popup__name');
export const profileBioInput =  profilePopup.querySelector('.popup__bio');
export const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');

export const mainPageName = page.querySelector('.profile__name');
export const mainPageBio = page.querySelector('.profile__bio');

export const editButton = page.querySelector('.profile__edit-button');
export const addCardButton = page.querySelector('.profile__add-button');
export const cardTemplate = page.querySelector('#card').content;
export const cardsContainer = page.querySelector('.cards');
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

(function () {
  initialCards.forEach(loadDefaultCard);
  editButton.addEventListener('click', showProfilePopup);
  addCardButton.addEventListener('click', showCardPopup);
  closeProfilePopup.addEventListener('click', () => {closePopup(profilePopup);});
  closeCardPopup.addEventListener('click', () => {closePopup(cardPopup);});
  closeFsPopup.addEventListener('click', () => {closePopup(fsPopup);});
  profilePopup.addEventListener('submit', postProfileInfo);
  cardPopup.addEventListener('submit', postCard);

  page.addEventListener('keydown', keyClosePopup);
  page.addEventListener('mousedown', MouseClosePopup);

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
