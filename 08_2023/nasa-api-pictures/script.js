const resultsNav = document.getElementById('resultNav');
const favoriteNav = document.getElementById('favoriteNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader')

// NASA API 
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {}; 

function showContent(page){
    loader.classList.add('hidden')
    window.scrollTo({
        top:0,
        behavior: 'instant',
    })
    // if(page === 'result'){
    //     resultsNav.classList.remove('hidden')
    //     favoriteNav.classList.add('hidden')
    // }
}
function creatDOMNodes(page){
    const currentArray = page === 'result' ? resultsArray : Object.values(favorites);
    currentArray.forEach((result) => {
        // Card container
        const card = document.createElement('div');
        card.classList.add('card');
        //link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.target = '_blank';
        // image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = ' NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // card title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // save text
        const saveText = document.createElement('p')
        saveText.classList.add('clickable');
        if (page === 'result'){
            saveText.textContent = ' Add to favorites';
            saveText.setAttribute('onclick',`saveFavorite('${result.url}')`)
        }else{
            saveText.textContent = ' Remove to favorites';
            saveText.setAttribute('onclick',`removeFavorite('${result.url}')`)
        }
        // card Text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // copy right 
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = `${copyrightResult}`
        // append 
        footer.append(date,copyright);
        cardBody.append(cardTitle,saveText,cardText,footer);
        link.append(image);
        card.append(link,cardBody);
        imagesContainer.appendChild(card)
    })
}
function updateDOM(page){
    // get favorites from localStorage
    if(localStorage.getItem('nasaFavorites')){
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    }
    imagesContainer.textContent ='';
    creatDOMNodes(page);
    showContent(page);
}
// Get 10 Images from NASA API 
async function getNasaPictures(){
    // show loader 
    loader.classList.remove('hidden')
    try{
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM('result')
    } catch(error){
        // catch error here
    }
}

// add result to favorites
function saveFavorite(itemUrl){
    // loop through results array to select favorite
    resultsArray.forEach((item)=>{
    if(item.url.includes(itemUrl) && !favorites[itemUrl]){
        favorites[itemUrl] = item;
        // Show save Confirmation for 2 seconds
        saveConfirmed.hidden = false;
        setTimeout(()=>{
            saveConfirmed.hidden = true
        },2000)
        // set favorites in localStorage
        localStorage.setItem('nasaFavorites',JSON.stringify(favorites))
    }
    })
}

// remove item from favorites
function removeFavorite(itemUrl){
    if(favorites[itemUrl]){
        delete favorites[itemUrl]
        // set favorites in localStorage
        localStorage.setItem('nasaFavorites',JSON.stringify(favorites))
        updateDOM('favorites');
    }
}

// on load 
getNasaPictures()