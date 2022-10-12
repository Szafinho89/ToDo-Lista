let todoInput   // miejsce gdzie uzytkownik wpisuje tresc zadania
let errorInfo   // info o braku zadań/ koniecznosci wpisania tekstu
let addBtn      // przycisk ADD - dodaje nowe elementy do listy
let ulList      // lista zadan, tagi UL
let newTodo

let popup       //popup
let popupInfo   // tekst w popupie, jak sie doda pusty tekst
let todoToEdit  // edytowany Todo
let popupInput  // input w popupie
let popupAddBtn // przycisk "zatwierdź" w popupie
let popupCloseBtn// przycisk "anuluj" w popupie


const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keydown', enterKeyCheck)

}

const addNewTodo = () => {
    if (todoInput.value !== '') {
    
        newTodo = document.createElement('li')
        newTodo.textContent= todoInput.value
        createToolsArea()

        ulList.append(newTodo)

        const liItems = document.querySelectorAll('li')
        newTodo.dataset.id='test'+liItems.length

        todoInput.value= ''
        errorInfo.textContent= ''
        console.log(ulList);

    } else errorInfo.textContent = 'Podaj treść zadania'
}

const createToolsArea = () => {
    let toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    let completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML='<i class="fas fa-check"></i></button>'

    let editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent= 'EDIT'

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML= '<i class="fas fa-times"></i></button>'

    toolsPanel.append(completeBtn, editBtn, deleteBtn)
}


const checkClick = (e) => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        editTodo(e)
    } else if (e.target.matches('.delete')) {
        deleteTodo(e)
    }
}


const editTodo = (e) => {
    popup.style.display = 'flex'
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
}


const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        closePopup()
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Wpisz zadanie'
    }
}

const deleteTodo = (e) => {
    e.target.closest('li').remove()
    const allTodos = ulList.querySelectorAll('li')
    console.log(allTodos);
    if (allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań.'
    }
}

const enterKeyCheck = (e) => {
    if (e.key === 'Enter') {
        addNewTodo()
    }
}

document.addEventListener('DOMContentLoaded', main)



