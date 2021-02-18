//middleware(control) file to help interactions for making a photo between server(model) and front end(view)
const submitBtn = document.querySelector(".photo-submit-btn");

const photoSubmitHandler = () => {
    submitBtn.getAttribute('isProf') ? addPhoto() : updateProfPic();
}

async function updateProfPic() {
    console.log('updating prof pic')
}

async function addPhoto() {
    //event.preventDefault();
    const title = document.getElementById('modal-photo-title').value;
    const photo_url = document.getElementById('modal-photo-url').value;
  
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
}

const loadModal = (event) => {
    const titleEl = document.getElementById("photo-upload-title");
    const photoTarget = event.target;

    if (photoTarget.id.search('prof')>0) {
        titleEl.innerHTML = 'Link New Profile Picture';
        submitBtn.setAttribute('isProf', true);
    } else {
        titleEl.innerHTML = 'Add New Photo';
        submitBtn.setAttribute('isProf', false);
    }
}

const modalTriggers = document.querySelectorAll('.photoUpload');
for (mt of modalTriggers) {mt.addEventListener('click', loadModal)};
submitBtn.addEventListener('click', photoSubmitHandler);