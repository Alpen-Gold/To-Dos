let btnAdd = document.querySelector("#btn-add");
let cardsTask = document.querySelector("#cards-task");

// start project ==============================================

// Local Storge
let array = [];

// mapped render lists
let renderList = () => {
  cardsTask.innerHTML = "";
  array.map((item, index) => {
    cardsTask.innerHTML += `
    
        <div class="card p-3 cardTask">
        <div class="d-flex align-items-center justify-content-between">
        <input readonly type="text" class="w-full text-white bg-transparent outline-none border-0 w-100 fs-5" id="editInput" value="${
          item.title
        }">
        <div class="d-flex align-items-center gap-2 ">
        <button class="btn btn-success d-flex align-items-center justify-content-center all-button button-plus-minus" id="editText"  onclick="editList(${index})" ><i class="fa-solid fa-pen"></i></button>
        
        <div class="dropdown">
        <button class="bg-color fs-5 text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-ellipsis-vertical fa-lg "></i>
        </button>
        <ul class="dropdown-menu">
          <li><button class="dropdown-item" type="button" onclick="deleteList(${index})">Delete List</button></li>
          <li><button class="dropdown-item" type="button" onclick="deleteCompletedList(${index})">Delete all tasks</button></li>
          <li><button class="dropdown-item" type="button" onclick="duplicateList(${index})">Duplicate list</button></li>
          <li><button class="dropdown-item" type="button" onclick="deleteCompletedTasks(${index})">Delete all completed tasks</button></li>
        </ul>
        </div>
      
        </div>
        
        </div>
        <div class="d-flex align-items-center justify-content-between gap-2">
        <input
        type="text"
        id="task-form"
        placeholder="Add new list"
        class="form-control my-2 all-input "
        />
        
        <button class="btn all-button" id="btn-task" onclick="btnTask(${index})">Add</button>
        </div>  

          ${item.tasks
            .map((taskItem, indexTask) => {
              if (taskItem.completed === false) {
                return `
            
            <div
            class="render-text my-2 d-flex align-items-center justify-content-between  px-2 rounded-3 py-2 border-color"
            >
            <input readonly type="text" class="w-full text-white bg-transparent outline-none border-0 w-100" id="editInput" value="${taskItem.name}">
            <div class="d-flex gap-2">
            <button class="btn btn-success d-flex align-items-center justify-content-center all-button button-plus-minus" id="editText"  onclick="editPlus(${index},${indexTask})" ><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger d-flex align-items-center justify-content-center all-button button-plus-minus" onclick="deleteMinus(${index},${indexTask})" ><i class="fa-solid fa-trash"></i></button>
            <button class=" d-flex align-items-center justify-content-center all-button button-plus-minus all-button" onclick="didTask(${index},${indexTask})"><i class="fa-solid fa-plus"></i></button>
            </div>
            </div>
        
            `;
              }
            })
            .join("")}

            <div id="liniya " class="d-flex justify-content-end w-100 ">            
            <button onclick="btnHis(${index})" class="text-white mt-4 mb-3 bg-color ">history</button>
            </div>
  
            ${item.tasks
              .map((taskItem, indexTask) => {
                if (taskItem.completed) {
                  return `
            <div
              class="render-text my-2 d-none align-items-center justify-content-between px-2 rounded-3 py-2 border-color" id="backTask"
            >
            <div class="d-flex align-items-center gap-3"> 
            <i class="fa-solid fa-circle-check fs-5 icon-color"></i>
            <del class="w-100 m-0 p-0"> ${taskItem.name}</del>
            </div>

            <div class="d-flex align-items-center gap-2">
            <button class=" d-flex align-items-center justify-content-center all-button button-plus-minus btn all-button" onclick="backTask(${index},${indexTask})"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
            </div>
                  `;
                }
              })
              .join("")}
        </div>
        `;
  });

  document.querySelector("#add-list-form").value = "";
};
// mapped render lists end

// localStorge
let local = () => {
  localStorage.setItem("array", JSON.stringify(array));
};
// localStorge end

// click Button Add lisk
btnAdd.addEventListener("click", () => {
  let taskInput = document.querySelector("#add-list-form");
  if (taskInput.value === "") return;

  array.push({ title: taskInput.value, tasks: [] });

  console.log(array);
  renderList();
  local();
  console.log(array);
});
// click Button Add lisk  end

//   task btn
let btnTask = (index) => {
  let inputTaskTitle = document.querySelectorAll("#task-form")[index].value;

  if (inputTaskTitle === "") return;

  array[index].tasks.push({ name: inputTaskTitle, completed: false });
  console.log(array[index]);
  renderList();
  local();
};
//   task btn end

//  edited task btn
let editPlus = async (arrayIndex, arrayTaskIndex) => {
  let editText =
    document.querySelectorAll(".cardTask")[arrayIndex].children[
      arrayTaskIndex + 2
    ].children[1].children[0];

  let inputTaskTitle =
    document.querySelectorAll(".cardTask")[arrayIndex].children[
      arrayTaskIndex + 2
    ].children[0];
  console.log(inputTaskTitle);
  console.log(arrayTaskIndex);

  if (inputTaskTitle.hasAttribute("readonly")) {
    editText.innerHTML = `<i class="fa-solid fa-check"></i>`;
    inputTaskTitle.removeAttribute("readonly");
    console.log(array[arrayIndex].tasks);
  } else {
    inputTaskTitle.setAttribute("readonly", true);
    editText.innerHTML = `<i class="fa-solid fa-pen"></i>`;

    array[arrayIndex].tasks[arrayTaskIndex].name = inputTaskTitle.value;
    console.log(array[arrayIndex].tasks);
    renderList();
    local();
  }
};
//  edited task btn end

// delete task btn
let deleteMinus = (arrayIndex, arrayTaskIndex) => {
  let deleteText =
    document.querySelectorAll(".cardTask")[arrayIndex].children[
      arrayTaskIndex + 2
    ].children[1].children[0];

  console.log(array[arrayIndex].tasks);

  let sizeTask = array[arrayIndex].tasks.slice(0, arrayTaskIndex);
  array[arrayIndex].tasks = sizeTask.concat(
    array[arrayIndex].tasks.slice(arrayTaskIndex + 1)
  );

  console.log(array[arrayIndex].tasks);
  renderList();
  local();
};
// delete task btn end

// Did task
let didTask = (arrayIndex, arrayTaskIndex) => {
  console.log(array[arrayIndex].tasks[arrayTaskIndex]);

  array[arrayIndex].tasks[arrayTaskIndex].completed = true;

  renderList();
  local();
};
//  Did task end

// Back task ehit
let backTask = (arrayIndex, arrayTaskIndex) => {
  console.log(array[arrayIndex].tasks[arrayTaskIndex]);

  array[arrayIndex].tasks[arrayTaskIndex].completed = false;

  local();
};
// Back task ehit

// History task
let historyBool = true;
let btnHis = (index) => {
  let cardTask = document
    .querySelectorAll(".cardTask")
    [index].querySelectorAll("#backTask");

  if (historyBool) {
    for (let i = 0; i < cardTask.length; i++) {
      cardTask[i].classList.remove("d-none");
      cardTask[i].classList += " d-flex";
      console.log(cardTask[i]);
    }
    historyBool = false;
  } else {
    for (let i = 0; i < cardTask.length; i++) {
      cardTask[i].classList.remove("d-flex");
      cardTask[i].classList += " d-none";
      console.log(cardTask[i]);
    }
    historyBool = true;
  }
};
// History task end

// Edit list
let editList = async (arrayIndex) => {
  let editText =
    document.querySelectorAll(".cardTask")[arrayIndex].children[0].children[1]
      .children[0];

  let inputTaskTitle =
    document.querySelectorAll(".cardTask")[arrayIndex].children[0].children[0];
  console.log(inputTaskTitle);

  if (inputTaskTitle.hasAttribute("readonly")) {
    editText.innerHTML = `<i class="fa-solid fa-check"></i>`;
    inputTaskTitle.removeAttribute("readonly");
    console.log(array[arrayIndex].title);
  } else {
    inputTaskTitle.setAttribute("readonly", true);
    editText.innerHTML = `<i class="fa-solid fa-pen"></i>`;

    array[arrayIndex].title = inputTaskTitle.value;
    console.log(array[arrayIndex]);
    renderList();
    local();
  }
};
// Edit List end

// Delete List
let deleteList = (index) => {
  let deleteSize = array.slice(0, index);
  array = deleteSize.concat(array.slice(index + 1));

  renderList();
  local();
};
// Delete List

// -Delete Compleded List
let deleteCompletedList = (index) => {
  array[index].tasks = [];

  renderList();
  local();
};
// Delete Compleded List end

// Duplicate list
let duplicateList = (index) => {
  let arrayListCopy = JSON.parse(JSON.stringify(array[index]));
  array.push(arrayListCopy);
  console.log(arrayListCopy);
  console.log(array);
  local();
  renderList();
};
// Duplicate end

let deleteCompletedTasks = (index) => {
  let newTaasks = array[index].tasks.filter((task) => !task.completed);

  array[index].tasks = newTaasks;
  renderList();
  local();
};

// start Project -----------------------------------------------------
renderList();
