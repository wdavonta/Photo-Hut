//middleware(control) file to help interactions for deleting photo between server(model) and front end(view)
async function deleteFormHandler(event) {
    event.preventDefault();
    const id = event.target.getAttribute("photo_id");

    const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

const deleteBtnsEl = document.querySelectorAll('.delete-photo');
for (btn of deleteBtnsEl) {btn.addEventListener('click', deleteFormHandler)};