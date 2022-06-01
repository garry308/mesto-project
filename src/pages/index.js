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
console.log(formValidators);

enableValidation(validationData);

export const fsPopup = new PopupWithImage('.popup_fs');

export const avatarPopup = new PopupWithForm('.profile-photo_popup', ({bio: avatar}) => {
  userInfo.setUserAvatar({avatar});
  avatarPopup.close();
  setTimeout(() => avatarPopup.popup.querySelector('.popup__save-button').textContent = "Сохранить", 500);
});
avatarPopup.setEventListeners()

export const profilePopup = new PopupWithForm('.profile_popup', (info) => {
    userInfo.setUserInfo(info);
    profilePopup.close();
    setTimeout(() => profilePopup.popup.querySelector('.popup__save-button').textContent = "Сохранить", 500);
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
const userInfo = new UserInfo(userInfoSelectors, api);

(function () {
  Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData);
      const userId = userData.id;
      const cardsSection = new Section({
        items: cards,
        renderer: (card) => {
          const newCard = new Card(card, cardSelectors, api, fsPopup, userId);
          return newCard.getCard();
        }
      }, '.cards');
      cardsSection.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });

  imageEditButton.addEventListener('click', () => {
    formValidators['profile-photo'].resetValidation();
    avatarPopup.open();
  });
  editButton.addEventListener('click', () => {
    formValidators['profile'].resetValidation();
    profilePopup.open();
    profilePopup.setInputValues({name: mainPageName.textContent, about: mainPageBio.textContent});
  });
  addCardButton.addEventListener('click', () => {
    formValidators['newcard'].resetValidation();
    cardPopup.open();
  });

})();




