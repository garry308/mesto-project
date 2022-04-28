import {openPopup, closePopup } from "./utils.js";
import {page, profilePopup, cardPopup, profileNameInput, profileBioInput,
   cardNameInput, cardLinkInput, mainPageName, mainPageBio, } from "./index.js";

export function showProfilePopup() {
  openPopup(profilePopup);
  profileNameInput.value = mainPageName.textContent;
  profileBioInput.value = mainPageBio.textContent;
}

export function showCardPopup() {
  openPopup(cardPopup);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

export function MouseClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(page.querySelector('.popup_opened'));
  }
}

export function keyClosePopup(evt) {
  if (evt.key === "Escape") {
    closePopup(page.querySelector('.popup_opened'));
  }
}

export function postProfileInfo(evt) {
  evt.preventDefault();
  mainPageName.textContent = profileNameInput.value;
  mainPageBio.textContent = profileBioInput.value;
  closePopup(profilePopup);
}

export function showFullScreen(evt) {
  openPopup(fsPopup);
  imageFsPopup.src = evt.target.currentSrc;
  imageFsPopup.alt = evt.target.alt;
  nameFsPopup.textContent = evt.target.alt;
}
