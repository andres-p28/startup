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
        var req = new XMLHttpRequest();
        var uri = config.url;

        /* Enconde arguments in a query string and attach into the url */

        if (config.args && (method === 'POST' || method === 'PUT')) {
            uri += '?';
            var argcount = 0;
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

const myButton = document.getElementById("button");
myButton.addEventListener("click", fetchJoke);

const myArticle = document.querySelector("#section article");
const myHeader = document.querySelector("#section h2");

let req_config = {method:'GET', url:"http://api.icndb.com/jokes/random"};

function fetchJoke() {
    console.log(req_config);
    var prom = request(req_config);

    prom.then(function(response) {
        console.log("Sucess");
        let text = JSON.parse(response);
        myHeader.innerHTML = "This section should show a joke now";   
        myArticle.innerHTML = text.value.joke;
        }, function(reason) {
            document.getElementById("section").style.color = "red";
            console.log("Error", reason);
        });
}








