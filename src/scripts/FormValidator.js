export class FormValidator {

  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._validationOptions.fieldsetList));
    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(fieldSet, this._validationOptions);
    });
  };

  _setEventListeners(formElement, data) {
    const inputList = Array.from(formElement.querySelectorAll(data.oneFieldset));
    const buttonElement = formElement.querySelector(data.buttonElement);
    this._toggleButtonState(data, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(data, formElement, inputElement);
        this._toggleButtonState(data, inputList, buttonElement);
      });
    });
    buttonElement.addEventListener('submit', () => {
      this._toggleButtonState(data, inputList, buttonElement);
    });  /// сделать проверку кнопки или отключение после submit
  };

  _toggleButtonState(data, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = "true";
      buttonElement.classList.remove(data.activeButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.add(data.activeButtonClass);
    }
  }

  _checkInputValidity(data, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(data, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(data, formElement, inputElement);
    }
  }

  _showInputError(data, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}${data.errorClassWithoutId}`);
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.activeErrorClass);
  };

  _hideInputError(data, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}${data.errorClassWithoutId}`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.activeErrorClass);
    errorElement.textContent = 'Текст ошибки';
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}



