const submitTodoBtn = document.querySelector('#addTodoBtn')
const todoListArray = []

submitTodoBtn.addEventListener('click',function(event){
    event.preventDefault()
    todoListArray.push(document.querySelector('#todoText').value)
    document.querySelector('#todoText').value = ''
    console.log(todoListArray)
    displayList(todoListArray)
})

// vilken array tittar jag på??
// varför inte delete efter att jag filtrerat

const filterField = document.querySelector('#filter')
const ulList = document.querySelector('#todoList')
// display list
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
            console.log(todoListArray)
            todoListArray.splice(todoListArray.indexOf(todo),1)
            event.currentTarget.closest('div').remove()
            console.log(todoListArray)
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