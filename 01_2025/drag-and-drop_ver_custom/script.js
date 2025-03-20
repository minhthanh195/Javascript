const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
const btnEdit = document.querySelector('.drag-btn.edit');

// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updateOnLoad = false;
let dragging = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggingItem;
let currentColumn;
let targetPosition;
let saveOffset;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray]
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]))
  })
}

// filter arrays to remove empty items
function filterArray(array) {
  const filteredArray = array.filter(item => item !== null)
  return filteredArray
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  const spanText = document.createElement('span');
  const dragOption = document.createElement('div');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  listEl.classList.add('drag-item');
  editBtn.type = 'button';
  editBtn.classList.add('drag-btn', 'edit');
  editBtn.textContent = 'Edit';
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('drag-btn', 'delete');
  dragOption.classList.add('drag-options');
  dragOption.appendChild(editBtn);
  dragOption.appendChild(deleteBtn);
  spanText.textContent = item;
  spanText.classList.add('drag-text');

  listEl.appendChild(spanText);
  listEl.appendChild(dragOption);
  listEl.setAttribute('ondrag', "dragStart(event)");
  listEl.setAttribute('ondragend', "dragEnd(event)");
  listEl.setAttribute('ondragover', "dragOver(event)");
  listEl.draggable = true;

  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updateOnLoad) {
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent = '';
  backlogListArray = filterArray(backlogListArray);
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  })

  // Progress Column
  progressList.textContent = '';
  progressListArray = filterArray(progressListArray);
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  })

  // Complete Column
  completeList.textContent = '';
  completeListArray = filterArray(completeListArray);
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  })

  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray = filterArray(onHoldListArray);
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  })

  updateSavedColumns()
  updateOnLoad = true;
}

// add item to column list, reset input
function addItem(column) {
  const text = addItemContainers[column].querySelector('.add-item').value.trim();

  if (!text) return;

  listArrays[column].push(text);
  addItemContainers[column].querySelector('.add-item').value = '';
  updateDOM();
}

// hide/ show add item area
function handleAddItem(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

function handleSaveItem(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';

  addItem(column);
}

// allow arrays to reflect drag and drop items
rebuildArrays = function () {
  backlogListArray = [];
  progressListArray = [];
  completeListArray = [];
  onHoldListArray = [];

  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].querySelector('.drag-text').textContent)
  }

  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].querySelector('.drag-text').textContent)
  }

  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].querySelector('.drag-text').textContent)
  }

  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].querySelector('.drag-text').textContent)
  }
}

// when item starts dragging
function drop(e) {
  e.preventDefault();

  const parent = listColumns[currentColumn];
  parent.appendChild(draggingItem);

  if (saveOffset > 0) {
    targetPosition.after(draggingItem); 
  } else {
    targetPosition.before(draggingItem); 
  }

  rebuildArrays();
  updateDOM();
  dragging = false;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(column) {

  listColumns.forEach((column) => {
    column.classList.remove('over');
  })

  listColumns[column].classList.add('over');
  currentColumn = column;
}

// drag areas item 
function dragStart(e) {
  dragging = true;
  draggingItem = e.target;
}

function dragOver(e) {
  e.preventDefault();
  const target = e.target;
  const dragItem = document.querySelectorAll('.drag-item');

  if (target && target !== draggingItem && target.classList.contains('drag-item')) {
    const rect = target.getBoundingClientRect();
    saveOffset = e.clientY - rect.top - rect.height / 2;

    dragItem.forEach((item) => {
      item.style.borderBottom = 'none';
      item.style.borderTop = 'none';
    })

    if (saveOffset > 0) {
      target.style.borderBottom = 'solid 2px red';
      targetPosition = target;
    } else {
      target.style.borderTop = 'solid 2px red';
      targetPosition = target;
    }
  }
}

function dragEnd(e) {
  listColumns.forEach((column) => {
    column.classList.remove('over');
  })
}

listColumns.forEach(function (element, index) {
  element.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit')) {
      const parent = e.target.closest('.drag-item');
      const spanText = parent.querySelector('.drag-text');
      const currentText = spanText.textContent;
      const input = document.createElement('input');

      input.type = 'text';
      input.value = currentText;
      input.classList.add('edit-input');
      parent.replaceChild(input, spanText);
      input.focus();

      let isKeyEsc = false;

      const finishEdit = () => {
        if (isKeyEsc) return;

        const newText = input.value.trim();

        if (newText !== '') {
          spanText.textContent = newText;
        }

        parent.replaceChild(spanText, input);
        rebuildArrays();
        updateDOM();
      }

      input.addEventListener('blur', finishEdit);
      input.addEventListener('keydown', function (e) {

        isKeyEsc = true;

        if (e.key === 'Enter') {
          isKeyEsc = false;
          input.blur();
        } else if (e.key === "Escape") {
          parent.replaceChild(spanText, input);
        }

        isKeyEsc = false;
      })
    }

    if (e.target.classList.contains('delete')) {
      const parent = e.target.closest('.drag-item');
      parent.remove();
      rebuildArrays();
      updateDOM();
    }
  })
})

updateDOM()