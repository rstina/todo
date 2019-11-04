const submitTodoBtn = document.querySelector('#addTodoBtn')
const todoListArray = []

submitTodoBtn.addEventListener('click',function(event){
    event.preventDefault()
    todoValue = document.querySelector('#todoText').value
    todoListArray.push(todoValue)
    todoValue = ''
    displayList(todoListArray)
})

const filterField = document.querySelector('#filter')
const ulList = document.querySelector('#todoList')
// display list
function displayList(arr){
    ulList.innerHTML = ''
    arr.forEach( function(product) {
        const li = document.createElement('li')
        li.textContent = product
        ulList.appendChild(li)
    })
}
filterField.addEventListener('input',function(event){
    console.log(event.currentTarget.value)
    const filteredTodos = todoListArray.filter(function(todo){
        return todo.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    })
    displayList(filteredTodos)
})