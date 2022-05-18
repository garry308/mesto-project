import {PopupWithImage} from "./Popup";

export const page = document.querySelector('.page');

export const cardPopup = page.querySelector('.newcard_popup');
export const cardNameInput =  cardPopup.querySelector('.popup__name');
export const cardLinkInput =  cardPopup.querySelector('.popup__bio');

export const profilePopup = page.querySelector('.profile_popup');
export const profileNameInput =  profilePopup.querySelector('.popup__name');
export const profileBioInput =  profilePopup.querySelector('.popup__bio');

export const imagePopup = page.querySelector('.profile-photo_popup');
export const imageInput = imagePopup.querySelector('.popup__bio');

export const mainPageName = page.querySelector('.profile__name');
export const mainPageBio = page.querySelector('.profile__bio');
export const mainPagePhoto = page.querySelector('.profile__photo');

export const allForms = Array.from(document.forms);
export const validationOptions = {
  formList: '.popup__container',
  fieldsetList: '.popup__inputs',
  oneFieldset: '.popup__input',
  buttonElement: '.popup__save-button',
  activeButtonClass: 'popup__save-button_active',
  activeErrorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_error',
  errorClassWithoutId: '-input-error'
};

export const userInputSelectors = {
  nameSelector : mainPageName,
  aboutSelector: mainPageBio,
  avatarSelector : mainPagePhoto
};


export const fsPopup = new PopupWithImage('.popup_fs');
export const closeCardPopup = cardPopup.querySelector('.popup__close-icon');
export const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');
export const closeImagePopup = imagePopup.querySelector('.popup__close-icon');
export const editButton = page.querySelector('.profile__edit-button');
export const addCardButton = page.querySelector('.profile__add-button');
export const imageEditButton = page.querySelector('.profile__photo-edit-button');
