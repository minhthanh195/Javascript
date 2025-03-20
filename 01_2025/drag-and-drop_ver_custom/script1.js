// Tối ưu toàn bộ sự kiện bằng event delegation
const dragContainer = document.querySelector('.drag-container');
const listColumns = document.querySelectorAll('.drag-item-list');
const addContainers = document.querySelectorAll('.add-container');
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveBtns = document.querySelectorAll('.add-btn.solid');
const addItems = document.querySelectorAll('.add-item');

let draggingItem = null;
let targetPosition = null;
let saveOffset = 0;

const columnNames = ['backlog', 'progress', 'complete', 'onHold'];
let listArrays = [[], [], [], []];

function loadSavedData() {
  columnNames.forEach((name, index) => {
    const savedItems = JSON.parse(localStorage.getItem(`${name}Items`));
    listArrays[index] = savedItems || ['Item 1', 'Item 2', 'Item 3'];
  });
}

function saveData() {
  columnNames.forEach((name, index) => {
    localStorage.setItem(`${name}Items`, JSON.stringify(listArrays[index]));
  });
}

function createItem(text, column) {
  const item = document.createElement('li');
  item.className = 'drag-item';
  item.draggable = true;
  item.innerHTML = `
    <span class="drag-text">${text}</span>
    <div class="drag-options">
      <button class="drag-btn edit">Edit</button>
      <button class="drag-btn delete">Delete</button>
    </div>`;

  listColumns[column].appendChild(item);
}

function updateDOM() {
  listColumns.forEach((columnEl, index) => {
    columnEl.innerHTML = '';
    listArrays[index].forEach(item => createItem(item, index));
  });
  saveData();
}

function rebuildArrays() {
  listColumns.forEach((columnEl, index) => {
    listArrays[index] = Array.from(columnEl.children).map(item => item.querySelector('.drag-text').textContent);
  });
  saveData();
}

function addItem(column) {
  const text = addItems[column].value.trim();
  if (!text) return;

  listArrays[column].push(text);
  addItems[column].value = '';
  updateDOM();
}

function handleDragEvents(e) {
  const target = e.target;

  switch (e.type) {
    case 'dragstart':
      draggingItem = target.closest('.drag-item');
      targetPosition = null; // Reset tại đây
      break;

    case 'dragover':
      e.preventDefault();
      const item = target.closest('.drag-item');
      if (!item || item === draggingItem) return;

      const rect = item.getBoundingClientRect();
      saveOffset = e.clientY - rect.top - rect.height / 2;
      targetPosition = item;
      break;

    case 'drop':
      e.preventDefault();
      const column = target.closest('.drag-column').querySelector('.drag-item-list');
      if (!column || !draggingItem) return;

      // Xử lý rõ ràng khi chuyển sang cột mới
      if (targetPosition && column.contains(targetPosition)) {
        if (saveOffset > 0) {
          targetPosition.after(draggingItem);
        } else {
          targetPosition.before(draggingItem);
        }
      } else {
        column.appendChild(draggingItem);  // Khi chuyển sang cột mới và không xác định được vị trí
      }

      rebuildArrays();
      draggingItem = null;
      targetPosition = null;  // Reset tại đây
      break;

    case 'click':
      if (target.classList.contains('edit')) {
        const item = target.closest('.drag-item');
        const dragOption = item.querySelector('.drag-options');
        const span = item.querySelector('.drag-text');
        const edit = item.querySelector('.edit');
        const save = document.createElement('button');
        const textarea = document.createElement('textarea');
        save.type = 'button';
        save.textContent = 'Save';
        save.classList.add('drag-btn', 'save');

        dragOption.replaceChild(save, edit);
        
        textarea.type = 'text';
        textarea.value = span.textContent;
        item.replaceChild(textarea, span);
        textarea.focus();

        const finishEdit = () => {
          if (textarea.value.trim() !== '') span.textContent = textarea.value.trim();
          item.replaceChild(span, textarea);
          dragOption.replaceChild(edit, save);

          rebuildArrays();
        };

        // textarea.addEventListener('focusout', finishEdit);
        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            item.replaceChild(span, textarea)
           dragOption.replaceChild(edit, save);
          };
        });
        save.addEventListener('click', finishEdit);
      }

      if (target.classList.contains('delete')) {
        target.closest('.drag-item').remove();
        rebuildArrays();
      }

      if (target.matches('[data-add]')) {
        const index = target.getAttribute('data-add');
        const areaAdd = target.closest('.drag-column').querySelector('.add-item');
        addContainers[index].style.display = 'flex';
        addBtns[index].style.display = 'none';
        saveBtns[index].style.display = 'flex';

        areaAdd.focus();
      }

      if (target.matches('[data-save]')) {
        const index = target.getAttribute('data-save');

        addItem(index);
        addContainers[index].style.display = 'none';
        addBtns[index].style.display = 'flex';
        saveBtns[index].style.display = 'none';
      }
      break;
  }
}

dragContainer.addEventListener('dragstart', handleDragEvents);
dragContainer.addEventListener('dragover', handleDragEvents);
dragContainer.addEventListener('drop', handleDragEvents);
dragContainer.addEventListener('click', handleDragEvents);

loadSavedData();
updateDOM();