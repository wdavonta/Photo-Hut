//middle ware to update the user profile information
async function updateDisplayName(event) {
    event.preventDefault();
   //the name for the queryselector can be changed and is just a place holder.
    const display_name = document.getElementById("display_name").value.trim();
    //const instagram_url = document.querySelector('input[name="instagram-url"]').value.trim();
    //const linkedin_url = document.querySelector('input[name="linkedin-url"]').value.trim();
   // const facebook_url = document.querySelector('input[name="facebook-url"]').value.trim();
    //const twitter_url = document.querySelector('input[name="twitter-url"]').value.trim();
    const id = document.getElementById("display_name").getAttribute("user_id");
    


    if (display_name ) {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    
    /*
    if (instagram_url) {
      const response = await fetch(`/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (linkedin_url ) {
      const response = await fetch(`/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    if (facebook_url ) {
      const response = await fetch(`/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (twitter_url ) {
      const response = await fetch(`/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
         display_name
        }),
        headers: { 'Content-Type': 'application/json' }
      });*/
       
      if (response.ok) {

        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
   
  
  
  document.querySelector('.edit-user-form').addEventListener('submit', updateDisplayName);
