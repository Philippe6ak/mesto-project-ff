export function managePopup(popupSelector, openButtonSelector, closeButtonSelector) {
  const popup = document.querySelector(popupSelector);
  const openButton = document.querySelector(openButtonSelector);
  const closeButton = document.querySelector(closeButtonSelector);

  function openPopup() {
    popup.classList.remove('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('click', clickClose);
    document.addEventListener('keydown', escClose);
  }

  function closePopup() {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    console.log('it should be closing');
    document.removeEventListener('click', clickClose);
    document.removeEventListener('keydown', escClose);
  }

  function clickClose(evt) {
    const popupContent = popup.querySelector('.popup__content');
    if (popup.contains(evt.target) && !popupContent.contains(evt.target)) {
      closePopup();
    }
  }

  function escClose(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  }

  openButton.addEventListener('click', openPopup);
  closeButton.addEventListener('click', closePopup);
  popup.addEventListener('submit', closePopup);
};

export function manageImgPopup(popupSelector, closeButtonSelector) {
  const popup = document.querySelector(popupSelector);
  const closeButton = document.querySelector(closeButtonSelector);

  function closePopup() {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    console.log('it should be closing');
    document.removeEventListener('click', clickClose);
    document.removeEventListener('keydown', escClose);
  }

  function clickClose(evt) {
    const popupContent = popup.querySelector('.popup__content');
    if (popup.contains(evt.target) && !popupContent.contains(evt.target)) {
      closePopup();
    }
  }

  function escClose(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  }

  closeButton.addEventListener('click', closePopup);
  popup.addEventListener('submit', closePopup);
};