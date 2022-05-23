import { page } from "../components/utils.js";

export function mouseClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(page.querySelector('.popup_opened'));
  }
}

export function keyClosePopup(evt) {
  if (evt.key === "Escape") {
    closePopup(page.querySelector('.popup_opened'));
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', keyClosePopup);
  page.addEventListener('mousedown', mouseClosePopup);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', keyClosePopup);
  page.removeEventListener('mousedown', mouseClosePopup);
}
