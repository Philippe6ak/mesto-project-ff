import { createCards, deleteCard, likeCard, viewCard } from './card.js';
import { initialCards } from './initialcards.js';

export const cardContainer = document.querySelector('.places__list');

initialCards.forEach(cardData => {
    const card = createCards(
        cardData,
        deleteCard,
        likeCard,
        viewCard
    );
    document.querySelector('.places__list').appendChild(card);
});