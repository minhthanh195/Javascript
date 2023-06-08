const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = []

// show Modal, focus on Input
function showModal (){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}
// validate Form
function validate(nameValue,urlValue){
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    
    if (!urlValue || !nameValue){
        alert('please submit values for both fields')
        return false
    }
    if(!urlValue.match(regex)){
        alert('please valid web addres')
        return false;
    }
    // valid
    return true
}
// fetch bookmarks
function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        // Create bookmarks array in localStorage
        bookmarks = [
            {
                name:'Hoang Minh Thanh',
                url:'google.com'
            }
        ]
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    console.log(bookmarks)
}

// handle data from form
function storeBookmart(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value
    if(!urlValue.includes('http://') && !urlValue.includes('https://')){
        urlValue = `https://${urlValue}`
    }
    if(!validate(nameValue,urlValue)){
        return false;
    }
    const bookmark = {
        name : nameValue,
        url : urlValue,
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    fetchBookmarks()
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Add Eventlistener
modalShow.addEventListener('click',showModal)
modalClose.addEventListener('click',()=>modal.classList.remove('show-modal'));
window.addEventListener('click',(e) => {e.target === modal ? modal.classList.remove('show-modal') : false})
bookmarkForm.addEventListener('submit',storeBookmart)

// on load , fetch bookmarks 
fetchBookmarks();