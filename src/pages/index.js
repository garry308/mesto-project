import './index.css';
import {api} from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {
  addCardButton, editButton,
  forms, imageEditButton,
  mainPageBio,
  mainPageName,
  userInfoSelectors,
  validationData,
  cardSelectors
} from '../utils/constants.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";


const formValidators = {};
function enableValidation(validationData) {
  const formList = Array.from(document.querySelectorAll(validationData.formList));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationData, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}
enableValidation(validationData);

export const fsPopup = new PopupWithImage('.popup_fs');

export const avatarPopup = new PopupWithForm('.profile-photo_popup', (data) => {
  avatarPopup.renderSubmitter(true);
  api.newImagePatch(data.bio)
    .then((response) => {
      userInfo.setUserInfo(response);
      avatarPopup.close();
    })
    .catch((error) => console.log(`Error ${error}!!!`))
    .finally(() => {
      setTimeout(() => avatarPopup.renderSubmitter(false), 500)
    });
});
avatarPopup.setEventListeners()

export const profilePopup = new PopupWithForm('.profile_popup', (data) => {
  profilePopup.renderSubmitter(true);
  api.profileInfoPatch(data)
    .then((response) => {
      userInfo.setUserInfo(response);
      profilePopup.close();
    })
    .catch((error) => console.log(`Error ${error}!!!`))
    .finally(() => {
      setTimeout(() => profilePopup.renderSubmitter(false), 500)
    });
});
profilePopup.setEventListeners()

export const cardPopup = new PopupWithForm('.newcard_popup', (info) => {
  const data = {name: info.placename, link: info.link};
  api.pushCard(data).then((result) => {
    const cardsSection = new Section({
        items: [result],
        renderer: (card) => {
          const newCard = new Card(card, cardSelectors, api, fsPopup, userId);
          return newCard.getCard();
        }
      },
      '.cards'
    );
    cardsSection.renderItems(result);
    cardPopup.close();
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => cardPopup.popup.querySelector('.popup__save-button').textContent = "Сохранить", 500);
    });
});
cardPopup.setEventListeners();


const userInfo = new UserInfo(userInfoSelectors);

(function () {
  Promise.all([api.profileLoading(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData);
      const cardsSection = new Section({
        items: cards,
        renderer: (card) => {
          const newCard = new Card(card, cardSelectors, api, fsPopup, userInfo.getUserInfo().id);
          return newCard.getCard();
        }
      }, '.cards');
      cardsSection.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });



})();

imageEditButton.addEventListener('click', () => {
  formValidators['profile-photo'].resetValidation();
  avatarPopup.open();
});
editButton.addEventListener('click', () => {
  formValidators['profile'].resetValidation();
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
});
addCardButton.addEventListener('click', () => {
  formValidators['newcard'].resetValidation();
  cardPopup.open();
});


