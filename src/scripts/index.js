import '../styles/index.css';
import { enableValidation} from './validate.js';
import { openPopup, closePopup} from './modal.js';
import { profilePopup, cardPopup, fsPopup, imagePopup, page, cardNameInput,
  cardLinkInput, profileNameInput, profileBioInput, imageInput, mainPageName,
  mainPageBio,} from './utils.js';
import { profileLoading, defaultCardsLoading, newImagePatch, profileInfoPatch, pushCard } from './api.js';

export const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
export const closeCardPopup = cardPopup.querySelector('.popup__close-icon');
export const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');
export const closeImagePopup = imagePopup.querySelector('.popup__close-icon');
export const editButton = page.querySelector('.profile__edit-button');
export const addCardButton = page.querySelector('.profile__add-button');
export const imageEditButton = page.querySelector('.profile__photo-edit-button');

export function postCard (evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  pushCard(evt);
  closePopup(cardPopup);
  evt.submitter.classList.remove('popup__save-button_active');
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

export function showProfilePopup() {
  profileNameInput.value = mainPageName.textContent;
  profileBioInput.value = mainPageBio.textContent;
  profilePopup.querySelector('.popup__save-button').textContent = "Сохранить";
  openPopup(profilePopup);
}

export function showCardPopup() {
  cardPopup.querySelector('.popup__save-button').textContent = "Сохранить";
  openPopup(cardPopup);
}

export function showImagePopup() {
  imagePopup.querySelector('.popup__save-button').textContent = "Сохранить";
  openPopup(imagePopup);
}

export function postProfileInfo(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  profileInfoPatch();
  mainPageName.textContent = profileNameInput.value;
  mainPageBio.textContent = profileBioInput.value;
  closePopup(profilePopup);
}

export function postImage(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  newImagePatch();
  evt.submitter.classList.remove('popup__save-button_active');
  imageInput.value = "";
  closePopup(imagePopup);
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
