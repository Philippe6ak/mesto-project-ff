function createCards(cardData, deleteCard) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template'); //imported the template
  
    const card = cardTemplate.content.cloneNode(true); //cloned the template into an element card
    
    // @todo: DOM узлы
    card.querySelector('.card__image').src = cardData.link; //adding data about card
    card.querySelector('.card__image').alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name; // until here
  
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard); //declaring the deletion event
  
    return card; //ready card
  }

  // @todo: Функция создания карточки
  const cardContainer = document.querySelector('.places__list'); //container for the list of cards


  // @todo: Функция удаления карточки
  const deleteCard = function(evt) {
    const card = evt.target.closest('.card'); //getting the card that triggered the event
    cardContainer.removeChild(card);
  };
  
  // @todo: Вывести карточки на страницу
  initialCards.forEach((cardData) => { //iterating through the array of cards.js and adding them to our container
    const card = createCards(cardData, deleteCard); //adding according to our cloned template
    cardContainer.appendChild(card); //pushing to the container
  });