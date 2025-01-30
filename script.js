"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const googleDriveLinks = [
        "https://drive.google.com/file/d/1FtxIyHlmcXg9V_ekCx1UaBChfJLnccch/view?usp=drive_link",
        "https://drive.google.com/file/d/1mLxkK4ij5SnXGXlIMb_cXSI2chpNVfmN/view?usp=drive_link",
        "https://drive.google.com/file/d/11OcLFua29Yj_DkrynjMvm-zxXzkSy9s6/view?usp=drive_link",
        "https://drive.google.com/file/d/1Cye-A15s5W_91a_JEKdYmD6YOHsEIWQ5/view?usp=drive_link",
        "https://drive.google.com/file/d/1YGfe2p6RY43zNVkt4iEA0VOiygok2Wmi/view?usp=drive_link",
        "https://drive.google.com/file/d/1sPCCRIB9DQi_mrhiXKNJThDJSKSPVvGF/view?usp=drive_link",
        "https://drive.google.com/file/d/1yRvipJP6waKX3poSMlITgXWb9jsNpmF7/view?usp=drive_link",
        "https://drive.google.com/file/d/1-eH4Y7jFWd2CosBQmN-ZtufQTNivEJpD/view?usp=drive_link",
        "https://drive.google.com/file/d/1D4RVmqIi-bTNG-_E8vQxqw3eFQRvgSgk/view?usp=drive_link",
        "https://drive.google.com/file/d/1BD7DoE3vEX-Jk_e6OCGAnUt61DgyUBnM/view?usp=drive_link",
        "https://drive.google.com/file/d/1dAxedqRl3EjowemyGuq5q0e_PiMikHha/view?usp=drive_link",
        "https://drive.google.com/file/d/1V2PoatvstPXH8RKQfkqZHxF5J2A7PZwK/view?usp=drive_link"
    ];
    // Convert Google Drive links to direct image links
    const photoGalleryImages = googleDriveLinks.map(getGoogleDriveDirectLink);
    createGallery(photoGalleryImages, "gallery-pictures");
    createGallery([
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a52a6323e37666612790e.jpeg",
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a52a6d6e97721714366af.jpeg",
        "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a52a660184528efd96a0e.jpeg"
    ], "gallery-floorplan");
    createDroneFootage("gallery-drone", "https://storage.googleapis.com/msgsndr/LQvEkxCKABszMRwJfao1/media/679a528dd6e9775cfd4366a7.mp4");
});
// Function to convert Google Drive links to direct image links
function getGoogleDriveDirectLink(fileUrl) {
    const match = fileUrl.match(/\/d\/(.*?)\//);
    return match
        ? `https://lh3.googleusercontent.com/d/${match[1]}=w800`
        : fileUrl;
}
// Function to create a gallery
function createGallery(images, galleryId) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement)
        return;
    let galleryHTML = `
    <div class="gallery__main">
      <img id="${galleryId}-current" class="gallery__img" src="${images[0]}" alt="Main Gallery Image">
    </div>
    <div class="gallery__thumbnails">
  `;
    images.forEach((imgUrl, index) => {
        galleryHTML += `
      <label class="gallery__thumb" data-index="${index}">
        <img src="${imgUrl}" alt="Thumbnail ${index + 1}">
      </label>
    `;
    });
    galleryHTML += `</div>`;
    galleryElement.innerHTML = galleryHTML;
    setupThumbnailClickHandler(galleryId, images);
}
// Function to create the drone footage video
function createDroneFootage(galleryId, videoUrl) {
    const galleryElement = document.getElementById(galleryId);
    if (!galleryElement)
        return;
    galleryElement.innerHTML = `
    <div class="drone-container">
      <video controls class="drone-video">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
}
// Function to handle thumbnail clicks
function setupThumbnailClickHandler(galleryId, images) {
    const mainImage = document.getElementById(`${galleryId}-current`);
    const thumbnails = document.querySelectorAll(`#${galleryId} .gallery__thumb`);
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            mainImage.src = images[index];
            // Remove active class from all thumbnails
            thumbnails.forEach((t) => t.classList.remove("active"));
            // Add active class to the selected thumbnail
            thumb.classList.add("active");
        });
    });
}