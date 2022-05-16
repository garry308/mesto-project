import { showFullScreen } from "./modal.js";
import { cardsContainer, mainPageName }
  from "./utils.js";
import { toggleLike, deleteCard} from "./index.js";

export default class Card {
  constructor({link, name, id, likes, owner}, selector) {
    this._link = link;
    this._name = name;
    this._id = id;
    this._likes = likes;
    this._owner = owner;
    this._selector = selector;
  }

  _setEventListeners(image, like, deleteIcon) {
    image.addEventListener('click', showFullScreen);
    like.addEventListener('click', toggleLike);
    if (deleteIcon) {deleteIcon.addEventListener('click', deleteCard)}
  }

  _formCard() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _setCard(newCard) {
    const card = newCard.querySelector('.cards__card');
    card.setAttribute('id', newCard._id);
    const image = newCard.querySelector('.cards__image');
    image.src = this._link;
    image.alt = this._name;
    const name = newCard.querySelector('.cards__name');
    name.textContent = this._name;
    const like = newCard.querySelector('.cards__like');
    this._likes.forEach((curLike) => {
      if (curLike._id === mainPageName.id) {
        like.classList.add('cards__like_active')
      }
    })
    const likeCount = newCard.querySelector('.cards__like-count');
    likeCount.textContent = this._likes.length;
    const deleteIcon =  newCard.querySelector('.cards__delete-icon');
    if (this._owner.id !== mainPageName.id) {
      deleteIcon.remove();
    }

    this._setEventListeners(image, like, deleteIcon);

    return newCard;
  }

  getCard() {
    const newCard = this._formCard();
    const card = this._setCard(newCard);

    return card;
  }

}


export function loadDefaultCard (card) {
  const newCard = new Card(card, '#card');
  cardsContainer.prepend(newCard.getCard());
}
