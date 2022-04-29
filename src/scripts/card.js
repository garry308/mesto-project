import { openPopup, showFullScreen } from "./modal.js";
import { cardTemplate, cardsContainer, fsPopup, imageFsPopup, nameFsPopup }
  from "./utils.js";

export function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const image = newCard.querySelector('.cards__image');
  const name = newCard.querySelector('.cards__name');
  const like = newCard.querySelector('.cards__like');
  const deleteIcon =  newCard.querySelector('.cards__delete-icon');
  image.src = item['link'];
  image.alt = item['name'];
  image.addEventListener('click', showFullScreen);
  name.textContent = item['name'];
  like.addEventListener('click', toggleLike);
  deleteIcon.addEventListener('click', deleteCard);
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
