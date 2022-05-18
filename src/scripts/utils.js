export const page = document.querySelector('.page');

export const mainPageName = page.querySelector('.profile__name');
export const mainPageBio = page.querySelector('.profile__bio');
export const mainPagePhoto = page.querySelector('.profile__photo');

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
  nameSelector : mainPageName, // '.profile__name'
  aboutSelector : mainPageBio, // '.profile__bio'
  avatarSelector : mainPagePhoto // '.profile__photo'
}
