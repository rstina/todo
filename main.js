const submitTodoBtn = document.querySelector('#addTodoBtn')
const todoListArray = []
let idCounter = 0

submitTodoBtn.addEventListener('click',function(event){
    event.preventDefault()
    todoListArray.push(document.querySelector('#todoText').value)
    document.querySelector('#todoText').value = ''
    displayList(todoListArray)
    idCounter++
})

const filterField = document.querySelector('#filter')
const ulList = document.querySelector('#todoList')
// display list
function displayList(arr){
    ulList.innerHTML = ''
    arr.forEach( function(todo,idCounter) {
        const div = document.createElement('div')
        div.id = 'id'+idCounter
        ulList.appendChild(div)
        const li = document.createElement('li')
        li.textContent = todo
        div.appendChild(li)
        const deleteBtn = document.createElement('button')
        deleteBtn.id = 'ID'+idCounter
        deleteBtn.addEventListener('click',function(event){
            // tar bort ut listan
            console.log(todoListArray)
            document.getElementById(event.currentTarget.id.toLowerCase()).remove()
            // hur ta bort ur arrayen?
            console.log(todoListArray)
        })
        li.appendChild(deleteBtn)
        deleteBtn.textContent = 'X'
    })
}


filterField.addEventListener('input',function(event){
    console.log(event.currentTarget.value)
    const filteredTodos = todoListArray.filter(function(todo){
        return todo.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    })
    displayList(filteredTodos,idCounter)
})