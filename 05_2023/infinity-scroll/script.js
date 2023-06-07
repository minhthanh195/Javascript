const imageContainer = document.getElementById('image_container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let toltalImages = 0;
let isInitialLoad = true;
// unplas API
let initialLoad = 5;
const apiKey ='oOdMH1fTK_VJ5vq1asCLDcY50u3HZq3Prwg0kE_9gZo';
let apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=natural&count=${initialLoad}`;

// check  if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === toltalImages){
        ready = true;
        loader.hidden = true;
    }
}
function updateApiUrl(newpic){
    apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=natural&count=${newpic}`;
}
// Helper Func to set attr on Dom Elements 
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// Creat Elements For links & photos ,add to Dom
function displayPhoto(){
    photosArray.forEach((photo) =>{
        imagesLoaded = 0;
        toltalImages = photosArray.length;
        const item = document.createElement('a')
        const img = document.createElement('img');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener("load",imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}

// Get photos from Unplast API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        if(isInitialLoad){
            updateApiUrl(30);
            isInitialLoad = false;
        }
        displayPhoto()
    }catch(error){

    }
}
window.addEventListener("scroll",() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})
// on load
getPhotos();