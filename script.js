const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const fsPopup = page.querySelector('#fullscreen');
const fsContainer = fsPopup.querySelector('.popup__fullscreen');
const mainPageName = page.querySelector('.profile__name');
const mainPageBio = page.querySelector('.profile__bio');
const formProfile = document.forms.profile;
const formCard = document.forms.addcard;
const nameInput = formProfile.querySelector('.popup__name');
const bioInput = formProfile.querySelector('.popup__bio');
const editButton = page.querySelector('.profile__edit-button');
const addCardButton = page.querySelector('.profile__add-button');
const saveInfoButton = formProfile.querySelector('.popup__save-button');
const saveCardButton = formCard.querySelector('popup__save-button');
const closeInfoPopup = formProfile.querySelector('.popup__close-icon');
const closeCardPopup = formCard.querySelector('.popup__close-icon');
const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
const cardTemplate = page.querySelector('#card').content;
const cardsContainer = page.querySelector('.cards');
const initialCards = [
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

editButton.addEventListener('click', editButtonClick);
addCardButton.addEventListener('click', addButtonClick);
closeInfoPopup.addEventListener('click', closeInfo);
closeCardPopup.addEventListener('click', closeCard);
closeFsPopup.addEventListener('click', fsPopupToggle);
formProfile.addEventListener('submit', postProfileInfo);
formCard.addEventListener('submit', postCard);


function editButtonClick() {
  popupToggle();
  nameInput.value = mainPageName.textContent;
  bioInput.value = mainPageBio.textContent;
  formProfile.classList.add('popup__container_opened');
}

function addButtonClick() {
  popupToggle();
  formCard.classList.add('popup__container_opened');
}

function closeInfo() {
  popupToggle();
  formProfile.classList.remove('popup__container_opened');
}

function closeCard() {
  popupToggle();
  formCard.classList.remove('popup__container_opened');
  formCard.querySelector('.popup__name').value = '';
  formCard.querySelector('.popup__bio').value = '';
}

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

function fsPopupToggle() {
  fsPopup.classList.toggle('popup_opened');
  fsPopup.classList.toggle('popup_fullscreen');
  fsContainer.classList.toggle('popup__fullscreen_opened');
}

function likeToggle(evt) {
  evt.target.classList.toggle('cards__like_active');
}


function postProfileInfo(evt) {
  evt.preventDefault();
  mainPageName.textContent = nameInput.value;
  mainPageBio.textContent = bioInput.value;
  closeInfo();
}

function showFullScreen(evt) {
  fsPopupToggle();
  console.log(evt);
  fsContainer.querySelector('.popup__image').src = evt.target.currentSrc;
  fsContainer.querySelector('.popup__cardname').textContent = evt.target.alt;
}

function loadDefaultCard (card) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.cards__image').src = card['link'];
  newCard.querySelector('.cards__image').alt = card['name'];
  newCard.querySelector('.cards__image').addEventListener('click', showFullScreen);
  newCard.querySelector('.cards__name').textContent = card['name'];
  newCard.querySelector('.cards__like').addEventListener('click', likeToggle);
  newCard.querySelector('.cards__delete-icon').addEventListener('click', deleteCard);
  cardsContainer.append(newCard);
}

function deleteCard (btnevt) {
  btnevt.target.closest('.cards__card').remove();
}

function postCard (evt) {
  evt.preventDefault();
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.cards__name').textContent = evt.target.querySelector('.popup__name').value;
  newCard.querySelector('.cards__image').src = evt.target.querySelector('.popup__bio').value;
  newCard.querySelector('.cards__image').alt = evt.target.querySelector('.popup__name').value;
  newCard.querySelector('.cards__image').addEventListener('click', showFullScreen);
  newCard.querySelector('.cards__like').addEventListener('click', likeToggle);
  newCard.querySelector('.cards__delete-icon').addEventListener('click', deleteCard);
  cardsContainer.prepend(newCard);
  closeCard();
}

initialCards.forEach(loadDefaultCard);
