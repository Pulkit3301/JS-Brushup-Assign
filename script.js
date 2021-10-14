const inputValue = document.querySelector(".input-container input")
const addBtn = document.querySelector(".input-container button")
const list = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".footer button");


inputValue.onkeyup = () =>{
    let userData = inputValue.value;
    if(userData.trim() != 0){
        addBtn.classList.add('active');
    }
    else{
        addBtn.classList.remove('active');
    }
}
showTasks();
addBtn.onclick = () => {
    let userData = inputValue.value;
    let getlocalStorage = localStorage.getItem("New Todo");
    if(getlocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getlocalStorage);
    }
    listArr.push(userData);
    addBtn.classList.remove('active')
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

function showTasks(){
    let getlocalStorage = localStorage.getItem("New Todo");
    if(getlocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getlocalStorage);
    }
    const tasks = document.querySelector(".task-numbers");
    tasks.textContent = listArr.length; 
    if(listArr.length > 0){
        deleteAllBtn.classList.add('active');
    }
    else{
        deleteAllBtn.classList.remove('active');
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += ` <li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });
    list.innerHTML = newLiTag;
    inputValue.value = "";
}
// delete task function
function deleteTask(index){
    let getlocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getlocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}
// delete All task function
deleteAllBtn.onclick = () => {
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}