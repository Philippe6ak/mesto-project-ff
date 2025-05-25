const token = '00a6d7b9-2c53-45ee-b82b-9db916763c29';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38/',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};

const processResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Something wrong happened: ${res.statusText}`);
  }
};

export function getInitialCards() {
    return fetch(config.baseUrl + 'cards', {
        headers: config.headers
    })
    .then(processResponse);
};

export function getLoggedUser() {
    return fetch(config.baseUrl + 'users/me', {
        headers: config.headers
    })
    .then(processResponse);
};

export function editingProfile(name, description) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
    .then(processResponse);
};

export function addCard(cardName, cardLink) {
    return fetch(config.baseUrl + 'cards/', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(processResponse);
};

export function removeCard(cardId) {
    return fetch(config.baseUrl + 'cards/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(processResponse);
};

export function addLike(cardId) {
    return fetch(config.baseUrl + 'cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
    })
    .then(processResponse);
};

export function removeLike(cardId) {
    return fetch(config.baseUrl + 'cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(processResponse);
};

export function updateProfilePic(imageUrl) {
    return fetch(config.baseUrl + 'users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: imageUrl,
        })
    })
    .then(processResponse);
};