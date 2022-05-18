import '../styles/index.css';
import { api } from './api.js';
import Section from './Section.js';
import Card from './card.js';
import { openPopup, closePopup } from './modal.js';
import {
  profilePopup,
  cardPopup,
  imagePopup,
  mainPageName,
  mainPageBio,
  mainPagePhoto,
  profileNameInput,
  imageInput,
  profileBioInput,
  cardNameInput,
  cardLinkInput,
  allForms,
  validationOptions,
  imageEditButton,
  editButton,
  addCardButton,
  closeProfilePopup,
  closeCardPopup,
  closeImagePopup,
  userInputSelectors
} from './utils.js';
import {FormValidator} from "./FormValidator";
import UserInfo from "./UserInfo";

export function showProfilePopup() {
  openPopup(profilePopup);
}

export function showCardPopup() {
  openPopup(cardPopup);
}

export function showImagePopup() {
  openPopup(imagePopup);
}

const currentUser = new UserInfo(userInputSelectors);

export function postProfileInfo(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  const data = {
    name: profileNameInput.value,
    about: profileBioInput.value
  }

  api.profileInfoPatch(data).then((result) => {
    console.log(result.name);
    currentUser.setUserInfo(result.name, result.about);
    closePopup(profilePopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => evt.submitter.textContent = "Сохранить", 500);
  });
}

function postCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  api.pushCard(data).then((result) => {
    const cardsSection = new Section ({
          items: [result],
          renderer: (card) => {
            const newCard = new Card (card, '#card', api);
            return newCard.getCard();
          }
        },
        '.cards'
    );
    cardsSection.renderItems();
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
    currentUser.setUserAvatar(result.avatar);
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
    mainPageName.setAttribute('id', userData._id);
    currentUser.setUserInfo(userData.name, userData.about);
    currentUser.setUserAvatar(userData.avatar);
    profileNameInput.value = currentUser.getUserInfo().name;
    profileBioInput.value = currentUser.getUserInfo().about;
    const cardsSection = new Section ({
      items: cards,
      renderer: (card) => {
        const newCard = new Card (card, '#card', api);
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
  closeProfilePopup.addEventListener('click', () => {closePopup(profilePopup);});
  closeCardPopup.addEventListener('click', () => {closePopup(cardPopup);});
  closeImagePopup.addEventListener('click', () => {closePopup(imagePopup);})
  profilePopup.addEventListener('submit', postProfileInfo);
  cardPopup.addEventListener('submit', postCard);
  imagePopup.addEventListener('submit', postImage);

  allForms.forEach( form => {
    const formValidator = new FormValidator(validationOptions, form);
    formValidator.enableValidation();
  });

}) ();
