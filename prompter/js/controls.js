document.addEventListener("DOMContentLoaded", function () {

    const prompterContainer = document.getElementById("bgPrompter");

    const prompterContent = document.getElementById("prompter-content");



    const playPauseKey = 'Space';



    let scrollingNow = false;

    let animationLoop;

    let fontSize;





    // Set the initial position of the prompter content

    let scrollPosition = 0;

    prompterContent.style.top = scrollPosition + "px";



    // Set the speed of auto-scrolling (adjust as needed)

    let scrollSpeed = 0.5;



    // Function to handle auto-scrolling

    function scrollScript() {

        scrollPosition -= scrollSpeed;

        prompterContent.style.top = scrollPosition + "px";

        animationLoop = requestAnimationFrame(scrollScript);

    }



    function playPauseScroll() {

        if (scrollingNow) {

            pauseScroll();

        } else {

            playScroll();

        }

    }



    function playScroll() {

        scrollingNow = true;

        scrollScript();

    }



    function pauseScroll() {

        cancelAnimationFrame(animationLoop);

        scrollingNow = false;

    }



    function getFontSize() {

        // Get the computed style of the element

        var computedStyle = window.getComputedStyle(prompterContent);



        // Get the font size property from the computed style

        fontSize = computedStyle.getPropertyValue('font-size');

    }



    function toggleFullscreen() {

        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement) {

            exitFullscreen();

        } else {

            requestFullscreen();

        }

    }



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



    function exitFullscreen() {

        if (document.exitFullscreen) {

            document.exitFullscreen();

        } else if (document.webkitExitFullscreen) {

            document.webkitExitFullscreen();

        } else if (document.mozCancelFullscreen) {

            document.mozCancelFullscreen();

        }

    }

    var keydownListener = function (event) {
        switch (event.code) {

            case playPauseKey:

                event.preventDefault();

                playPauseScroll();

                break;

            case 'Digit1':

                event.preventDefault();

                scrollSpeed = 0.5;

                break;

            case 'Digit2':

                event.preventDefault();

                scrollSpeed = 1;

                break;

            case 'Digit3':

                event.preventDefault();

                scrollSpeed = 1.5;

                break;

            case 'Digit5':

                event.preventDefault();

                scrollSpeed = 2;

                break;

            case 'Digit6':

                event.preventDefault();

                scrollSpeed = 2.5;

                break;

            case 'Digit7':

                event.preventDefault();

                scrollSpeed = 3;

                break;

            case 'Digit8':

                event.preventDefault();

                scrollSpeed = 3.5;

                break;

            case 'Digit9':

                event.preventDefault();

                scrollSpeed = 4;

                break;

            case 'Digit0':

                event.preventDefault();

                pauseScroll();

                break;

            case 'ArrowUp':

                event.preventDefault();

                pauseScroll();

                if (prompterContent.offsetTop >= 0) {

                    scrollPosition = 0;

                    prompterContent.style.top = "0px";

                } else {

                    scrollPosition += 50;

                    prompterContent.style.top = scrollPosition + "px";

                }

                break;

            case 'ArrowDown':

                event.preventDefault();

                pauseScroll();

                scrollPosition -= 50;

                prompterContent.style.top = scrollPosition + "px";

                break;



            case 'F11':

                event.preventDefault();

                // Toggle fullscreen when 'F' key is pressed

                toggleFullscreen();

                // Toggle the visibility of the element

                toggleElementVisibility();

                break;

            

            case 'KeyF':

                event.preventDefault();

                // Toggle fullscreen when 'F' key is pressed

                toggleFullscreen();

                // Toggle the visibility of the element

                toggleElementVisibility();

                break;

            case 'BracketLeft':

                event.preventDefault();
                var currentSize = window.getComputedStyle(prompterContent).fontSize;
                var newSize = parseInt(currentSize) - 2;
                prompterContent.style.fontSize = newSize + 'px';

                sessionStorage.setItem('fontSize', newSize);

                break;

            case 'BracketRight':

                event.preventDefault();
                var currentSize = window.getComputedStyle(prompterContent).fontSize;
                var newSize = parseInt(currentSize) + 2;
                prompterContent.style.fontSize = newSize + 'px';

                sessionStorage.setItem('fontSize', newSize);

                break;

            case 'KeyP':

                event.preventDefault();
                prompterContainer.classList.toggle('lyricsPrompter');
                prompterContainer.classList.toggle('blackwhite');
                localStorage.setItem('prompterType', 'LYRICS_PROMPTER');

                break;

            case 'KeyS':
                openFontModal();
                break;
        }
    };

    function openFontModal() {
        document.getElementById("fontModal").style.display = "block";
    }

    function closeFontModal() {
        document.getElementById("fontModal").style.display = "none";
    }

    notEditable();
    function notEditable() {
        document.addEventListener('keydown', keydownListener);

    }

    function Editable() {
        document.getElementById('search-modal');
        document.removeEventListener('keydown', keydownListener);
    }


    //Keyboard Shortcuts
    var helpCard = document.getElementById("helpCard");

    // When the Tab key is pressed, show the modal
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            helpCard.style.display = "block";
            event.preventDefault();
        } else if (event.code === 'Pause') {
            if (prompterContent.contentEditable === "true") {
                prompterContent.contentEditable = "false";
                localStorage.setItem('formData', prompterContent.innerHTML);
                notEditable();
            } else {
                prompterContent.contentEditable = "true";
                Editable();
            }
            prompterContent.focus();

            event.preventDefault();
        } else if (event.code === 'PageUp') {
            showColorPicker();
            event.preventDefault();
        }
    });

        window.onclick = function (event) {
            if (event.target == document.getElementById("myModal")) {
                closeModal();
            }
        }

        // Close modal when clicking outside
        window.onclick = function (event) {
            if (event.target == document.getElementById("fontModal")) {
                closeFontModal();
            }
        }

    // When the Tab key is released, hide the modal
    window.addEventListener('keyup', function (event) {
        if (event.key === 'Tab') {
            helpCard.style.display = "none";
        }
    });

    //set COlor
    function showColorPicker() {
        var colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.addEventListener('change', function () {
            setColor(colorPicker.value);
        });
        colorPicker.click(); // Open color picker dialog
    }

    function setColor(color) {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, color);
    }

});
