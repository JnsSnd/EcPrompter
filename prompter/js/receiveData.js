document.addEventListener('contextmenu', event => event.preventDefault());

function requestFullscreen() {

    const body = document.documentElement;


    if (body.requestFullscreen) {

        body.requestFullscreen();

    } else if (body.webkitRequestFullscreen) {

        body.webkitRequestFullscreen();

    } else if (body.mozRequestFullscreen) {

        body.mozRequestFullscreen();

    }

}

document.addEventListener("DOMContentLoaded", function () {

    const prompterContainer = document.getElementById("bgPrompter");

    const prompterContent = document.getElementById("prompter-content");


    if (window.name === 'receiverWindow') {

        // If the window is already created, just focus on it

        window.focus();


    } else {

        // If the window is not already created, assign a unique identifier

        window.name = 'receiverWindow';
    }


    //Check Prompter Type



    // Retrieve the form data from localStorage

    var prompterType = localStorage.getItem('prompterType');
    if(prompterType === 'LYRICS_PROMPTER') {
        prompterContainer.classList.add('lyricsPrompter');
        prompterContainer.classList.remove('blackwhite');
    } else {
        prompterContainer.classList.remove('lyricsPrompter');
        prompterContainer.classList.add('blackwhite');
    }
    
    
    // Display the received data
    
    var receivedData = localStorage.getItem('formData');
    prompterContent.innerHTML = receivedData;

    function checkSessionStorageItemNotEmpty(key) {
        var item = sessionStorage.getItem(key);
        if (item !== null && item !== '') {
            return true; // Item exists and is not empty
        } else {
            return false; // Item does not exist or is empty
        }
    }

    //Check fontsize
    var isNotEmpty = checkSessionStorageItemNotEmpty('fontSize');
    if (isNotEmpty) {
        var fontSize = sessionStorage.getItem('fontSize');
        prompterContent.style.fontSize = fontSize + 'px';

    } else {
        prompterContent.style.fontSize = '100px';
    }



});

