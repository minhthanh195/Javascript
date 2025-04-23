// Tối ưu toàn bộ sự kiện bằng event delegation
const dragContainer = document.querySelector('.drag-container');
const listColumns = document.querySelectorAll('.drag-item-list');
const addContainers = document.querySelectorAll('.add-container');
const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveBtns = document.querySelectorAll('.add-btn.solid');
const addItems = document.querySelectorAll('.add-item');
const dragSelectList = document.querySelector('.drag-select-list')
const popup = document.querySelector('.popup')

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
    <button class="btn-open-options"><i class="fa-solid fa-bars"></i></button>
    <div class="drag-options">
      <button class="drag-btn down"><i class="fa-solid fa-down-long"></i></button>
      <button class="drag-btn up"><i class="fa-solid fa-up-long"></i></button>
      <button class="drag-btn move"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
      <button class="drag-btn edit"><i class="fa-solid fa-pencil"></i></button>
      <button class="drag-btn delete"><i class="fa-solid fa-trash-can"></i></button>
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
      if (!(target instanceof Element)) return

      const saveBtn = target.querySelector('.save');
      const btnOpenOptions = target.querySelector('.drag-options');

      if (saveBtn) saveBtn.click();
      if (btnOpenOptions.matches('.is-open')) btnOpenOptions.classList.remove('is-open');

      draggingItem = target.closest('.drag-item');
      targetPosition = null; // Reset position
      break;

    case 'dragover':
      e.preventDefault();

      const item = target.closest('.drag-item');
      const dragItems = document.querySelectorAll('.drag-item');

      if (!item || item === draggingItem) return;

      const rect = item.getBoundingClientRect();

      saveOffset = e.clientY - rect.top - rect.height / 2;
      targetPosition = item;

      dragItems.forEach((item) => {
        item.style.border = 'none';
      })

      if (saveOffset > 0) {
        item.style.borderBottom = 'solid 4px #f1c40f';
      } else {
        item.style.borderTop = 'solid 4px #f1c40f';
      }
      break;

    case 'drop':
      e.preventDefault();

      const column = target.closest('.drag-column')?.querySelector('.drag-item-list');
      const dragItem = document.querySelectorAll('.drag-item');

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
      // if (!targetPosition) return
      if (targetPosition) targetPosition.style.border = 'none';
      rebuildArrays();

      draggingItem = null;
      targetPosition = null;  // Reset tại đây

      dragItem.forEach((item) => {
        item.style.border = 'none';
      })
      break;

    case 'click':
      if (target.closest('.edit')) {
        const item = target.closest('.drag-item');
        const dragOption = item.querySelector('.drag-options');
        const span = item.querySelector('.drag-text');
        const edit = item.querySelector('.edit');
        const save = document.createElement('button');
        const textarea = document.createElement('textarea');
        save.type = 'button';
        save.innerHTML = '<i class="fa-solid fa-check"></i>';
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

        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            item.replaceChild(span, textarea);
            dragOption.replaceChild(edit, save);
            dragOption.classList.remove('is-open');
          };
        });

        save.addEventListener('click', finishEdit);
      }

      if (target.closest('.delete')) {
        target.closest('.drag-item').remove();
        rebuildArrays();
      }

      if (target.closest('.move')) {
        const indexColumn = target.closest('.drag-column').getAttribute('data-column');

        draggingItem = target.closest('.drag-item');
        handleSelectActiveOption(indexColumn);
        popup.style.display = 'flex';
      }

      if (target.closest('.up')) {
        const itemList = target.closest('.drag-item-list');
        const currentElement = target.closest('.drag-item');
        const previousElement = currentElement.previousElementSibling;

        if (!previousElement) return
        itemList.insertBefore(currentElement, previousElement);
      }

      if (target.closest('.down')) {
        const itemList = target.closest('.drag-item-list');
        const currentElement = target.closest('.drag-item');
        const nextElement = currentElement.nextElementSibling;

        if (!nextElement) return
        itemList.insertBefore(nextElement, currentElement);
      }

      if (target.closest('.btn-open-options')) {
        const optionList = target.closest('.btn-open-options').nextElementSibling;
        const dragOptions = document.querySelectorAll(".drag-options");

        if (optionList.matches('.is-open')) {
          dragOptions.forEach((item) => {
            item.classList.remove('is-open');
          })
        } else {
          dragOptions.forEach((item) => {
            item.classList.remove('is-open')
          })

          optionList.classList.add('is-open')
        }
      }

      if (target.closest('.add-btn')?.matches('[data-add]')) {
        const index = target.closest('.add-btn').getAttribute('data-add');
        const areaAdd = target.closest('.drag-column').querySelector('.add-item');

        addContainers[index].style.display = 'block';
        addBtns[index].style.display = 'none';
        saveBtns[index].style.display = 'block';
        areaAdd.focus();
      }

      if (target.closest('.add-btn')?.matches('[data-save]')) {
        const index = target.closest('.add-btn').getAttribute('data-save');

        addItem(index);
        addContainers[index].style.display = 'none';
        addBtns[index].style.display = 'block';
        saveBtns[index].style.display = 'none';
      }

      if (!target.closest('.drag-item') && !target.closest('.edit')) {
        const dragOptionOpened = document.querySelector('.drag-options.is-open')
        dragOptionOpened.classList.remove('is-open')
        if (dragOptionOpened.querySelector('.save')) dragOptionOpened.querySelector('.save').click();
      }

      break;
  }
}

function handleMoveOnMobile(e) {
  const target = e.target;

  if (target.classList.contains('drag-select-btn') && target.closest('.drag-select-list')) {
    const index = target.getAttribute('data-move');
    
    popup.style.display = 'none';
    handleSelectActiveOption(index);
    listColumns[index].appendChild(draggingItem);
    document.querySelector('.drag-options.is-open').classList.remove('is-open');
    rebuildArrays();
  } else {
    popup.style.display = 'none';
  }
}

function handleSelectActiveOption(column) {
  const dragSelectItems = dragSelectList.children;
  Array.from(dragSelectItems).forEach((item) => {
    item.classList.remove('is-active');
  })
  dragSelectItems[column].classList.add('is-active');
}

dragContainer.addEventListener('dragstart', handleDragEvents);
dragContainer.addEventListener('dragover', handleDragEvents);
dragContainer.addEventListener('drop', handleDragEvents);
dragContainer.addEventListener('click', handleDragEvents);
popup.addEventListener('click', handleMoveOnMobile);
loadSavedData();
updateDOM();