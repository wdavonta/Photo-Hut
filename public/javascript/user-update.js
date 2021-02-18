//middle ware to update the user profile information
async function updateDisplayName(event) {
    event.preventDefault();
   //the name for the queryselector can be changed and is just a place holder.
    const display_name = document.querySelector('input[name="display-name"]').value.trim();
    const instagram_url = document.querySelector('input[name="instagram-url"]').value.trim();
    const linkedin_url = document.querySelector('input[name="linkedin-url"]').value.trim();
    const facebook_url = document.querySelector('input[name="facebook-url"]').value.trim();
    const twiter_url = document.querySelector('input[name="twiter-url"]').value.trim();
    

    if (display_name ) {
      const response = await fetch('/update', {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (instagram_url) {
      const response = await fetch('/update', {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (linkedin_url ) {
      const response = await fetch('/update', {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    if (facebook_url ) {
      const response = await fetch('/update', {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (twiter_url ) {
      const response = await fetch('/update', {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }   
      if (response.ok) {

        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  }
   
  
  
  document.querySelector('.edit-user-form').addEventListener('submit', updateDisplayName);
