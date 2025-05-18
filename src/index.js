import { openPopup, closePopup} from "./components/modal.js";
import { createCards, deleteCard, likeCard } from "./components/card.js";
import { initialCards } from './components/initialcards.js';

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

//DOM elements for the pictures
const pictureClose = document.getElementById('close-image');
const picturePopup = document.querySelector('.popupCardView');
const popupCardView = document.querySelector('.popup_type_image');
const popupImage = popupCardView.querySelector('.popup__image');
const popupCaption = popupCardView.querySelector('.popup__caption');

//creating initial cards
const cardContainer = document.querySelector('.places__list');
initialCards.forEach(cardData => {
    const card = createCards(
        cardData,
        deleteCard,
        likeCard,
        viewCard
    );
    cardContainer.appendChild(card);
});

//behavior of our site
openEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(editPopup);
});
closeEdit.addEventListener('click', () => closePopup(editPopup));
openAdd.addEventListener('click', () => openPopup(addPopup));
closeAdd.addEventListener('click', () => closePopup(addPopup));
pictureClose.addEventListener('click', () => closePopup(picturePopup));

//viewing our cards
function viewCard(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(popupCardView);
};

//Saving data when editing profile
function editProfileHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;

    formElement.reset();
    closePopup();
}
formElement.addEventListener('submit', editProfileHandler);

//Saving data when adding card
function addCardHandler(evt) {
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
  closePopup();
}
pictureFormElement.addEventListener('submit', addCardHandler);