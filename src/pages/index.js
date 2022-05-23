import '../styles/index.css';
import {api} from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {
  addCardButton, editButton,
  forms, imageEditButton,
  mainPageBio,
  mainPageName,
  mainPagePhoto,
  userInfoSelectors,
  validationData
} from '../components/utils.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";


export const fsPopup = new PopupWithImage('.popup_fs');

export const imagePopup = new PopupWithForm('.profile-photo_popup', ({bio: avatar}) => {
  api.newImagePatch(avatar).then((result) => {
    mainPagePhoto.src = result.avatar;
    imagePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => imagePopup._popup.querySelector('.popup__save-button').textContent = "Сохранить", 500);
  });
});

export const profilePopup = new PopupWithForm('.profile_popup', (info) => {
  api.profileInfoPatch(info).then((result) => {
    mainPageName.textContent = result.name;
    mainPageBio.textContent = result.about;
    profilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => profilePopup._popup.querySelector('.popup__save-button').textContent = "Сохранить", 500);
  });
});

export const cardPopup = new PopupWithForm('.newcard_popup', (info) => {
  const data = {name: info.placename, link: info.link};
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
    cardPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => cardPopup._popup.querySelector('.popup__save-button').textContent = "Сохранить", 500);
  });
});

(function () {
  Promise.all([api.profileLoading(), api.getInitialCards()])
    .then(([userData, cards]) => {
      const userInfo = new UserInfo(userInfoSelectors);
      userInfo.setUserInfo(userData.name , userData.about);
      userInfo.setUserAvatar(userData.avatar);
      mainPageName.setAttribute('id', userData._id); //?
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

  imageEditButton.addEventListener('click', () => {
    imagePopup.open();
    imagePopup.setEventListeners();
  });
  editButton.addEventListener('click', () => {
    profilePopup.open();
    profilePopup.setEventListeners();
  });
  addCardButton.addEventListener('click', () => {
    cardPopup.open();
    cardPopup.setEventListeners();
  });

  forms.forEach(form => {
    let formValidator = new FormValidator(validationData, form);
    formValidator.enableValidation();
  });
})();


