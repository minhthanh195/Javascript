const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updateOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];
// Drag Functionality

let draggingItem;
let currentColumn;
let dragging = false;

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


// updated item - delete if necessary or update array value
function updateItem(dataTarget, column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;

  if (!dragging) {
    if (selectedColumnEl[dataTarget].textContent === '') {
      delete selectedArray[dataTarget];
    } else {
      selectedArray[dataTarget] = selectedColumnEl[dataTarget].textContent;
    }
    updateDOM();
  }
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondrag', "dragStart(event)");
  listEl.setAttribute('ondragend', "dragEnd(event)");
  listEl.setAttribute('contenteditable', true);
  listEl.setAttribute('onfocusout', `updateItem(${index},${column})`);

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
  backlogListArray = filterArray(backlogListArray)
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index)
  })

  // Progress Column
  progressList.textContent = '';
  progressListArray = filterArray(progressListArray)
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  })

  // Complete Column
  completeList.textContent = '';
  completeListArray = filterArray(completeListArray)
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index)
  })

  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray = filterArray(onHoldListArray)
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index)
  })


  updateSavedColumns()
  updateOnLoad = true;
}

// add item to column list, reset input
function addItem(column) {
  const text = addItemContainers[column].textContent;

  if (!text) return;

  listArrays[column].push(text);
  addItemContainers[column].textContent = '';
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

// allow arays to reflect drag and drop items 
rebuildArrays = function () {
  backlogListArray = [];
  progressListArray = [];
  completeListArray = [];
  onHoldListArray = [];

  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent)
  }

  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent)
  }

  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent)
  }

  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent)
  }
}


// when item starts dragging
function drop(e) {
  e.preventDefault();

  const parent = listColumns[currentColumn];

  parent.appendChild(draggingItem);
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

  listColumns[column].classList.add('over')
  currentColumn = column;
}

// drag areas item 
function dragStart(e) {
  dragging = true;
  draggingItem = e.target
}

function dragEnd(e) {
  listColumns.forEach((column) => {
    column.classList.remove('over');
  })
}

updateDOM()