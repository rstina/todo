const submitTodoBtn = document.querySelector('#addTodoBtn')
const todoListArray = []
const todoField = document.querySelector('#todoText')
const filterField = document.querySelector('#filter')
const ulList = document.querySelector('#todoList')

submitTodoBtn.addEventListener('click',function(event){
    event.preventDefault()
    todoListArray.push(todoField.value)
    todoField.value = ''
    filterField.value = ''
    displayList(todoListArray)
})

function displayList(arr){
    ulList.innerHTML = ''
    arr.forEach( function(todo) {
        const div = document.createElement('div')
        ulList.appendChild(div)
        const li = document.createElement('li')
        li.textContent = todo
        div.appendChild(li)
        const deleteBtn = document.createElement('button')
        deleteBtn.addEventListener('click',function(event){
            todoListArray.splice(todoListArray.indexOf(todo),1)
            event.currentTarget.closest('div').remove()
        })
        li.appendChild(deleteBtn)
        deleteBtn.textContent = 'X'
    })
}

filterField.addEventListener('input',function(event){
    const filteredTodos = todoListArray.filter(function(todo){
        return todo.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    })
    displayList(filteredTodos)
})