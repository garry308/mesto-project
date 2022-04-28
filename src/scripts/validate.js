const showInputError = (data, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${data.errorClassWithoutId}`);
  inputElement.classList.add(data.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.activeErrorClass);
};

const hideInputError = (data, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${data.errorClassWithoutId}`);
  inputElement.classList.remove(data.inputErrorClass);
  errorElement.classList.remove(data.activeErrorClass);
  errorElement.textContent = 'Текст ошибки';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
const toggleButtonState = (data, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.removeAttribute("disabled", true);
    buttonElement.classList.remove(data.activeButtonClass);
  }
  else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.add(data.activeButtonClass);
  }
}

const checkInputValidity = (data, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(data, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(data, formElement, inputElement);
  }
};

const setEventListeners = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.oneFieldset));
  const buttonElement = formElement.querySelector(data.buttonElement);
  toggleButtonState(data, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(data, formElement, inputElement);
      toggleButtonState(data, inputList, buttonElement);
    });
  });
  buttonElement.addEventListener('submit', toggleButtonState(data, inputList, buttonElement)); /// сделать проверку кнопки или отключение после submit
};

export const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formList));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(data.fieldsetList));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, data);
    });
  });
};
