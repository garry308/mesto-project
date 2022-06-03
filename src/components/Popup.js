export default class Popup {
	constructor(selector) {
		this.popup = document.querySelector(selector);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._handleMouseClose = this._handleMouseClose.bind(this);
	}

	open() {
		this.popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
		this.popup.addEventListener('mousedown',this._handleMouseClose);
	}

	close() {
		this.popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
		this.popup.removeEventListener('mousedown',this._handleMouseClose);
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
		this.popup.querySelector('.popup__close-icon').addEventListener('click', () => {this.close();});
	}
}
