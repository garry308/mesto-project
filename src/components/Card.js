import { mainPageName } from "./Utils.js";
import { api } from './Api.js';
import { fsPopup } from "../pages";

export default class Card {
  constructor({link, name, _id, likes, owner}, templateSelector, api) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._selector = templateSelector;
    this._api = api;
    this._isLiked = false;
  }

  _setEventListeners(image, like, deleteIcon) {
    image.addEventListener('click', () => {
      fsPopup.open(image);
      fsPopup.setEventListeners();
    });
    like.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    if (deleteIcon) {
      deleteIcon.addEventListener('click', (evt) => {
        this._deleteCard(evt);
      });
    }
  }

  _formCard() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _setCard(newCard) {
    const card = newCard.querySelector('.cards__card');
    card.setAttribute('id', this._id);
    const image = newCard.querySelector('.cards__image');
    image.src = this._link;
    image.alt = this._name;
    const name = newCard.querySelector('.cards__name');
    name.textContent = this._name;
    const like = newCard.querySelector('.cards__like');
    this._likes.forEach((curLike) => {
      if (curLike._id === mainPageName.id) {
        this._isLiked = true;
        like.classList.add('cards__like_active');
      }
    });
    const likeCount = newCard.querySelector('.cards__like-count');
    likeCount.textContent = this._likes.length;
    const deleteIcon = newCard.querySelector('.cards__delete-icon');
    if (this._owner._id !== mainPageName.id) {
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

  _deleteCard(evt) {
    this._api.fetchDeleteCard(this._id).then(evt.target.closest('.cards__card').remove());
  }

  _toggleLike(evt) {
    const method = (this._isLiked) ? 'DELETE' : 'PUT';
    api.postLike(method, evt).then((result) => {
      evt.target.nextElementSibling.textContent = result.likes.length;
      evt.target.classList.toggle('cards__like_active');
      this._isLiked = !this._isLiked;
    });
  }
}
