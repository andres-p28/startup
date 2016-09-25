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
        this.cast = [];
    }

    addCast(actor) {
        this.cast = this.cast.concat(actor);
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

class Actor {
    constructor(fullname, age) {
        this.fullname = fullname;
        this.age = age;
    }
}


let hobbit = new Movie("El hobbit", 2012, 169);
let ian = new Actor("Ian McKellen", 77);
let otherCast = [new Actor("Martin Freeman", 45),
                 new Actor("Richard Armitage", 45),
                 new Actor("Sylvester McCoy", 71)
                ];


