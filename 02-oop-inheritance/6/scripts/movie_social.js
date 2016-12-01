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
            listeners[i](args);        
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

/*

Output must always be through a Logger object?

function share(friendName) {
    console.log(`${friendName} share ${this.title}`);
}

function like(friendName) {
    console.log(`${friendName} likes ${this.title}`);
}

*/

function share(friendName) {
    let logger = new Logger();
    logger.log(`${friendName} share ${this.title}`)
}

function like(friendName) {
    let logger = new Logger();
    logger.log(`${friendName} likes ${this.title}`)
}

let social = {share: share, like: like};

let ironman = new Movie("Iron Man", 2008, 126);

Object.assign(ironman, social);




