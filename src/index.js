import './styles/index.css';
(function () {
  const page = document.querySelector('.page');

  const fsPopup = page.querySelector('.popup_fs');
  const closeFsPopup = fsPopup.querySelector('.popup__close-icon');
  const imageFsPopup = fsPopup.querySelector('.popup__image');
  const nameFsPopup = fsPopup.querySelector('.popup__cardname');

  const cardPopup = page.querySelector('.newcard_popup');
  const cardNameInput =  cardPopup.querySelector('.popup__name');
  const cardLinkInput =  cardPopup.querySelector('.popup__bio');
  const closeCardPopup = cardPopup.querySelector('.popup__close-icon');

  const profilePopup = page.querySelector('.profile_popup');
  const profileNameInput =  profilePopup.querySelector('.popup__name');
  const profileBioInput =  profilePopup.querySelector('.popup__bio');
  const closeProfilePopup = profilePopup.querySelector('.popup__close-icon');

  const mainPageName = page.querySelector('.profile__name');
  const mainPageBio = page.querySelector('.profile__bio');

  const editButton = page.querySelector('.profile__edit-button');
  const addCardButton = page.querySelector('.profile__add-button');

  const cardTemplate = page.querySelector('#card').content;
  const cardsContainer = page.querySelector('.cards');
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  function showProfilePopup() {
    openPopup(profilePopup);
    profileNameInput.value = mainPageName.textContent;
    profileBioInput.value = mainPageBio.textContent;
  }

  function showCardPopup() {
    openPopup(cardPopup);
    cardNameInput.value = "";
    cardLinkInput.value = "";
  }

  function postProfileInfo(evt) {
    evt.preventDefault();
    mainPageName.textContent = profileNameInput.value;
    mainPageBio.textContent = profileBioInput.value;
    closePopup(profilePopup);
  }

  function createCard(item) {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.cards__image').src = item['link'];
    newCard.querySelector('.cards__name').textContent = item['name'];
    newCard.querySelector('.cards__image').alt = item['name'];
    newCard.querySelector('.cards__image').addEventListener('click', showFullScreen);
    newCard.querySelector('.cards__like').addEventListener('click', toggleLike);
    newCard.querySelector('.cards__delete-icon').addEventListener('click', deleteCard);
  return newCard;
  }

  function showFullScreen(evt) {
    openPopup(fsPopup);
    imageFsPopup.src = evt.target.currentSrc;
    imageFsPopup.alt = evt.target.alt;
    nameFsPopup.textContent = evt.target.alt;
  }

  function toggleLike(evt) {
    evt.target.classList.toggle('cards__like_active');
  }

  function loadDefaultCard (card) {
    const newCard = createCard(card);
    cardsContainer.prepend(newCard);
  }

  function deleteCard (btnevt) {
    btnevt.target.closest('.cards__card').remove();
  }

  function postCard (evt) {
    evt.preventDefault();
    const item = [];
    item['name'] = cardNameInput.value;
    item['link'] = cardLinkInput.value;
    console.log(item);
    const newCard = createCard(item);
    cardsContainer.prepend(newCard);
    closePopup(cardPopup);
  }

  initialCards.forEach(loadDefaultCard);
  editButton.addEventListener('click', showProfilePopup);
  addCardButton.addEventListener('click', showCardPopup);
  closeProfilePopup.addEventListener('click', () => {closePopup(profilePopup);});
  closeCardPopup.addEventListener('click', () => {closePopup(cardPopup);});
  closeFsPopup.addEventListener('click', () => {closePopup(fsPopup);});
  profilePopup.addEventListener('submit', postProfileInfo);
  cardPopup.addEventListener('submit', postCard);

  function MouseClosePopup(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(page.querySelector('.popup_opened'));
    }
  }

  function keyClosePopup(evt) {
    if (evt.key === "Escape") {
      closePopup(page.querySelector('.popup_opened'));
    }
  }

  page.addEventListener('keydown', keyClosePopup);
  page.addEventListener('mousedown', MouseClosePopup);

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

  const enableValidation = (data) => {
    console.log(data);
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

  enableValidation({
    formList: '.popup__container',
    fieldsetList: '.popup__inputs',
    oneFieldset: '.popup__input',
    buttonElement: '.popup__save-button',
    activeButtonClass: '.popup__save-button_active',
    activeErrorClass: 'popup__input-error_active',
    inputErrorClass: 'popup__input_error',
    errorClassWithoutId: '-input-error'
  });
}) ();
