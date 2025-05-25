import './pages/index.css';
import { openPopup, closePopup} from "./components/modal.js";
import { createCards, deleteCard, likeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getInitialCards, getLoggedUser, editingProfile, addCard, updateProfilePic} from "./components/api.js";

const cardContainer = document.querySelector('.places__list');
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
//DOM for profile picture editing
const profilePicFormElement = document.getElementById('profile-editing-form');
const profilePicLink = document.getElementById('profile-link-input');
const profileImg = document.querySelector('.profile__image');
const editProfilePopup = document.querySelector('.popup_type_profile');
const closeProfilePopup = document.getElementById('close-profile');

//first cards with handlers
let userId = '';
let avatar = '';
Promise.all([getLoggedUser(), getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    avatar = user.avatar;
    profileName.textContent = user.name;
    profileDesc.textContent = user.about;

    profileImg.style.backgroundImage = `url(${avatar})`;

    cards.forEach((cardData) => {
      const card = createCards(cardData, deleteCard, likeCard, viewCard, userId);
      cardContainer.append(card);
    });
  })
  .catch((err) => {
    console.log('could not add cards : ' + err + userId);
  });

//behavior of our site
//edit profile name and desc
openEdit.addEventListener('click', () => {
  clearValidation(editPopup, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(editPopup);
});
closeEdit.addEventListener('click', () => closePopup());
//add new card manually
openAdd.addEventListener('click', () => {
  clearValidation(addPopup, validationConfig);
  openPopup(addPopup);
});
closeAdd.addEventListener('click', () => closePopup());
//closing the card view, the opening is appointed with function viewCard
pictureClose.addEventListener('click', () => closePopup(picturePopup));
//edit profile picture
profileImg.addEventListener('click', () => {
  openPopup(editProfilePopup);
});
closeProfilePopup.addEventListener('click', () => closePopup());

//viewing our cards
function viewCard(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(popupCardView);
};

//Saving data when editing profile
function editProfileHandler(evt) {
  renderLoading(true, formElement);
  evt.preventDefault();
  editingProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDesc.textContent = res.about;
      closePopup();
      formElement.reset();
    })
    .catch(err => console.log('could not update the user name :' + err))
    .finally(() => {renderLoading(false, formElement)})
}
formElement.addEventListener('submit', editProfileHandler);

//Saving data when adding card
function addCardHandler(evt) {
  renderLoading(true, pictureFormElement);
  evt.preventDefault();
  addCard(pictureTitleInput.value, pictureLinkInput.value)
    .then((res) => {
      // const pictureTitle = res.name;
      // const pictureLink = res.link;

      // const cardData = {
      //   name: pictureTitle,
      //   link: pictureLink
      // }
      const newCard = createCards(res, deleteCard, likeCard, () => viewCard(cardData), userId);
      cardContainer.prepend(newCard);
      closePopup();
      pictureFormElement.reset();
    })
    .catch(err => alert(err))
    .finally(() => {renderLoading(false, pictureFormElement)})
}
pictureFormElement.addEventListener('submit', addCardHandler);

function editProfilePictureHandler(evt) {
  evt.preventDefault();
  renderLoading(true, profilePicFormElement);
  updateProfilePic(profilePicLink.value)
    .then((res) => {
      profileImg.style.backgroundImage = res.avatar;
      closePopup();
    })
    .catch(err => console.log('could not update avatar :' + err))
    .finally(() => {renderLoading(false, profilePicFormElement);})
}
profilePicFormElement.addEventListener('submit', editProfilePictureHandler);

//loading function
function renderLoading(isLoading, formElement) {
  const submitButton = formElement.querySelector('.popup__button')
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  }
  else {
    submitButton.textContent = 'Сохранить';
  }
}

const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input_error_active' 
}; 
enableValidation(validationConfig);




const renderCard = (cardItem, myId, method = 'prepend') => {
  const cardElement = createCard(
    cardItem,
    myId,
    handlerLikeCard,
    handlerCardView
  );
  listCard[method](cardElement);
};