const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false ;
let imagesLoaded = 0 ;
let totalImages = 0 ;
let photosArray = [];

// Unsplash api

const count = 30 ;
const apiKey ='q8qnZ8l9Toky892L_aF-We7HFjFTHYwoZYs_2LHwle8' ;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all the images were loaded
function imageLoaded() {
    //console.log('image loaded');
    imagesLoaded++ ;
    if (imagesLoaded === totalImages) {
        ready = true ;
        loader.hidden = true ;
        // done finally
        // console.log('ready =' , ready);
    }
}


// Helper function to set Attributes on DOM elements
function setAttributes(element , attributes) {
    for(const key in attributes) {
        element.setAttribute(key ,attributes[key]);
    }
}


// Create Elements for links & photos , add to DOM
function displayPhotos() {
    imagesLoaded = 0 ;
    totalImages = photosArray.length ;
    //console.log('total images' , totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) =>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular ,
            alt: photo.alt_description ,
            title: photo.alt_description ,
        });
        // Event listener , check when each is finished loading
        img.addEventListener('load' , imageLoaded);

        // Put <img> inside <a> , then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // Catch Error Here
    }
}


// Check to see if scrolling near bottom of page , Load More Photos
window.addEventListener('scroll' , () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false ;
        getPhotos();
    }
});


// On Load
getPhotos();