const todoBtn = document.querySelector('.todo-button');
const closeBtn = document.querySelector('.close-btn');
const minimizeBtn = document.querySelector('.minimize-btn');
const homeView = document.querySelector('.app-container');
const todoView = document.getElementById('todo-view');
let editIndex = null;
let deleteIndex = null;
const confirmModal = document.getElementById('confirm-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const goBackBtn = document.getElementById('go-back');

todoBtn.addEventListener('mouseenter', () => {
  todoBtn.src = 'assets/state=clicked.png';
});

todoBtn.addEventListener('mouseleave', () => {
  todoBtn.src = 'assets/state=normal.png';
});

todoBtn.addEventListener('mousedown', () => {
  todoBtn.src = 'assets/state=clicked.png';
});

todoBtn.addEventListener('mouseup', () => {
  todoBtn.src = 'assets/state=clicked.png';
});
//close and minimize
document.querySelector('.close-btn').addEventListener('click', () => {
  window.electronAPI.close();
});

document.querySelector('.minimize-btn').addEventListener('click', () => {
  window.electronAPI.minimize();
});

closeBtn.addEventListener('mouseenter', () => {
  closeBtn.src = 'assets/closeclicked.png';
});

closeBtn.addEventListener('mouseleave', () => {
  closeBtn.src = 'assets/closenormal.png';
});

closeBtn.addEventListener('mousedown', () => {
  closeBtn.src = 'assets/closeclicked.png';
});

closeBtn.addEventListener('mouseup', () => {
  closeBtn.src = 'assets/closeclicked.png';
});

minimizeBtn.addEventListener('mouseenter', () => {
  minimizeBtn.src = 'assets/Property 1=Variant2.png';
});

minimizeBtn.addEventListener('mouseleave', () => {
  minimizeBtn.src = 'assets/Property 1=Default.png';
});

minimizeBtn.addEventListener('mousedown', () => {
  minimizeBtn.src = 'assets/Property 1=Variant2.png';
});

minimizeBtn.addEventListener('mouseup', () => {
  minimizeBtn.src = 'assets/Property 1=Variant2.png';
});


todoBtn.addEventListener('click', () => {
  homeView.style.display = 'none';
  todoView.classList.add('active');
});
goBackBtn.addEventListener('click', () => {
    todoView.classList.remove('active');
    homeView.style.display = 'flex';
  });  
//task windoooooow
let tasks = [];

const addBtn = document.getElementById('add-task');
const modal = document.getElementById('task-modal'); 
const taskInput = document.getElementById('task-input');
const saveBtn = document.getElementById('save-task');
const cancelBtn = document.getElementById('cancel-task');
const taskList = document.getElementById('task-list');

//to open
addBtn.addEventListener('click', () => {
  taskInput.value = "";
  modal.classList.add('active');
  document.getElementById('modal-title').innerText = "Add Task";
});

//here cancel task
cancelBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

//save it
saveBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      if (editIndex !== null) {
        tasks[editIndex] = taskText;
        editIndex = null;
      } else {
        tasks.push(taskText);
      }
      renderTasks();
      modal.classList.remove('active');
    }
  });
  

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((text, index) => {
      const li = document.createElement('li');
      li.className = "task-item";
      const displayText = text.length > 27 ? text.slice(0, 27) + "..." : text;
      li.innerHTML = `
        <span title="${text}" class="task-text">- ${displayText}</span>
        <span class="task-controls">
          <span class="delete-btn" data-index="${index}"><img src="assets/delicon.png"></span>
          <span class="edit-btn" data-index="${index}"><img src="assets/edit.png"></span>
        </span>`;
      taskList.appendChild(li);
    });
  
//edit task
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const btn = e.target.closest('.edit-btn');
        editIndex = btn.dataset.index;
        taskInput.value = tasks[editIndex];
        document.getElementById('modal-title').innerText = "Edit Task";
    modal.classList.add('active');
      });
    });
//delete atsk
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const btn = e.target.closest('.delete-btn');
      deleteIndex = btn.dataset.index;        
      confirmModal.classList.add('active');
    });
  });
}
//within delete :
confirmDeleteBtn.addEventListener('click', () => {
    if (deleteIndex !== null) {
      tasks.splice(deleteIndex, 1);
      deleteIndex = null;
      renderTasks();
      confirmModal.classList.remove('active');
    }
  });
  
cancelDeleteBtn.addEventListener('click', () => {
    deleteIndex = null;
    confirmModal.classList.remove('active');
  });
  