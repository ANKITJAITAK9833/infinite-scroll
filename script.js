const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];
// unsplash API:
const count = 30;
const apiKey = "pt11iJJHnMN8-otRF9jB2OVKF6VQ2XRxOlT_a_fQL-I";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    imagesLoaded = 0;
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //   create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //create <img> tag for image
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // add Eventlistner on image load to implement infinite scroll
    img.addEventListener("load", imageLoaded);
    //  put image in <a> and put both of them in imageContainer
    item.append(img);
    imageContainer.append(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    // catch error here
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
