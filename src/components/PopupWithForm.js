import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
  }

  _getInputValues() {
    const result = {};
    this._popup.querySelectorAll('.popup__input').forEach((element) => {
      result[element.id] = element.value;
    });
    return result;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._popup.querySelector('.popup__save-button').textContent = "Сохранение...";
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popup.querySelectorAll('.popup__input').forEach((element) => {
      element.value = "";
    });
    this._popup.classList.remove('popup_opened');
  }
}
