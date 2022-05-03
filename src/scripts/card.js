import { postLike, fetchDeleteCard } from "./api.js";
import { showFullScreen } from "./modal.js";
import { cardTemplate, cardsContainer, mainPageName }
  from "./utils.js";

export function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const card = newCard.querySelector('.cards__card');
  const image = newCard.querySelector('.cards__image');
  const name = newCard.querySelector('.cards__name');
  const like = newCard.querySelector('.cards__like');
  const likeCount = newCard.querySelector('.cards__like-count');
  const deleteIcon =  newCard.querySelector('.cards__delete-icon');
  card.setAttribute('id', item._id);
  image.src = item['link'];
  image.alt = item['name'];
  image.addEventListener('click', showFullScreen);
  name.textContent = item['name'];
  item.likes.forEach((curLike) => {
    if (curLike._id === mainPageName.id) {
      like.classList.add('cards__like_active')
    }
  })
  like.addEventListener('click', toggleLike);
  likeCount.textContent = item['likes'].length;
  if (item.owner._id != mainPageName.id) {
    deleteIcon.remove();
  }
  else {
    deleteIcon.addEventListener('click', fetchDeleteCard);
  }
return newCard;
}

export function loadDefaultCard (card) {
  const newCard = createCard(card);
  cardsContainer.prepend(newCard);
}

export function toggleLike(evt) {
  if (evt.target.classList.contains('cards__like_active')) {
    postLike('DELETE', evt);
  }
  else {
    postLike('PUT', evt);
  }
}
