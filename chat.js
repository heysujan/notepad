let notes = [];


function saveNote() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput.trim() !== '') {
        notes.push(noteInput);
        document.getElementById('noteInput').value = '';
        displayNotes();
    }
}

function displayNotes() {
    const conversationsList = document.querySelector('.conversations');
    conversationsList.innerHTML = ''; 

    notes.forEach((note, index) => {
        const newConversation = document.createElement('ul'); 
        newConversation.classList.add('conversations'); 
        const conversationItem = document.createElement('li');
        const conversationButton = document.createElement('button'); 
        conversationButton.classList.add('conversation-button'); 
        const conversationIcon = document.createElement('i'); 
        conversationIcon.classList.add('fa', 'fa-message', 'fa-regular'); 
        const noteContent = document.createElement('div'); 
        noteContent.textContent = `${index + 1}. ${note}`; 
        const fadeDiv = document.createElement('div'); 
        fadeDiv.classList.add('fade');
        const editButtons = document.createElement('div'); 
        editButtons.classList.add('edit-buttons'); 
        const formatSelect = document.createElement('select');
        formatSelect.id = `formatSelect_${index}`; 
        const txtOption = document.createElement('option'); 
        txtOption.value = 'txt';
        txtOption.textContent = 'TXT';
        const htmlOption = document.createElement('option'); 
        htmlOption.value = 'html'; 
        htmlOption.textContent = 'HTML';
        const cssOption = document.createElement('option');
        cssOption.value = 'css';
        cssOption.textContent = 'CSS'; 
        const jsOption = document.createElement('option'); 
        jsOption.value = 'js'; 
        jsOption.textContent = 'JS'; 
        const downloadButton = document.createElement('button'); 
        downloadButton.addEventListener('click', () => downloadNote(index)); 
        const downloadIcon = document.createElement('i'); 
        downloadIcon.classList.add('fa-solid', 'fa-download');

        downloadButton.appendChild(downloadIcon);
        editButtons.appendChild(formatSelect);
        editButtons.appendChild(downloadButton);
        formatSelect.appendChild(txtOption);
        formatSelect.appendChild(htmlOption);
        formatSelect.appendChild(cssOption);
        formatSelect.appendChild(jsOption);
        conversationButton.appendChild(conversationIcon);
        conversationButton.appendChild(noteContent);
        conversationItem.appendChild(conversationButton);
        conversationItem.appendChild(fadeDiv);
        conversationItem.appendChild(editButtons);
        newConversation.appendChild(conversationItem);
        
        conversationsList.appendChild(newConversation); 
    });
}

function downloadNote(index) {
    const selectedFormat = document.getElementById(`formatSelect_${index}`).value;
    let noteContent = notes[index];
    let fileName = `note_${index}`;

    switch (selectedFormat) {
        case 'txt':
            fileName += '.txt';
            break;
        case 'html':
            fileName += '.html';
            noteContent = `<html><head><title>Note ${index + 1}</title></head><body>${noteContent}</body></html>`;
            break;
        case 'css':
            fileName += '.css';
            break;
        case 'js':
            fileName += '.js';
            break;
        default:
            console.error('Invalid format');
            return;
    }

    downloadFile(noteContent, 'text/plain', fileName);
}


function downloadFile(content, contentType, fileName) {
    const blob = new Blob([content], { type: contentType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

document.getElementById("noteInput").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) { 
        event.preventDefault(); 
        saveNote(); 
    }
});
const sidebar = document.querySelector("#sidebar");
const hide_sidebar = document.querySelector(".hide-sidebar");

hide_sidebar.addEventListener( "click", function() {
    sidebar.classList.toggle( "hidden" );
} );

const user_menu = document.querySelector(".user-menu ul");
const show_user_menu = document.querySelector(".user-menu button");

show_user_menu.addEventListener( "click", function() {
    if( user_menu.classList.contains("show") ) {
        user_menu.classList.toggle( "show" );
        setTimeout( function() {
            user_menu.classList.toggle( "show-animate" );
        }, 200 );
    } else {
        user_menu.classList.toggle( "show-animate" );
        setTimeout( function() {
            user_menu.classList.toggle( "show" );
        }, 50 );
    }
} );

const models = document.querySelectorAll(".model-selector button");

for( const model of models ) {
    model.addEventListener("click", function() {
        document.querySelector(".model-selector button.selected")?.classList.remove("selected");
        model.classList.add("selected");
    });
}

const message_box = document.querySelector("#message");

message_box.addEventListener("keyup", function() {
    message_box.style.height = "auto";
    let height = message_box.scrollHeight + 2;
    if( height > 200 ) {
        height = 200;
    }
    message_box.style.height = height + "px";
});

function show_view( view_selector ) {
    document.querySelectorAll(".view").forEach(view => {
        view.style.display = "none";
    });

    document.querySelector(view_selector).style.display = "flex";
}
