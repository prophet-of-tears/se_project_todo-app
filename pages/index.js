import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import {initialTodos, validationConfig} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/section.js";
import PopupWithForm  from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";



const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter( initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template",
     handleCheck,
     handleDelete,
     handleTotal);
  const todoElement = todo.getView(data);

return todoElement;
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
      const date = new Date(inputValues);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      inputValues.id = uuidv4();
      const todo = generateTodo(inputValues);
      section.addItem(todo);
      addTodoPopup.close();
      handleTotal(true);
      newTodoValidator.resetValidation();
  }, 
});

const section = new Section({
  initialTodos: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
    
  },
  containerElement: ".todos__list",
});

section.renderItems();


function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed){
  if(completed){
    todoCounter.updateCompleted(false);
  }
}

function handleTotal(total){
  todoCounter.updateTotal(total);
}


addTodoPopup.setEventListeners();


addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});


const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
