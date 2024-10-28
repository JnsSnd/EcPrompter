let tabCount = 1; // Tracks the number of tabs
let currentTab = 0; // Tracks the currently active tab
let currentWindow = null; // Tracks the currently opened receiving window

// Initialize the first tab on page load
document.addEventListener('DOMContentLoaded', initTabs);

function initTabs() {
    createTabButton(0, 'Tab 1'); // Creates the first tab button
    setupOriginalTabContent(); // Sets up the default original content for the first tab
    switchTab(0); // Displays the first tab by default
}

// Function to create a new tab button
function createTabButton(index, title) {
    const tabBar = document.getElementById('tab-bar');
    const tabButton = document.createElement('button');
    tabButton.className = 'tab';
    tabButton.textContent = title;
    tabButton.addEventListener('click', () => switchTab(index)); // Switches to this tab on click
    
    // Add rename functionality
    tabButton.addEventListener('dblclick', () => renameTab(index, tabButton)); // Rename on double-click

    tabBar.insertBefore(tabButton, document.getElementById('add-tab-button')); // Inserts before the "Add" button
}

// Function to rename a tab
function renameTab(index, tabButton) {
    const newName = prompt('Enter new name for the tab:', tabButton.textContent);
    if (newName) {
        tabButton.textContent = newName; // Update the tab button text
    }
}

// Function to set up the original content for the first tab
function setupOriginalTabContent() {
    const container = document.getElementById('tab-content-container');
    const originalContent = document.createElement('div');
    originalContent.className = 'tab-content';
    originalContent.id = 'tab-content-0';

    // Set the original HTML content for the first tab
    originalContent.innerHTML = `
        <div class="container" id="text-area-container-0">
            <div class="text-area-set">
                <button class="remove-set-button" onclick="removeSet(this)">X</button>
                <div class="text-area">
                    <textarea placeholder="Text Area 1"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
                <div class="text-area">
                    <textarea placeholder="Text Area 2"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
                <div class="text-area">
                    <textarea placeholder="Text Area 3"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
                <div class="text-area">
                    <textarea placeholder="Text Area 4"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
            </div>
            <button class="add-set-button" onclick="addNewSet(0)">Add another set</button>
        </div>
    `;

    container.appendChild(originalContent);
}

// Function to create content for a new tab, following the same structure
function createTabContent(index) {
    const container = document.getElementById('tab-content-container');
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.id = `tab-content-${index}`;

    tabContent.innerHTML = `
        <div class="container" id="text-area-container-${index}">
            <div class="text-area-set">
                <button class="remove-set-button" onclick="removeSet(this)">X</button>
                <div class="text-area">
                    <textarea placeholder="Text Area 1"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
                <div class="text-area">
                    <textarea placeholder="Text Area 2"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
                <div class="text-area">
                    <textarea placeholder="Text Area 3"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
                <div class="text-area">
                    <textarea placeholder="Text Area 4"></textarea>
                    <button class="prompt-button" onclick="handlePrompt(this)">Prompt</button>
                </div>
            </div>
            <button class="add-set-button" onclick="addNewSet(${index})">Add another set</button>
        </div>
    `;

    container.appendChild(tabContent); // Adds the content to the container
}

// Function to switch between tabs
function switchTab(index) {
    const allTabs = document.querySelectorAll('.tab');
    const allContents = document.querySelectorAll('.tab-content');

    allTabs.forEach((tab, idx) => tab.classList.toggle('active', idx === index));
    allContents.forEach((content, idx) => {
        content.classList.toggle('active', idx === index); // Use class toggle instead of inline styles
    });

    currentTab = index; // Update the currently active tab
}

// Add a new tab on "Add Tab" button click
document.getElementById('add-tab-button').addEventListener('click', () => {
    tabCount++;
    createTabButton(tabCount - 1, `Tab ${tabCount}`);
    createTabContent(tabCount - 1); // Creates new tab content
    switchTab(tabCount - 1); // Switches to the newly created tab
});

// Function to add a new set of text areas to a specific container
function addNewSet(tabIndex) {
    const container = document.getElementById(`text-area-container-${tabIndex}`);
    const setDiv = document.createElement('div');
    setDiv.className = 'text-area-set';

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-set-button';
    removeButton.innerText = 'X';
    removeButton.onclick = () => container.removeChild(setDiv); // Removes the set on click

    setDiv.appendChild(removeButton);

    for (let i = 1; i <= 4; i++) {
        const textAreaDiv = document.createElement('div');
        textAreaDiv.className = 'text-area';

        const textArea = document.createElement('textarea');
        textArea.placeholder = `Text Area ${container.children.length * 4 + i}`;

        const promptButton = document.createElement('button');
        promptButton.className = 'prompt-button';
        promptButton.innerText = 'Prompt';
        promptButton.onclick = () => handlePrompt(promptButton);

        textAreaDiv.appendChild(textArea);
        textAreaDiv.appendChild(promptButton);
        setDiv.appendChild(textAreaDiv);
    }

    container.appendChild(setDiv);
}

// Function to open or update prompt window
function handlePrompt(button) {
    const textAreaContent = button.previousElementSibling.value;
    const encodedContent = encodeURIComponent(textAreaContent);

    if (currentWindow && !currentWindow.closed) {
        currentWindow.location.href = `view.html?content=${encodedContent}`;
    } else {
        currentWindow = window.open(`view.html?content=${encodedContent}`, '_blank', 'width=800,height=600');
        currentWindow.focus();
    }

    updateButtonColors(button);
}

// Update button colors based on usage
function updateButtonColors(activeButton) {
    document.querySelectorAll('.prompt-button').forEach(button => {
        button.style.backgroundColor = button === activeButton ? 'red' : 'green';
    });
}

// Function to remove a set of text areas
function removeSet(button) {
    const setDiv = button.parentElement; // Get the parent div of the button
    const container = setDiv.parentElement; // Get the parent container of the set
    container.removeChild(setDiv); // Remove the set from the container
}
