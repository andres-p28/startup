function createRepoList(items) {
    const sectionList = document.getElementById("sectionList");
    const oldList = document.getElementById("list");
    const newList = document.createElement("ul");
    let i;

    for (i = 0; i < items.length; i++) {
        let text = items[i].full_name;
        let newItem = document.createElement("li");
        newItem.textContent = text;
        newList.appendChild(newItem);
    }
    sectionList.replaceChild(newList, oldList);
    newList.setAttribute("id", "list");
}

function gbRequest(keywords) {
    let xhttp = new XMLHttpRequest();
    let resp = null;
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            createRepoList(resp.items);
        }
    };
    xhttp.open("GET", "https://api.github.com/search/repositories?q=" + keywords, true);
    xhttp.send();       
}

function search() {
    const searchBox = document.getElementById("searchBox");

    gbRequest(searchBox.value);
}

window.onload = function() {
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", search);
}






