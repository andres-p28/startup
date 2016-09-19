let mySection = document.getElementById("section");

function sectionFadein() {
	if(mySection.getAttribute("class") == "hidden") {
		console.log("Section class change to visible");
		mySection.setAttribute("class","visible");
	}
}

document.addEventListener("DOMContentLoaded", sectionFadein);

