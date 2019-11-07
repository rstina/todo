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
        description: todoField.value,
        date: todoEndDate.value,
        category: todoCat.value,
    }
    todoListArr.push(todoObj)
    // reset values
    todoField.value = ''
    todoEndDate.value = todayISO
    todoCat.value = 'unclear'
    filterField.value = ''
    document.querySelector('#radAll').checked  = true
    // display list
    displayList(todoListArr)
})

let filterByRadCat = todoListArr

function displayList(arr){
    ulList.innerHTML = ''
    arr.forEach( function(todo) {
        const div = document.createElement('div')
        const li = document.createElement('li')
        const pText = document.createElement('p')
        const pDate = document.createElement('p')
        const deleteBtn = document.createElement('i')
        deleteBtn.classList.add('fa-trash')
        deleteBtn.classList.add('fa')
        ulList.appendChild(li)
        li.appendChild(div)
        div.appendChild(pText)
        div.appendChild(pDate)
        // display warning if date is passed
        const todoDate = new Date(todo.date)
        let dispCat = changeDispText(todo.category)
        if (todo.date !== todayISO && todoDate<today){
            pText.textContent = `${todo.description} ${dispCat} ${todo.date} `
            pDate.textContent = ` Passed date`
            pDate.classList.add('passedDate')
        } else {
            pText.textContent = `${todo.description} ${dispCat} ${todo.date}`
        }
        deleteBtn.id = 'deleteBtnStyle'
        pText.appendChild(deleteBtn)
        deleteBtn.addEventListener('click',function(event){
            todoListArr.splice(todoListArr.indexOf(todo),1)
            filterByRadCat.splice(filterByRadCat.indexOf(todo),1)
            event.currentTarget.closest('li').remove()
        })
    })
}

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
    filterByTextField(filterByRadCat)
    displayList(filterByRadCat)
})

function filterByTextField(arr){
    filterField.addEventListener('input',function(event){
        arr = todoListArr
        const filteredTodos = filterByRadCat.filter(function(todo){
            return todo.description.toLowerCase().includes(event.currentTarget.value.toLowerCase())
        })
        displayList(filteredTodos)
    })
}

// change category text in display
function changeDispText(cat){
    let dispCat = ''
        if(cat === 'naughty'){
            dispCat = '- Naughty - '
        } else if(cat === 'nice'){
            dispCat = ' - Nice - '
        } else {
            dispCat = ' - Status unclear - '
        }    
        return dispCat
}