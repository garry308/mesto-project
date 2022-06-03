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
export const editButton = page.querySelector('.profile__edit-button');
export const imageEditButton = page.querySelector('.profile__photo-edit-button');

export const userInfoSelectors = {
  nameSelector : mainPageName, // '.profile__name'
  aboutSelector : mainPageBio, // '.profile__bio'
  avatarSelector : mainPagePhoto // '.profile__photo'
};

export const cardSelectors = {
  template: '#card',
  card: '.cards__card',
  image: '.cards__image',
  name: '.cards__name',
  like: '.cards__like',
  likeActive: 'cards__like_active',
  likeCount: '.cards__like-count',
  deleteIcon: '.cards__delete-icon'
};

export const addCardButton = page.querySelector('.profile__add-button');
export const formValidators = {};
