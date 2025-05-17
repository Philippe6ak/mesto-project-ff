import { cardContainer } from "./components/common.js";
import { openPopup, closePopup } from "./components/modal.js";
import { createCards, deleteCard, likeCard, viewCard } from "./components/card.js";
//DOM elements for profile edit
const editPopup = document.querySelector('.popup_type_edit');
const openEdit = document.querySelector('.profile__edit-button');
const closeEdit = document.getElementById('close-editing');
const formElement = document.getElementById('editing-form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

//DOM elements for adding new cards
const addPopup = document.querySelector('.popup_type_new-card');
const openAdd = document.querySelector('.profile__add-button');
const closeAdd = document.getElementById('close-card');
const pictureFormElement = document.getElementById('adding-form');
const pictureTitleInput = document.querySelector('.popup__input_type_card-name');
const pictureLinkInput = document.querySelector('.popup__input_type_url');
const pictureTitle = pictureTitleInput.value;
const pictureLink = pictureLinkInput.value;

//DOM elements for the pictures
const pictureClose = document.getElementById('close-image');
const picturePopup = document.querySelector('.popupCardView');

//behavior of our site
openEdit.addEventListener('click', () => openPopup(editPopup));
closeEdit.addEventListener('click', () => closePopup(editPopup));
openAdd.addEventListener('click', () => openPopup(addPopup));
closeAdd.addEventListener('click', () => closePopup(addPopup));
pictureClose.addEventListener('click', () => closePopup(picturePopup));

//Saving data when editing profile
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;

    formElement.reset();
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);

//Saving data when adding card
function handlePictureFormSubmit(evt) {
  evt.preventDefault();
  const pictureTitle = pictureTitleInput.value;
  const pictureLink = pictureLinkInput.value;

  const cardData = {
    name: pictureTitle, link: pictureLink};
  console.log(cardData.link);

  const newCard = createCards(cardData, deleteCard, likeCard, () => {viewCard(cardData)});

  cardContainer.appendChild(newCard);
  pictureFormElement.reset();
  closePopup();
}

pictureFormElement.addEventListener('submit', handlePictureFormSubmit);