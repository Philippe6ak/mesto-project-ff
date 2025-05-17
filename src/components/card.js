import { initialCards } from "./initialcards.js";;

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");

export function createCards(cardData, deleteCard, likeCard, viewCard) {
    const cardTemplate = document.querySelector('#card-template');
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__image').alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;

    card.querySelector('.card__image').addEventListener('click', () => {
      console.log("Image clicked", cardData);
      viewCard(cardData);
    });

    card.querySelector('.card__like-button').addEventListener('click', likeCard);
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  
    return card;
}

export function likeCard() {
  this.classList.toggle('card__like-button_is-active');
};

export const deleteCard = function(evt) {
  const card = evt.target.closest('.card');
  cardContainer.removeChild(card);
};

export function viewCard(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  imagePopup.classList.add("popup_is-opened");
  imagePopup.classList.remove("popup_is-animated");
};

//creating initial cards
export const cardContainer = document.querySelector('.places__list');
initialCards.forEach((cardData) => {
  const card = createCards(cardData, deleteCard, likeCard, () => {viewCard(cardData)});
  cardContainer.appendChild(card);
});