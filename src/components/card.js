import { openPopup, popupImage, popupCaption, popupCardView } from './modal.js';

export function createCards(cardData, deleteCard, likeCard, viewCard) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardImage.addEventListener('click', () => viewCard(cardData));
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', 
        () => deleteCard(cardElement));

    return cardElement;
};

export function deleteCard(cardElement) {
    cardElement.remove();
};

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

export function viewCard(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(popupCardView);
};