const submitTodoBtn = document.querySelector('#addTodoBtn')
const todoListArray = []
let idCounter = 0

submitTodoBtn.addEventListener('click',function(event){
    event.preventDefault()
    todoValue = document.querySelector('#todoText').value
    console.log(todoValue)
    console.log(todoListArray)
    console.log(todoListArray.id)
    todoListArray.push(todoValue)
    todoListArray.id = 'id'+idCounter
    displayList(todoListArray)
})

const filterField = document.querySelector('#filter')
const ulList = document.querySelector('#todoList')
// display list
function displayList(arr){
    ulList.innerHTML = ''
    arr.forEach( function(todo) {
        const div = document.createElement('div')
        const li = document.createElement('li')
        li.textContent = todo
        div.appendChild(li)
        ulList.appendChild(div)
    })
}
filterField.addEventListener('input',function(event){
    console.log(event.currentTarget.value)
    const filteredTodos = todoListArray.filter(function(todo){
        return todo.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    })
    displayList(filteredTodos)
})