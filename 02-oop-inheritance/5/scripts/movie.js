class EventEmitter {
    constructor() {
        this.events = new Map(); 
    }

    on (eventName, listener) {
        if (this.events.has(eventName)) {
            this.events.get(eventName).push(listener);
        }
        else {
            this.events.set(eventName, [listener]);
       
        }
    }

    emit(eventName, args) {
        let i;
        const listeners = this.events.get(eventName);
        for (i = 0; i < listeners.length; i++) {
            listeners[i]((`The ${eventName} has been emited`), args);        
        }
    }

    off(eventName) {
        this.events.delete(eventName);
    }
}


class Movie extends EventEmitter {
    constructor(title, year, duration) {
        super();
        this.title = title;
        this.year = year;
        this.duration = duration;
    }

    play() {
        super.emit("play");
    }

    pause() {
        super.emit("pause");

    }
    resume() {
        super.emit("resume");
    }
}

class Logger {
    log(info) {
        console.log(info);
    }
}


let terminator = new Movie('Terminator', 1984, 90);
let logger = new Logger();
//terminator.on("play", logger.log);
//terminator.play();



