import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._inputs = this.popup.querySelectorAll('.popup__input');
    this._saveButton = this.popup.querySelector('.popup__save-button');
    this._form = this.popup.querySelector('.popup__container');
  }

  _getInputValues() {
    const result = {};
    this._inputs.forEach((element) => {
      result[element.id] = element.value;
    });
    return result;
  }

  setInputValues(data) {
    this._inputs.forEach((element) => {
      element.value = data[element.id];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', () => {
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderSubmitter(isLoad){
    this._saveButton.textContent = isLoad ? "Сохранение..." : "Сохранить";
  }
}
