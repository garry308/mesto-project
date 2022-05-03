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
    deleteIcon.addEventListener('click', deleteCard);
  }
return newCard;
}

export function loadDefaultCard (card) {
  const newCard = createCard(card);
  cardsContainer.prepend(newCard);
}

export function toggleLike(evt) {
  const cardId = evt.target.offsetParent.id;
  if (evt.target.classList.contains('cards__like_active')) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9',
    }
  })
  .then(res => res.json())
  .then((result) => {
    evt.target.nextElementSibling.textContent = result.likes.length;
  })
  }
  else {
  fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9',
    }
  })
  .then(res => res.json())
  .then((result) => {
    evt.target.nextElementSibling.textContent = result.likes.length;
  })
  }
  evt.target.classList.toggle('cards__like_active');
}

export function deleteCard (btnevt) {
  const cardId = btnevt.target.nextSibling.parentNode.id;
  fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9',
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  })
  btnevt.target.closest('.cards__card').remove();
}
