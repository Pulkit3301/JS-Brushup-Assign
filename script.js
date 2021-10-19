const inputValue = document.querySelector(".input-container input");
const addBtn = document.querySelector(".input-container .add-btn");
const searchBtn = document.querySelector(".input-container .search-btn");
const list = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".footer button");
const errorMsg = document.querySelector(".error-container span");

/* inputValue.onkeyup = () =>{
    let userData = inputValue.value;
    if(userData.trim() != 0){
        addBtn.classList.add('active');
    }
    else{
        addBtn.classList.remove('active');
    }
} */
let getlocalStorage1 = localStorage.getItem("New Todo");
showTasks(getlocalStorage1);
/*Search Btn Functionality Added*/
searchBtn.onclick = () => {
  let getlocalStorage = JSON.parse(localStorage.getItem("New Todo"));
  let newStore = [];
  getlocalStorage.map((val) => {
    if (val.toUpperCase().indexOf(inputValue.value.toUpperCase()) > -1) {
      newStore = [...newStore, val];
    }
  });
  if (newStore.length == 0) {
    errorMsg.classList.add("red");
    errorMsg.innerHTML = "No Results Match Your Search";
    setTimeout(function () {
      errorMsg.innerHTML = "";
      errorMsg.classList.remove("red");
    }, 3000);
  }
  showTasks(JSON.stringify(newStore));
  inputValue.onclick = () => {
    showTasks(JSON.stringify(getlocalStorage));
  };
};
showTasks(getlocalStorage1);
addBtn.onclick = () => {
  let userData = inputValue.value;
  if (userData.trim() == 0) {
    errorMsg.classList.add("red");
    errorMsg.innerHTML = "Item Can't be Empty";
    setTimeout(function () {
      errorMsg.innerHTML = "";
      errorMsg.classList.remove("red");
    }, 3000);
  } else {
    errorMsg.classList.add("green");
    errorMsg.innerHTML = "Item Added Successfully";
    setTimeout(function () {
      errorMsg.innerHTML = "";
      errorMsg.classList.remove("green");
    }, 3000);
    let getlocalStorage = localStorage.getItem("New Todo");
    if (getlocalStorage == null) {
      listArr = [];
    } else {
      listArr = JSON.parse(getlocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    getlocalStorage = localStorage.getItem("New Todo");
    showTasks(getlocalStorage);
  }
};

function showTasks(getlocalStorage) {
  if (getlocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getlocalStorage);
  }
  const tasks = document.querySelector(".task-numbers");
  tasks.textContent = listArr.length;
  if (listArr.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += ` <li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  list.innerHTML = newLiTag;
  inputValue.value = "";
}
// delete task function
function deleteTask(index) {
  let getlocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getlocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks(getlocalStorage);
}
// delete All task function
deleteAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  let getlocalStorage = localStorage.getItem("New Todo");
  showTasks(getlocalStorage);
};
