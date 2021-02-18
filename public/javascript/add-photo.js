const submitBtn = document.querySelector(".photo-submit-btn");
const modalTriggers = document.querySelectorAll('.photoUpload');

const photoSubmitHandler = () => {
    if (submitBtn.getAttribute('isProf') == 'true') {
        updateProfPic()
    } else {
        addPhoto()
    }
}

async function updateProfPic() {
    const photo_url = document.getElementById('modal-photo-url').value;

    if (photo_url) {
    // update currently displayed img
    document.querySelector(".prof-pic").setAttribute('src', photo_url);
    $('#photoUpload').modal('hide');
    // update db NEEDS TO BE UPDATED
    /*const response = await fetch(`/api/profile`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            photo_url
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }*/
    } else {
        alert('Data field cannot be empty');
    }
}

async function addPhoto() {
    //event.preventDefault();
    const title = document.getElementById('modal-photo-title').value;
    const photo_url = document.getElementById('modal-photo-url').value;
    
    if (title && photo_url) {
        const response = await fetch(`/api/photos`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                photo_url
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Data fields cannot be empty');
    }
}

const loadModal = (event) => {
    const titleEl = document.getElementById("photo-upload-title");
    const photoTarget = event.target;

    if (photoTarget.id.search('prof')>0) {
        titleEl.innerHTML = 'Link New Profile Picture';
        submitBtn.setAttribute('isProf', true);
        document.getElementById("modal-title-form-group").className += " hide";
    } else {
        titleEl.innerHTML = 'Add New Photo';
        submitBtn.setAttribute('isProf', false);
    }
}

for (mt of modalTriggers) {mt.addEventListener('click', loadModal)};
submitBtn.addEventListener('click', photoSubmitHandler);