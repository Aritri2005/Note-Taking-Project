const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');

let isEditing = false; 

showNotes();

function addNotes() {
    
    if (isEditing) {
        return;
    }

    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    if (addText.value == '') {
        alert('Add your note');
        return;
    }

    const noteObj = {
        title: addTitle.value,
        text: addText.value,
    };
    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function showNotes() {
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    for (let i = 0; i < notes.length; i++) {
        notesHTML += `
            <div class="note">
                <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                <button class="editNote" id="edit-${i}" onclick="editNote(${i})">Edit</button>
                <span class="title"><strong style="font-size: 20px;">${notes[i].title === "" ? 'Note' : notes[i].title}</strong></span>
                <div class="text">${notes[i].text}</div>
            </div>
        `;
    }
    notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function editNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }

    
    addTitle.value = notes[ind].title;
    addText.value = notes[ind].text;

    
    addNoteButton.textContent = "Update";
    isEditing = true;

    
    addNoteButton.onclick = function () {
        updateNote(ind);
    };
}

function updateNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }

    
    notes[ind].title = addTitle.value;
    notes[ind].text = addText.value;

    
    localStorage.setItem('notes', JSON.stringify(notes));

   
    addTitle.value = '';
    addText.value = '';
    addNoteButton.textContent = "Add"; 
    addNoteButton.onclick = addNotes; 
    isEditing = false;

    showNotes(); 
}

addNoteButton.addEventListener('click', addNotes);
const themeToggle = document.getElementById('themeToggle');


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('bright-mode');
    themeToggle.textContent = 
        document.body.classList.contains('bright-mode') 
        ? 'Switch to Dark Mode' 
        : 'Switch to Bright Mode';
});


 
