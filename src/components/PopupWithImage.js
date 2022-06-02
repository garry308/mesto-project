import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageContainer = this.popup.querySelector('.popup__image');
    this._nameContainer = this.popup.querySelector('.popup__cardname');
  }

  open(name, link) {
    super.open();
    this._imageContainer.src = link
    this._imageContainer.alt = name;
    this._nameContainer.textContent = name;
  }
}
