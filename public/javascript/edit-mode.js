const editBtn = document.getElementById("edit-profile");

async function updateDB() {
    const display_name = document.getElementById('display-name-edit').value.trim();
    const prof_pic = document.querySelector('.prof-pic').getAttribute('src');
    const bio = document.getElementById('bio-edit').value;
    const id = document.getElementById('display-name-edit').getAttribute('user_id');

    if (display_name) {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                display_name,
                prof_pic,
                bio
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile/');
        } else {
            alert(response.statusText);
        }
    }
    // reload page with new info
    document.location.reload();
}

const toggleEditMode = () => {
    const editMode = editBtn.getAttribute('editMode');
    //get currently linked stylesheet
    const ss = document.getElementById("ss");
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