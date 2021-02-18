const editBtn = document.getElementById("edit-profile");

async function updateDB() {
    const displayName = document.getElementById('display-name-edit').value.trim();
    const profPic = document.querySelector('.prof-pic').getAttribute('src');
    const bio = document.getElementById('bio-edit').value;

    if (displayName) {
        /*const response = await fetch('/api/users/PATH_TO_DB', {
            method: 'post',
            body: JSON.stringify({
                displayName,
                profPic,
                bio
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const response = {}

        if (response.ok) {
            document.location.replace('/profile/');
        } else {
            alert(response.statusText);
        }*/
    }
    // reload page with new info
    document.location.reload();
}

const toggleEditMode = () => {
    const editMode = editBtn.getAttribute('editMode');
    //get currently linked stylesheet
    const ss = document.getElementById("ss");
    console.log(ss);
    if (editMode) {
        // if editmode is currently true then 
        // all info should be posted to db which will trigger the page to reload and editmode will be automatically exited
        updateDB();
    } else {
        // if not currently in editmode, switch to edit mode stylesheet
        ss.setAttribute('href','/stylesheets/profile-edit.css');
        editBtn.firstChild.className = 'fas fa-save';
        editBtn.setAttribute('editMode','enabled');
    }
}

editBtn.addEventListener('click', toggleEditMode);

// originally from edit-photo.js
/*//middleware(control) file to help interactions for editing photo between server(model) and front end(view)
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="photo-title"]').value.trim();
    const photo_url = document.querySelector('input[name="photo-url"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/photos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        photo_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('.edit-photo-form').addEventListener('submit', editFormHandler);*/