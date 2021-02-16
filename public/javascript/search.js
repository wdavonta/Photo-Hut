var userSearchEl = $("#user-search");

// Array for users suggestions
var users = [];


// fetch list of users to add to suggestion (CALLS SUGGEST user)
async function fetchUsers() {
    const response = await fetch('/api/users/', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
        const data = await response.json();
        suggestUser(data); // populate suggestions
    } else {
        alert(response.statusText);
    }
}

var submitHandler = function(event) {
    // prevent from refreshing page
    event.preventDefault();

    // check if user entered exists
    if(!userSearchEl.val() || !users.includes(userSearchEl.val())) {
        $(userSearchEl)
            .val("")
            .attr("placeholder", "User not found, try another search");
        return;
    } else {
        console.log('user exsits');
    }
}

// push data from api/db to users array for suggestion
var suggestUser = function(data) {
    console.log(data);
    data.forEach(element => {
        users.push(element.username);
    });
}

// show/hide search field
function toggleSearch() {
    console.log("clicked");
    if($("#searchForm").hasClass("visible")) {
        $("#searchForm").removeClass("visible");
    } else {
        $("#searchForm").addClass("visible");
    }
}

// auto complete users search
userSearchEl.autocomplete({ 
    source: users,
    appendTo: "#suggestions-wrapper",
    autoFocus: true
});

// submit listener
$("#search-form").on("submit", submitHandler);
// Search btn clicked
$("#searchBtn").on("click", toggleSearch);
userSearchEl.on("focusout", toggleSearch);

fetchUsers();

