document.addEventListener("DOMContentLoaded", function () {
    const prompterContainer = document.getElementById("bgPrompter");
    const prompterContent = document.getElementById("prompter-content");
    const playPauseKey = 'Space';
    let scrollingNow = false;
    let animationLoop;
    let fontSize;

    // Set the initial default theme
    //LYRICS_PROMPTER for bg, any string for B&W
    localStorage.setItem('prompterType', 'ANYTHING_ELSE');

    let scrollPosition = 0;
    prompterContent.style.top = scrollPosition + "px";
    let scrollSpeed = 0.5;

    function scrollScript() {
        scrollPosition -= scrollSpeed;
        prompterContent.style.top = scrollPosition + "px";
        animationLoop = requestAnimationFrame(scrollScript);
    }
    
    function playPauseScroll() {
        if (scrollingNow) pauseScroll();
        else playScroll();
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
        var computedStyle = window.getComputedStyle(prompterContent);
        fontSize = computedStyle.getPropertyValue('font-size');
    }

    function toggleFullscreen() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement) exitFullscreen();
        else requestFullscreen();
    }

    function requestFullscreen() {
        const body = document.documentElement;

        if (body.requestFullscreen) body.requestFullscreen();
        else if (body.webkitRequestFullscreen) body.webkitRequestFullscreen();
        else if (body.mozRequestFullscreen) body.mozRequestFullscreen();
    }

    function exitFullscreen() {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullscreen) document.mozCancelFullscreen();
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
            case 'F11': case 'KeyF':
                event.preventDefault();
                toggleFullscreen();
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
                break;
            case 'Minus':
                event.preventDefault();
                decreasePadding();
                break;
            case 'Equal':
                event.preventDefault();
                increasePadding();
                break;
        }
    };

    //Padding
    //Constants should be temporary, make it adjust to the resolution of the user's screen
    const minWidth = 800;
    function decreasePadding() {
        let currentWidth = parseInt(window.getComputedStyle(prompterContent).width, 10);
        if (currentWidth - 50 >= minWidth) prompterContent.style.width = (currentWidth - 50) + "px";
    }

    const maxWidth = 2000;
    function increasePadding() {
        let currentWidth = parseInt(window.getComputedStyle(prompterContent).width, 10);
        if (currentWidth + 50 <= maxWidth) prompterContent.style.width = (currentWidth + 50) + "px";
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
        } else if (event.code === 'PageUp' && prompterContent.contentEditable === "true") {
            showColorPicker();
            event.preventDefault();
        } else if (event.code === 'PageDown' && prompterContent.contentEditable === "true") {
            showColorPresets();
            event.preventDefault();
        }
    });

    window.addEventListener('keyup', function (event) {
        if (event.key === 'Tab') {
            helpCard.style.display = "none";
        }
    });

    //Colors
    function showColorPicker() {
        var colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.addEventListener('change', function (){setColor(colorPicker.value);});
        colorPicker.click(); 
    }

    function showColorPresets() {
        if (document.getElementById("colorPickerPopup")) return;
    
        const colorPickerPopup = document.createElement("div");
        colorPickerPopup.id = "colorPickerPopup";
    
        //Add your colors here
        const colors = ["#ffffff", "#000000", "#ffff00", "#ff00ff", "#ff0000"];
        colors.forEach(color => {
            const colorButton = document.createElement("button");
            colorButton.style.backgroundColor = color;
            colorButton.classList.add("colorButton");
            colorButton.onclick = () => {
                setColor(color);
                closeColorPresets();
            };
            colorPickerPopup.appendChild(colorButton);
        });
    
        document.body.appendChild(colorPickerPopup);
    
        document.addEventListener("click", function handleOutsideClick(event) {
            if (!colorPickerPopup.contains(event.target)) {
                closeColorPresets();
                document.removeEventListener("click", handleOutsideClick);
            }
        });
    }
    
    function closeColorPresets() {
        const colorPickerPopup = document.getElementById("colorPickerPopup");
        if (colorPickerPopup) document.body.removeChild(colorPickerPopup);
    }

    function setColor(color) {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, color);
        if (window.getSelection) window.getSelection().removeAllRanges();
        else if (document.selection) document.selection.empty();
    }
});
