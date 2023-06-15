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
// buidBookmarks 
function buildBookmarks() {
    // remove all bookmark elements
    bookmarksContainer.textContent='';
    // bulid items
    bookmarks.forEach(bookmark => {
        const {name, url} = bookmark
        const item = document.createElement('div')
        item.classList.add('item')
        const closeIcon = document.createElement('i')
        closeIcon.classList.add('fas', 'fa-times')
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
        // favicon / link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
        favicon.setAttribute('alt', 'favicon');
        // link
        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.textContent = name;
        // append to bookmarks container
        linkInfo.append(favicon,link);
        item.append(closeIcon,linkInfo);
        bookmarksContainer.appendChild(item);
    });
}
// fetch bookmarks
function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        // Create bookmarks array in localStorage
        bookmarks = {
            {
                name:'Hoang Minh Thanh',
                url:'google.com'
            }
        }
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    buildBookmarks()
}
// delete bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark,i) =>{
        if(bookmark.url === url){
            bookmarks.splice(i,1);
        }
    });
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
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

function closeModal () {
    window.addEventListener('click',(e) => {e.target === modal ? modal.classList.remove('show-modal') : false})
}
// Add Eventlistener
modalShow.addEventListener('click',showModal)
modalClose.addEventListener('click',()=>modal.classList.remove('show-modal'));
bookmarkForm.addEventListener('submit',storeBookmart)

// on load , fetch bookmarks 
fetchBookmarks();