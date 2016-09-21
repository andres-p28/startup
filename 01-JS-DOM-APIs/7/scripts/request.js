/*
    config object = {
      method: 'GET' 'POST' 'PUT' 'DELETE'
      url: "url"
      args: parameters for GET and POST request;
    }
*/

function request(config) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        let uri = config.url;

        /* Enconde arguments in a query string and attach into the url */

        if (config.args && (method === 'POST' || method === 'PUT')) {
            uri += '?';
            let argcount = 0;
            let args = config.args;

            for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        req.open(config.method, uri);

        req.onload = function() {           // XMLHttpRequest transaction completes successfully.
            if (req.status == 200) {        // Check the status
                resolve(req.responseText);  // Resolve the promise with the response text
            }
            else { 
                reject(Error(req.statusText)); // Reject the promise with Error object and statusText for info
            }
        };

        req.onerror = function() {              // XMLHttpRequest transaction fails due to an error.
            reject(Error("Network Error"));
        };
        req.send(); // Make the request
  });
}

/* Testing re-implementing exercise 6 */

window.onload = function () {
    const myButton = document.getElementById("button");
    const myArticle = document.querySelector("#section article");
    const myHeader = document.querySelector("#section h2");
    let req_config = {method:'GET', url:"http://api.icndb.com/jokes/random"};

    myButton.addEventListener("click", fetchJoke);
}

function fetchJoke() {
    console.log(req_config);
    var prom = request(req_config); //Create a promise for the request

    prom.then(function(response) { //If the promise is fullfilled, parse JSON and update the article content
        console.log("Sucess");
        let text = JSON.parse(response);
        myHeader.textContent = "This section should show a joke now";   
        myArticle.textContent = text.value.joke;
        }, function(reason) { // If the promise is rejected, change the section color to red, and display an error msg
            document.getElementById("section").style.color = "red";
            console.log("Error",reason);
        });
}








