import {mainPagePhoto, page} from "./utils";
import {closePopup} from "./modal";
import {imagePopup} from "./index";

export default class Popup {
	constructor(selector) {
		this._popup = document.querySelector(selector);
	}

	open() {
		this._popup.classList.add('popup_opened');
	}

	close() {
		this._popup.classList.remove('popup_opened');
	}

	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	_handleMouseClose(evt) {
		if (evt.target.classList.contains('popup_opened')) {
			this.close();
		}
	}

	setEventListeners() {
		this._popup.querySelector('.popup__close-icon').addEventListener('click', () => {this.close()});
		page.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
		page.addEventListener('mousedown', (evt) => {this._handleMouseClose(evt)});
	}
}

export class PopupWithImage extends Popup {
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

export class PopupWithForm extends Popup {
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