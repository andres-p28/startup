function sectionFadein() {
    let mySection = document.getElementById("helloworld-section");
    if(mySection.getAttribute("class") === 'hidden') {
        console.log("Section class change to visible");
        mySection.setAttribute("class","visible");
    }
}

document.addEventListener("DOMContentLoaded", sectionFadein);



