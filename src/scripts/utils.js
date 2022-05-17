export const page = document.querySelector('.page');

export const cardPopup = page.querySelector('.newcard_popup');
export const cardNameInput =  cardPopup.querySelector('.popup__name');
export const cardLinkInput =  cardPopup.querySelector('.popup__bio');

export const profilePopup = page.querySelector('.profile_popup');
export const profileNameInput =  profilePopup.querySelector('.popup__name');
export const profileBioInput =  profilePopup.querySelector('.popup__bio');

export const imagePopup = page.querySelector('.profile-photo_popup');
export const imageInput = imagePopup.querySelector('.popup__bio');

export const mainPageName = page.querySelector('.profile__name');
export const mainPageBio = page.querySelector('.profile__bio');
export const mainPagePhoto = page.querySelector('.profile__photo');
export const cardTemplate = page.querySelector('#card').content;
export const cardsContainer = page.querySelector('.cards');

export const validationData = {
  formList: '.popup__container',
  fieldsetList: '.popup__inputs',
  oneFieldset: '.popup__input',
  buttonElement: '.popup__save-button',
  activeButtonClass: 'popup__save-button_active',
  activeErrorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_error',
  errorClassWithoutId: '-input-error'
};

export const forms = Array.from(document.forms);

export const userInfoSelectors = {
  nameSelector : mainPageName,
  aboutSelector : mainPageBio,
  avatarSelector : mainPagePhoto
}
