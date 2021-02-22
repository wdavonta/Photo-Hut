const editBtn = document.getElementById("edit-profile");
const socialsSubmitBtn = document.querySelector(".editSocials-submit-btn");
const socialsEl = document.querySelectorAll('.socials-icon');
const input_urlEl = document.getElementById('editSocials-url')

async function updateDB() {
    const display_name = document.getElementById('display-name-edit').value.trim();
    const prof_pic = document.querySelector('.prof-pic').getAttribute('src');
    const bio = document.getElementById('bio-edit').value;
    const id = document.getElementById('display-name-edit').getAttribute('user_id');

    let instagram_url = null;
    let linkedin_url = null;
    let facebook_url = null;
    let twitter_url = null;

    const socials =   document.querySelectorAll(".socials-icon");
    for (social of socials) {
        const socialType = social.getAttribute("class").replace("socials-icon ","").replace("-icon","");
        const url = social.parentElement.getAttribute("href");
        switch (socialType) {
            case 'instagram':
                instagram_url = (url) ? url : null;
                break;
            case 'linkedIn':
                linkedin_url = (url) ? url : null;
                break;
            case 'facebook':
                facebook_url = (url) ? url : null;
                break;
            case 'twitter':
                twitter_url = (url) ? url : null;
                break;
        }
    };
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            display_name,
            prof_pic,
            bio,
            instagram_url,
            linkedin_url,
            facebook_url,
            twitter_url
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/profile/');
    } else {
        alert(response.statusText);
    }
    // reload page with new info
    document.location.reload();
}

const editSocialsHandler = () => {
    const input_url = input_urlEl.value;
    const socialType = socialsSubmitBtn.getAttribute("socialType");
    const linkParent = document.getElementsByClassName(`${socialType}-icon`)[0].parentElement;

    if (input_url) {
        // update current display
        linkParent.setAttribute("class","");
        linkParent.setAttribute("title",`Edit my ${socialType} URL`);
        linkParent.setAttribute("href",input_url);
        $('#editSocials').modal('hide');
    } else {
        alert('Data field cannot be empty');
    }
}

const loadSocialsModal = (event) => {
    event.preventDefault();

    const titleEl = document.getElementById("editSocials-title");
    const current_url = event.target.getAttribute('href');
    const socialType = event.target.getAttribute("class").replace("socials-icon ","").replace("-icon","");

    if (current_url) {
        titleEl.innerHTML = `Edit ${socialType} account`;
        input_urlEl.setAttribute("placeholder",current_url);
    } else {
        titleEl.innerHTML = `Link a ${socialType} account`;
        input_urlEl.setAttribute("placeholder",`https://[YOUR-${socialType}-URL]`);
    };
    socialsSubmitBtn.setAttribute("socialType",socialType);
    $('#editSocials').modal('show');
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
        // enable tooltips
        $(function () {$('[data-toggle="tooltip"]').tooltip()})
        // enable edit socials
        for (icon of socialsEl) {icon.parentElement.addEventListener('click', loadSocialsModal)};
    }
}

editBtn.addEventListener('click', toggleEditMode);
socialsSubmitBtn.addEventListener('click', editSocialsHandler);
