export default class Card {
  constructor({link, name, _id, likes, owner}, selectors, api, fsPopup, userId) {
    this._api = api;
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._template = document.querySelector(selectors.template);
    this._selectors = selectors;
    this._cardElement = null;
    this._card = null;
    this._cardImage = null;
    this._cardName = null;
    this._cardLike = null;
    this._cardLikeCount = null;
    this._cardDeleteIcon = null;
    this._api = api;
    this._isLiked = false;
    this._userId = userId;
    this._fsPopup = fsPopup;
  }
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._fsPopup.open(this._cardImage);
      this._fsPopup.setEventListeners();
    });
    this._cardLike.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    if (this._cardDeleteIcon) {
      this._cardDeleteIcon.addEventListener('click', (evt) => {
        this._deleteCard(evt);
      });
    }
  }

  _formCard() {
    this._cardElement = this._template.content.cloneNode(true);
    this._card = this._cardElement.querySelector(this._selectors.card);
    this._cardImage = this._cardElement.querySelector(this._selectors.image);
    this._cardName = this._cardElement.querySelector(this._selectors.name);
    this._cardLike = this._cardElement.querySelector(this._selectors.like);
    this._cardLikeCount = this._cardElement.querySelector(this._selectors.likeCount);
    this._cardDeleteIcon = this._cardElement.querySelector(this._selectors.deleteIcon);
  }

  _setCard() {
    this._card.setAttribute('id', this._id);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._likes.forEach((curLike) => {
      if (curLike._id === this._userId) {
        this._isLiked = true;
        this._cardLike.classList.add(this._selectors.likeActive);
      }
    });
    this._cardLikeCount.textContent = this._likes.length;
    if (this._owner._id !== this._userId) {
      this._cardDeleteIcon.remove();
    }
    this._setEventListeners();

    return this._cardElement;
  }

  getCard() {
    this._formCard();
    this._setCard();

    return this._cardElement;
  }

  _deleteCard(evt) {
    this._api.fetchDeleteCard(this._id)
        .then(() => {
          evt.target.closest('.cards__card').remove()
        })
        .catch((err) => {
          console.log(err);
        });
  }

  _toggleLike(evt) {
    const method = (this._isLiked) ? 'DELETE' : 'PUT';
    this._api.postLike(method, evt).then((result) => {
      evt.target.nextElementSibling.textContent = result.likes.length;
      evt.target.classList.toggle('cards__like_active');
      this._isLiked = !this._isLiked;
    })
    .catch((err) => {
      console.log(err);
    });
}
}
