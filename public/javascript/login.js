//middleware(control) file to help interactions for login between server(model) and front end(view)
async function loginFormHandler(event) {
    console.log('login clicked')
        event.preventDefault();
    
        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();
    
        if (email && password) {
            const response = await fetch('/api/users/login', {
                method: 'post',
                body: JSON.stringify({
                email,
                password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        
            if (response.ok) {
                document.location.replace('/profile/');
                //document.location.replace('/api/users/session');
            } else {
                alert(response.statusText);
            }
        }
    }
  
document.querySelector(".login-form").addEventListener('submit', loginFormHandler);
  