const socialsSubmitBtn = document.querySelector(".editSocials-submit-btn");
const socialsEl = document.querySelectorAll('.socials-icon');
const input_urlEl = document.getElementById('editSocials-url')

const editSocialsHandler = () => {
    const input_url = input_urlEl.value;
    const socialType = socialsSubmitBtn.getAttribute("socialType");
    const linkParent = document.getElementsByClassName(`${socialType}-icon`)[0].parentElement;

    if (input_url) {
        // update current display
        linkParent.setAttribute("class","");
        linkParent.setAttribute("title",`Edit my ${socialType} URL`);
        linkParent.setAttribute("href",input_url);
        $('#editSocials').modal('hide');
    } else {
        alert('Data field cannot be empty');
    }
}

const loadSocialsModal = (event) => {
    event.preventDefault();

    const titleEl = document.getElementById("editSocials-title");
    const current_url = event.target.getAttribute('href');
    const socialType = event.target.getAttribute("class").replace("socials-icon ","").replace("-icon","");

    if (current_url) {
        titleEl.innerHTML = `Edit ${socialType} account`;
        input_urlEl.setAttribute("placeholder",current_url);
    } else {
        titleEl.innerHTML = `Link a ${socialType} account`;
        input_urlEl.setAttribute("placeholder",`https://[YOUR-${socialType}-URL]`);
    };
    socialsSubmitBtn.setAttribute("socialType",socialType);
    $('#editSocials').modal('show');
}

for (icon of socialsEl) {icon.parentElement.addEventListener('click', loadSocialsModal)};
socialsSubmitBtn.addEventListener('click', editSocialsHandler);