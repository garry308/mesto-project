export class FormValidator {

  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._validationOptions.oneFieldset));
    this._submitButton = formElement.querySelector(this._validationOptions.buttonElement);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = "true";
      this._submitButton.classList.remove(this._validationOptions.activeButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.add(this._validationOptions.activeButtonClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._validationOptions, this._formElement, inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}${this._validationOptions.errorClassWithoutId}`);
    inputElement.classList.add(this._validationOptions.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationOptions.activeErrorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}${this._validationOptions.errorClassWithoutId}`);
    inputElement.classList.remove(this._validationOptions.inputErrorClass);
    errorElement.classList.remove(this._validationOptions.activeErrorClass);
    errorElement.textContent = 'Текст ошибки';
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}



