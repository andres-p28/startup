function createRepoList(items) {
	const sectionList = document.getElementById("sectionList");
	const oldList = document.getElementById("list");
	const newList = document.createElement("ul");
	
	for (var i = 0; i < items.length; i++) {
		var text = items[i].full_name;
		var newItem = document.createElement("li");
		newItem.innerHTML = text;
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

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", search);

function search() {
	const searchBox = document.getElementById("searchBox");
	//console.log("https://api.github.com/search/repositories?q=" + searchBox.value);
	gbRequest(searchBox.value);
}


