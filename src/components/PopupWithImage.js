import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(image) {
    super.open();
    this._popup.querySelector('.popup__image').src = image.src;
    this._popup.querySelector('.popup__image').alt = image.alt;
    this._popup.querySelector('.popup__cardname').textContent = image.alt;
  }
}
