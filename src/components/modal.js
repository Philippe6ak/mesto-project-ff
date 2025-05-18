let currentPopup = null;

export function openPopup(popup) {
  currentPopup = popup;
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClose);
  popup.addEventListener('click', clickClose);
}

export function closePopup() {
  if (currentPopup) {
    currentPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escClose);
    currentPopup.removeEventListener('click', clickClose);
    currentPopup = null;
  }
}

function clickClose(evt) {
  const popupContent = currentPopup.querySelector('.popup__content');
  if (evt.target === currentPopup || !popupContent.contains(evt.target)) {
    closePopup();
  }
}

function escClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}