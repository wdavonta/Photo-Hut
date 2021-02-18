const readmore = document.querySelector('#readmore-link');
const editBtn = document.getElementById("edit-profile");

/* const getBio = (bio_html) => {
    let bioStr = String;
    const bioArr = bio_html.split('>');
    if (bioArr[1]) {
        bioStr = bioArr[1].split('<')[0].concat(bioArr[4].split('<')[0]);
    } else {
        bioStr = bioArr.toString();
    }

    return bioStr
} */

const expand = () => {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const readmoreLink = document.getElementById("readmore-link");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        readmoreLink.innerHTML = "Read more"; 
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        readmoreLink.innerHTML = "Read less"; 
        moreText.style.display = "inline";
    }
}

async function updateDB() {
    const displayName = document.getElementById('display-name-edit').value.trim();
    const profPic = document.querySelector('.prof-pic').getAttribute('src');
    const bio = document.getElementById('bio-edit').value;

/*     console.log({
        displayName,
        profPic,
        bio
    }); */

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
    const profileHTML = document.querySelector('.profile');
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

readmore.addEventListener('click', expand);
editBtn.addEventListener('click', toggleEditMode)