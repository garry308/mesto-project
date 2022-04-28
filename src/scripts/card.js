import { openPopup, closePopup } from "./utils.js";
import { cardTemplate, cardsContainer, fsPopup, imageFsPopup, nameFsPopup, cardNameInput, cardLinkInput, cardPopup} from "./index.js";

function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.cards__image').src = item['link'];
  newCard.querySelector('.cards__name').textContent = item['name'];
  newCard.querySelector('.cards__image').alt = item['name'];
  newCard.querySelector('.cards__image').addEventListener('click', showFullScreen);
  newCard.querySelector('.cards__like').addEventListener('click', toggleLike);
  newCard.querySelector('.cards__delete-icon').addEventListener('click', deleteCard);
return newCard;
}

export function loadDefaultCard (card) {
  const newCard = createCard(card);
  cardsContainer.prepend(newCard);
}

export function toggleLike(evt) {
  evt.target.classList.toggle('cards__like_active');
}

export function deleteCard (btnevt) {
  btnevt.target.closest('.cards__card').remove();
}

export function showFullScreen(evt) {
  openPopup(fsPopup);
  imageFsPopup.src = evt.target.currentSrc;
  imageFsPopup.alt = evt.target.alt;
  nameFsPopup.textContent = evt.target.alt;
}

export function postCard (evt) {
  evt.preventDefault();
  const item = [];
  item['name'] = cardNameInput.value;
  item['link'] = cardLinkInput.value;
  const newCard = createCard(item);
  cardsContainer.prepend(newCard);
  closePopup(cardPopup);
}
