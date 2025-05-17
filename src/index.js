import { cardContainer } from "./components/card.js";
import { managePopup , manageImgPopup} from "./components/modal.js";
import { createCards, likeCard, deleteCard, viewCard } from "./components/card.js";

//creating popup behavior for our buttons
managePopup('.popup_type_edit', '.profile__edit-button', '#close-editing');
managePopup('.popup_type_new-card', '.profile__add-button', '#close-card');
manageImgPopup(".popup_type_image", "#close-image");

//DOM elements for profile edit
const formElement = document.getElementById('editing-form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//DOM elements for adding new cards
const pictureFormElement = document.getElementById('adding-form');
const pictureTitleInput = document.querySelector('.popup__input_type_card-name');
const pictureLinkInput = document.querySelector('.popup__input_type_url');

//Saving data when editing profile
function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');

    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;

    formElement.reset();
}
formElement.addEventListener('submit', handleFormSubmit);

//Saving data when adding card
function handlePictureFormSubmit(evt) {
  evt.preventDefault();

  const pictureTitle = pictureTitleInput.value;
  const pictureLink = pictureLinkInput.value;

  const cardData = {
    name: pictureTitle,
    link: pictureLink
  };

  const newCard = createCards(cardData, deleteCard, likeCard, () => {viewCard(cardData)});
  cardContainer.appendChild(newCard);
  pictureFormElement.reset();
}

pictureFormElement.addEventListener('submit', handlePictureFormSubmit);