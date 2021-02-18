const readmore = document.querySelector('#readmore-link');

const expand = () => {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const readmoreLink = document.getElementById("readmore-link");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        readmoreLink.innerHTML = "Read more"; 
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        readmoreLink.innerHTML = "Read less"; 
        moreText.style.display = "inline";
    }
}

readmore.addEventListener('click', expand);