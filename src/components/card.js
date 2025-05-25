import { addLike, removeCard, removeLike } from "./api.js"

export function createCards(cardData, deleteCard, likeCard, viewCard, userId) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like_qty');

  cardElement.id = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  cardImage.addEventListener('click', () => viewCard(cardData));
  likeBtn.addEventListener('click', (evt) => likeCard(evt, cardElement));

  if (cardData.likes.some(like => like._id === userId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }
  
  if (userId === cardData.owner._id) {
    deleteBtn.addEventListener('click', () => deleteCard(cardElement));
  }
  else {
    deleteBtn.disabled = true;
    deleteBtn.style.display = "none";
  };

  return cardElement;
};

export function likeCard(evt, cardElement) {
  const likedCard = evt.currentTarget;
  const likeCount = cardElement.querySelector('.card__like_qty');
  if (likedCard.classList.contains('card__like-button_is-active')) {
    removeLike(cardElement.id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likedCard.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log('could not update likes : ' + err);
      })
  }
  else {
    addLike(cardElement.id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likedCard.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log('could not update likes : ' + err);
      })
  };
};

export function deleteCard(cardElement) {
  removeCard(cardElement.id)
    .then(() => cardElement.remove())
    .catch(err => console.log('could not delete the selected card: ' + err))
};