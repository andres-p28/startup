
window.onload = function() {
    const myButton = document.getElementById("button");
    myButton.addEventListener("click", fetchJoke);
}

function fetchJoke() {
    let xhttp = new XMLHttpRequest();
    let resp = null;
    const myArticle = document.querySelector("#helloworld-section article");
    const myHeader = document.querySelector("#helloworld-section h2");

    //Request joke
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = JSON.parse(this.responseText);
            myHeader.textContent = "This section should show a joke now"   
            myArticle.textContent = resp.value.joke;
        }
    };
    xhttp.open("GET", "http://api.icndb.com/jokes/random", true);
    xhttp.send();       
}

