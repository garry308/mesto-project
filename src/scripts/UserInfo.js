export default class UserInfo {

  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      avatar: this._avatarSelector.src
    }
  }

  setUserInfo(name, about) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this._avatarSelector.src = avatarLink;
  }

}
