import '../styles/index.css';
import { enableValidation} from './validate.js';
import { loadDefaultCard, createCard} from './card.js';
import { openPopup, closePopup} from './modal.js';
import { initialCards, profilePopup, cardPopup, fsPopup, page, cardNameInput,
  cardsContainer, cardLinkInput, profileNameInput, profileBioInput, mainPageName,
  mainPageBio} from './utils.js';

export const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
export const closeCardPopup = cardPopup.querySelector('.popup__close-icon');
export const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');
export const editButton = page.querySelector('.profile__edit-button');
export const addCardButton = page.querySelector('.profile__add-button');

export function postCard (evt) {
  evt.preventDefault();
  const item = [];
  item['name'] = cardNameInput.value;
  item['link'] = cardLinkInput.value;
  const newCard = createCard(item);
  cardsContainer.prepend(newCard);
  closePopup(cardPopup);
  evt.submitter.classList.remove('popup__save-button_active');
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

export function showProfilePopup() {
  openPopup(profilePopup);
  profileNameInput.value = mainPageName.textContent;
  profileBioInput.value = mainPageBio.textContent;
}

export function showCardPopup() {
  openPopup(cardPopup);
}

export function postProfileInfo(evt) {
  evt.preventDefault();
  mainPageName.textContent = profileNameInput.value;
  mainPageBio.textContent = profileBioInput.value;
  closePopup(profilePopup);
}

(function () {
  initialCards.forEach(loadDefaultCard);
  editButton.addEventListener('click', showProfilePopup);
  addCardButton.addEventListener('click', showCardPopup);
  closeProfilePopup.addEventListener('click', () => {closePopup(profilePopup);});
  closeCardPopup.addEventListener('click', () => {closePopup(cardPopup);});
  closeFsPopup.addEventListener('click', () => {closePopup(fsPopup);});
  profilePopup.addEventListener('submit', postProfileInfo);
  cardPopup.addEventListener('submit', postCard);

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
