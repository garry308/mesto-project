import './index.css';
import {api} from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {
  addCardButton,
  cardSelectors,
  editButton,
  formValidators,
  imageEditButton,
  userInfoSelectors,
  validationData
} from '../utils/constants.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

const cardContainer = new Section({renderer: card => renderCard(card)}, '.cards');
const userInfo = new UserInfo(userInfoSelectors);
const fsPopup = new PopupWithImage('.popup_fs');
const avatarPopup = new PopupWithForm('.profile-photo_popup', (data) => {
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
const profilePopup = new PopupWithForm('.profile_popup', (data) => {
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
const cardPopup = new PopupWithForm('.newcard_popup', (info) => {
  cardPopup.renderSubmitter(true);
  api.pushCard({name: info.placename, link: info.link})
    .then((response) => {
      cardContainer.addItem(response);
      cardPopup.close()
    })
    .catch((error) => console.log(`Error ${error}!!!`))
    .finally(() => {
      setTimeout(() => cardPopup.renderSubmitter(false), 500)
    });
});

avatarPopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();

(function () {
  Promise.all([api.profileLoading(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData);
      cardContainer.renderItems(cards.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
})();

enableValidation(validationData);

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

function enableValidation(validationData) {
  const formList = Array.from(document.querySelectorAll(validationData.formList));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationData, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

function renderCard(card) {
  const cardItem = new Card(card, cardSelectors, api, fsPopup, userInfo.getUserInfo().id);
  return cardItem.getCard();
}
