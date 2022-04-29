export const page = document.querySelector('.page');
export const fsPopup = page.querySelector('.popup_fs');
export const imageFsPopup = fsPopup.querySelector('.popup__image');
export const nameFsPopup = fsPopup.querySelector('.popup__cardname');

export const cardPopup = page.querySelector('.newcard_popup');
export const cardNameInput =  cardPopup.querySelector('.popup__name');
export const cardLinkInput =  cardPopup.querySelector('.popup__bio');

export const profilePopup = page.querySelector('.profile_popup');
export const profileNameInput =  profilePopup.querySelector('.popup__name');
export const profileBioInput =  profilePopup.querySelector('.popup__bio');

export const mainPageName = page.querySelector('.profile__name');
export const mainPageBio = page.querySelector('.profile__bio');
export const cardTemplate = page.querySelector('#card').content;
export const cardsContainer = page.querySelector('.cards');
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
