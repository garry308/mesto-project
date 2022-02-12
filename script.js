const page = document.querySelector('.page');
const mainPageName = page.querySelector('.profile__name');
const mainPageBio = page.querySelector('.profile__bio');
const fsPopup = page.querySelector('.popup_fullscreen');
const cardPopup = page.querySelector('.newcard_popup');
const cardNameInput =  cardPopup.querySelector('.popup__name');
const cardLinkInput =  cardPopup.querySelector('.popup__bio');
const profilePopup = page.querySelector('.profile_popup');
const profileNameInput =  profilePopup.querySelector('.popup__name');
const profileBioInput =  profilePopup.querySelector('.popup__bio');
const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
const closeCardPopup = cardPopup.querySelector('.popup__close-icon');
const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');
const editButton = page.querySelector('.profile__edit-button');
const addCardButton = page.querySelector('.profile__add-button');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function showProfilePopup() {
  openPopup(profilePopup);
  profilePopup.querySelector('.popup__name').value = mainPageName.textContent;
  profilePopup.querySelector('.popup__bio').value = mainPageBio.textContent;
}

function showCardPopup() {
  openPopup(cardPopup);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

function postProfileInfo(evt) {
  evt.preventDefault();
  mainPageName.textContent = profileNameInput.value;
  mainPageBio.textContent = profileBioInput.value;
  closePopup(profilePopup);
}

function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.cards__image').src = item['link'];
  newCard.querySelector('.cards__name').textContent = item['name'];
  newCard.querySelector('.cards__image').alt = item['name'];
  newCard.querySelector('.cards__image').addEventListener('click', showFullScreen);
  newCard.querySelector('.cards__like').addEventListener('click', likeToggle);
  newCard.querySelector('.cards__delete-icon').addEventListener('click', deleteCard);
return newCard;
}

function showFullScreen(evt) {
  openPopup(fsPopup);
  fsPopup.querySelector('.popup__image').src = evt.target.currentSrc;
  fsPopup.querySelector('.popup__image').alt = evt.target.alt;
  fsPopup.querySelector('.popup__cardname').textContent = evt.target.alt;
}

function likeToggle(evt) {
  evt.target.classList.toggle('cards__like_active');
}

function loadDefaultCard (card) {
  const newCard = createCard(card);
  cardsContainer.prepend(newCard);
}

function deleteCard (btnevt) {
  btnevt.target.closest('.cards__card').remove();
}

function postCard (evt) {
  evt.preventDefault();
  const item = [];
  item['name'] = cardNameInput.value;
  item['link'] = cardLinkInput.value;
  console.log(item);
  const newCard = createCard(item);
  cardsContainer.prepend(newCard);
  closePopup(cardPopup);
}

initialCards.forEach(loadDefaultCard);
editButton.addEventListener('click', showProfilePopup);
addCardButton.addEventListener('click', showCardPopup);
closeProfilePopup.addEventListener('click', () => {closePopup(profilePopup);});
closeCardPopup.addEventListener('click', () => {closePopup(cardPopup);});
closeFsPopup.addEventListener('click', () => {closePopup(fsPopup);});
profilePopup.addEventListener('submit', postProfileInfo);
cardPopup.addEventListener('submit', postCard);
