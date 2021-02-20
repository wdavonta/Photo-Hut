//tells if someone is logged in or not and redirects logged out people to log in or sign up
const withAuth = (req, res, next) => {
    console.log(`===========with auth=============
Logged in: ${req.session.loggedIn}`);
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        console.log("MAX AGE IS " + req.session.cookie.expires);
        next();
    }
};
  
module.exports = withAuth;
  