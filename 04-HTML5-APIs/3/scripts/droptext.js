let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let request = indexedDB.open("SavedText", 1);
let dataBase;

request.onerror = (error) => {
    console.log(error);
    alert("ERROR");
}

request.onupgradeneeded = (event) => { // If the DB doesn't exist create a new one and assign it to dataBase
    console.log("DB created");
    dataBase = event.target.result;
    dataBase.createObjectStore("text");
}

request.onsuccess = (event) => { // If the DB exist assign it to dataBase
    console.log("DB open");
    dataBase = event.target.result;
}

window.onload = () => {

    let saveButton = document.getElementById("saveButton");
    let clearButton = document.getElementById("clearButton");
    let textBox = document.getElementById("textBox");
    
    function saveTextLS () {
        let text = document.getElementById("textBox").value;
    
        localStorage.setItem("text", text);
    }

    function saveTextDB () {
        let text = textBox.value;
        let objectStore = dataBase.transaction(["text"], "readwrite").objectStore("text"); 
        let writeRequest = objectStore.put(text, "text");

        writeRequest.onerror = (error) => {console.log("Error ${error}")}
        writeRequest.onsucess = (event) => {console.log("Text saved!")}
    }

    function clearTextLS () {
        localStorage.clear()
    }

    function clearTextDB () {        
        let objectStore = dataBase.transaction(["text"], "readwrite").objectStore("text");
        objectStore.delete("text"); 
    }

    clearButton.addEventListener("click", clearTextLS);
    clearButton.addEventListener("click", clearTextDB);
    saveButton.addEventListener("click", saveTextLS);
    saveButton.addEventListener("click", saveTextDB);

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function drop(e) {
        let dt, files, reader;
        e.stopPropagation();
        e.preventDefault();

        dt = e.dataTransfer;
        files = dt.files;

        reader = new FileReader();

        reader.readAsText(files[0]);
        /* 
            Documentation refeer to the "loadend" event instead of the "onload" but when I try to use it I get no 
            response at all. Exists any differences between these two events?
        */
        reader.onload = (event) => { 
            let fileText = event.target.result;
            
            textBox.value = fileText;
        }
    }

    textBox.addEventListener("dragenter", dragenter, false);
    textBox.addEventListener("dragover", dragover, false);
    textBox.addEventListener("drop", drop, false);
}

