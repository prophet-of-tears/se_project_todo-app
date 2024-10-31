import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit, handleTotal}){
        super({popupSelector, handleFormSubmit, handleTotal});
        this._popupForm = this._popupElement.querySelector(".popup__form"),
        this._handleFormSubmit = handleFormSubmit,
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
        this._handleTotal = handleTotal;
    }

    _getInputValues(){
        const values = {};
        this._inputList.forEach((input) => {
           values[input.name] = input.value;
           
        });
        return values;
    }

setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._handleTotal(true);

            this._handleFormSubmit(inputValues);
        });
    }

}

export default PopupWithForm;