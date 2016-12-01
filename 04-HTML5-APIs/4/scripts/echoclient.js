let webURI = "ws://echo.websocket.org"
let webSocket = new WebSocket(webURI);

let close = () => {
    webSocket.close();
}

webSocket.onopen = () => {
    console.log("CONNECTION OPEN -- TYPE echo('msg') TO SEND A MSG");
}

webSocket.onerror = (e) => {
    console.log("error ${e}");
}

webSocket.onmessage = (e) => {console.log(`<! ${e.origin} !> : ${e.data}`)}

webSocket.onclose = () => {
    console.log("CONNECTION TO ${webURI} (ex)TERMINATED");
}

function echo(msg) {
    webSocket.send(msg);
}