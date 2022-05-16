class Api {
  constructor (options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then(this._checkResponse);
  }

  profileLoading() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
    .then(this._checkResponse);
  }

  newImagePatch(image) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: image,
      })
    })
    .then(this._checkResponse);
  }

  profileInfoPatch(info) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({info})
    })
    .then(this._checkResponse);
  }

  pushCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({data})
    })
    .then(this._checkResponse);
  }

  postLike (method, evt) {
    const cardId = evt.target.offsetParent.id;
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this._options.headers
    })
    .then(this._checkResponse);
  }

  fetchDeleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
    .then(this._checkResponse);
  }
}

export const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '0e51a170-a3a1-4acc-8de7-2fd0ce8b0ce9',
    'Content-Type': 'application/json'
  }
});