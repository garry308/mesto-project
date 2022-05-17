import '../styles/index.css';
import {api} from './api.js';
import Section from './Section.js';
import Card from './card.js';
import {Popup, PopupWithImage} from "./Popup.js";
import {FormValidator} from './FormValidator.js';
import {closePopup, openPopup} from './modal.js';
import {
  cardLinkInput,
  cardNameInput,
  cardPopup,
  forms,
  imageInput,
  imagePopup,
  mainPageBio,
  mainPageName,
  mainPagePhoto,
  page,
  profileBioInput,
  profileNameInput,
  profilePopup,
  validationData
} from './utils.js';

export const fsPopup = new PopupWithImage('.popup_fs');
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
  const data = {
    name: profileNameInput.value,
    about: profileBioInput.value
  }
  api.profileInfoPatch(data).then((result) => {
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
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  api.pushCard(data).then((result) => {
    loadDefaultCard(result);
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
  api.newImagePatch(imageInput.value).then((result) => {
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


(function () {
  Promise.all([api.profileLoading(), api.getInitialCards()])
    .then(([userData, cards]) => {
      mainPageName.textContent = userData.name;
      mainPageName.setAttribute('id', userData._id);
      mainPageBio.textContent = userData.about;
      mainPagePhoto.src = userData.avatar;
      profileNameInput.value = userData.name;
      profileBioInput.value = userData.about;
      const cardsSection = new Section({
          items: cards,
          renderer: (card) => {
            const newCard = new Card(card, '#card', api);
            return newCard.getCard();
          }
        },
        '.cards'
      );
      cardsSection.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
  imageEditButton.addEventListener('click', showImagePopup);
  editButton.addEventListener('click', showProfilePopup);
  addCardButton.addEventListener('click', showCardPopup);
  closeProfilePopup.addEventListener('click', () => {
    closePopup(profilePopup);
  });
  closeCardPopup.addEventListener('click', () => {
    closePopup(cardPopup);
  });
  closeImagePopup.addEventListener('click', () => {
    closePopup(imagePopup);
  })
  profilePopup.addEventListener('submit', postProfileInfo);
  cardPopup.addEventListener('submit', postCard);
  imagePopup.addEventListener('submit', postImage);

  forms.forEach(form => {
    let formValidator = new FormValidator(validationData, form);
    formValidator.enableValidation();
  })
})();
