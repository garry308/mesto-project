import '../styles/index.css';
import { enableValidation} from './validate.js';
import { loadDefaultCard, createCard} from './card.js';
import { openPopup, closePopup} from './modal.js';
import { profilePopup, cardPopup, fsPopup, page, cardNameInput,
  cardsContainer, cardLinkInput, profileNameInput, profileBioInput, mainPageName,
  mainPageBio, mainPagePhoto} from './utils.js';

export const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
export const closeCardPopup = cardPopup.querySelector('.popup__close-icon');
export const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');
export const editButton = page.querySelector('.profile__edit-button');
export const addCardButton = page.querySelector('.profile__add-button');

export function postCard (evt) {
  evt.preventDefault();
  fetch('https://nomoreparties.co/v1/plus-cohort-9/cards ', {
  method: 'POST',
  headers: {
    authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: cardNameInput.value,
    link: cardLinkInput.value
  })
})
  .then(res => res.json())
  .then((result) => {
    const newCard = createCard(result);
    cardsContainer.prepend(newCard);
    closePopup(cardPopup);
    evt.submitter.classList.remove('popup__save-button_active');
    cardNameInput.value = "";
    cardLinkInput.value = "";
  });
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
  fetch('https://nomoreparties.co/v1/plus-cohort-9/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: profileNameInput.value,
    about: profileBioInput.value
  })
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
  mainPageName.textContent = profileNameInput.value;
  mainPageBio.textContent = profileBioInput.value;
  closePopup(profilePopup);
}

(function () {
  // загрузка профиля
  fetch('https://nomoreparties.co/v1/plus-cohort-9/users/me', {
    headers: {
      authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9'
    }
  })
    .then(res => res.json())
    .then((result) => {
      mainPageName.textContent = result.name;
      mainPageName.setAttribute('id', result._id);
      mainPageBio.textContent = result.about;
      mainPagePhoto.src = result.avatar;
    });
  // загрузка карточек
  fetch('https://nomoreparties.co/v1/plus-cohort-9/cards', {
    headers: {
      authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9'
    }
  })
    .then(res => res.json())
    .then((result) => {
      result.forEach(loadDefaultCard);
    });
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
