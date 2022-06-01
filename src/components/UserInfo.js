export default class UserInfo {

  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
    this._id = undefined;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      avatar: this._avatarSelector.src,
      id: this._id
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
    this._avatarSelector.src = avatar;
    this._id = _id;
  }
}


