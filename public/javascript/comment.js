//middleware(control) file to help interactions for making a comment between server(model) and front end(view)
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const photo_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          photo_id,
          comment_text
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
  }
  
function commentToggle() {
  var $form = $('.comment-form');
  var $commentBtn = $('#commentBtn');

  if ($form.hasClass('show')) {
    $form.removeClass('show');
    $commentBtn.addClass('show');

  } else {
    $form.addClass('show');
    $commentBtn.removeClass('show');
  }
}

  $('.comment-form').on('submit', commentFormHandler);
  $('.commentToggle').on('click', commentToggle);
  

  