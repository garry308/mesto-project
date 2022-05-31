import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageContainer = this.popup.querySelector('.popup__image');
    this._nameContainer = this.popup.querySelector('.popup__cardname');
  }

  open(image) {
    super.open();
    this._imageContainer.src = image.src;
    this._imageContainer.alt = image.alt;
    this._nameContainer.textContent = image.alt;
  }
}
