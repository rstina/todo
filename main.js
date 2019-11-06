// creating form
const submitTodoBtn = document.querySelector('#addTodoBtn')
const todoField = document.querySelector('#todoText')
const todoCat = document.querySelector('#todoCat')
const today = new Date()
const todayISO = today.toISOString().slice(0,10)
const todoEndDate = document.querySelector('#todoDate')
todoEndDate.value = todayISO

// save gathered information
const todoListArr = []

// filtering info
const filterField = document.querySelector('#filter')
const ulList = document.querySelector('#todoList')
// radio buttons
const radBtnAll = document.querySelector('#radAll')
const radBtnNone = document.querySelector('#radNone')
const radBtnFree = document.querySelector('#radFree')
const radBtnWork = document.querySelector('#radWork')
const radForm = document.querySelector('#radForm')

submitTodoBtn.addEventListener('click',function(event){
    event.preventDefault()
    // create todo object and push into array
    const todoObj = {
        description: '',
        date: '',
        category: ''
    }
    todoObj.description = todoField.value
    todoObj.date = todoEndDate.value
    todoObj.category = todoCat.value
    todoListArr.push(todoObj)
    // reset values
    todoField.value = ''
    todoEndDate.value = todayISO
    todoCat.value = 'none'
    filterField.value = ''
    document.querySelector('#radAll').checked  = true
    // display list
    displayList(todoListArr)
})

function displayList(arr){
    ulList.innerHTML = ''
    arr.forEach( function(todo) {
        const div = document.createElement('div')
        const liText = document.createElement('li')
        const deleteBtn = document.createElement('button')
        ulList.appendChild(div)
        div.appendChild(liText)
        // display warning if date is passed
        const todoDate = new Date(todo.date)
        if (todo.date !== todayISO && todoDate<today){
            liText.textContent = `${todo.description} ${todo.date} Varning, datum passerat! ${todo.category} `
        } else {
            liText.textContent = `${todo.description} ${todo.date} ${todo.category} `
        }
        deleteBtn.textContent = 'X'
        liText.appendChild(deleteBtn)
        deleteBtn.addEventListener('click',function(event){
            todoListArr.splice(todoListArr.indexOf(todo),1)
            event.currentTarget.closest('div').remove()
        })
    })
}

let filterByRadCat = todoListArr

radForm.addEventListener('click',function(event){
    const radFilterValue = radForm.elements["categories"].value
    if(radFilterValue !== 'all'){
        filterByRadCat = todoListArr.filter(function(todo){
            return todo.category.toLowerCase().includes(radFilterValue.toLowerCase())
        })
    }
    else if (radFilterValue === 'all'){
        filterByRadCat = todoListArr
    }
    filterField.value = ''
    displayList(filterByRadCat)
})

filterField.addEventListener('input',function(event){
    const filteredTodos = filterByRadCat.filter(function(todo){
        return todo.description.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    })
    displayList(filteredTodos)
})