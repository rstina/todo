// creating form
const submitTodoBtn = document.querySelector('#addTodoBtn')
const todoField = document.querySelector('#todoText')
const todoSelect = document.querySelector('#todoSelect')
const today = new Date()
const todoEndDate = document.querySelector('#todoDate')
todoEndDate.value = today.toISOString().slice(0,10)

// save info from form
const todoListArr = []
const todoCatsArr = []
const todoDateArr = []

// filtering info
const filterField = document.querySelector('#filter')
const ulList = document.querySelector('#todoList')

submitTodoBtn.addEventListener('click',function(event){
    event.preventDefault()
    todoListArr.push(todoField.value)
    todoDateArr.push(todoDateArr.value)
    todoCatsArr.push(todoSelect.value)
    console.log(todoField.value)
    console.log(todoEndDate.value)
    console.log(todoSelect.value)
    todoField.value = ''
    todoEndDate.value = today.toISOString().slice(0,10)
    todoSelect.value = 'none'
    filterField.value = ''
    displayList(todoListArr)
})

function displayList(arr){
    ulList.innerHTML = ''
    arr.forEach( function(todo) {
        const div = document.createElement('div')
        const li = document.createElement('li')
        const deleteBtn = document.createElement('button')
        ulList.appendChild(div)
        div.appendChild(li)
        li.textContent = todo
        deleteBtn.textContent = 'X'
        li.appendChild(deleteBtn)
        deleteBtn.addEventListener('click',function(event){
            todoListArr.splice(todoListArr.indexOf(todo),1)
            event.currentTarget.closest('div').remove()
        })
    })
}

filterField.addEventListener('input',function(event){
    const filteredTodos = todoListArr.filter(function(todo){
        return todo.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    })
    displayList(filteredTodos)
})