const clientId = '546c25a59c58ad7';

function uploading(event) {
    const input = event.target;
    $("#imgUploading").html("");
    $("#imgUploading").append("<img src='"+URL.createObjectURL(input.files[0])+"' style='max-width:200px'>");
}

function submitHandler(event) {
    event.preventDefault();

    // Begin file upload
    console.log('Uploading file to Imgur..');
    // uploaded file element
    const imgEl = $("#photo-url")[0];
    // const title element value
    const title = $('#photo-title').val();

    // form data for file upload
    let formData = new FormData();
    
    // make sure files were uploaded first
    if (imgEl.files[0]) {
        // add to form data
        formData.append("image", imgEl.files[0]);
        formData.append("title", title);
        formData.append('type', 'file'); 
    }

    // Now send it
    fetch("https://api.imgur.com/3/image", {
        method: 'POST',
        headers: {
            Authorization: 'Client-ID ' + clientId
        },
        body: formData
    }).then(response => {
        console.log(response);

        if(response.ok) {
            alert('Image uploaded to album');       
            response.json().then(function(res) {
                // get title, link from imgur of img, and id of img on imgur(to store for edit/delete). Send to photo api
                //addPhotoToDb(title, res.data.link, res.data.id);
            });
        }
    }).catch(error => {
        console.error(error);
    });
}


async function addPhotoToDb(title, link, id) {  
    const response = await fetch('/api/photos/', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        photo_url: link,
        imgur_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
        document.location.replace(`/profile/`);
    } else {
      alert(response.statusText);
    }
}
// submit listener
$("#upload-photo").on("submit", submitHandler);
// img upload listener
$("#photo-url").on("change", uploading);

