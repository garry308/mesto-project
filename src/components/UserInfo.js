export default class UserInfo {

  constructor({nameSelector, aboutSelector, avatarSelector}, api) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
    this._api = api;
  }

  getUserInfo() {
    const profile = {};
    this._api.profileLoading()
      .then((data) => {
        profile.name = data.name;
        profile.about = data.about;
        profile.avatar = data.avatar;
        profile.id = data._id;
      }).catch((error) => console.log(`Error ${error}!!!`));
    return profile;
  }

  setUserInfo({name, about}) {
    this._api.profileInfoPatch({name, about})
      .then((result) => {
        this._nameSelector.textContent = result.name;
        this._aboutSelector.textContent = result.about;
      }).catch((error) => console.log(`Error ${error}!!!`));
  }

  setUserAvatar({avatar}) {
    this._api.newImagePatch(avatar)
      .then((result) => {
        this._avatarSelector.src = result.avatar;
      }).catch((error) => console.log(`Error ${error}!!!`));
  }

}
