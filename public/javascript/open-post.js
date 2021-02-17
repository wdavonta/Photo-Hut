// grab id of post and go to that post with id
function sendToPost(e) {
    const id = e.target.closest('.photo-card').id;
    document.location.replace(`/photos/${id}`);
}

$('.photo-card').on('click', sendToPost);