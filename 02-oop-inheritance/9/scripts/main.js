import { Logger } from "./class_logger.js"
import { Movie } from "./class_movie.js"
import { Actor } from "./class_actor.js"

function share(friendName) {
    let logger = new Logger();
    logger.log(`${friendName} share ${this.title}`)
}

function like(friendName) {
    let logger = new Logger();
    logger.log(`${friendName} likes ${this.title}`)
}


let terminator = new Movie('Terminator', 1984, 90);
let logger = new Logger();
terminator.on("play", logger.log);

let social = {share: share, like: like};

let ironman = new Movie("Iron Man", 2008, 126);

Object.assign(ironman, social);

let hobbit = new Movie("El hobbit", 2012, 169);
let ian = new Actor("Ian McKellen", 77);
let otherCast = [new Actor("Martin Freeman", 45),
                 new Actor("Richard Armitage", 45),
                 new Actor("Sylvester McCoy", 71)
                ];