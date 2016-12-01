"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = exports.Actor = function Actor(fullname, age) {
    _classCallCheck(this, Actor);

    this.fullname = fullname;
    this.age = age;
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = exports.EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.events = new Map();
    }

    _createClass(EventEmitter, [{
        key: "on",
        value: function on(eventName, listener) {
            if (this.events.has(eventName)) {
                this.events.get(eventName).push(listener);
            } else {
                this.events.set(eventName, [listener]);
            }
        }
    }, {
        key: "emit",
        value: function emit(eventName, args) {
            var i = void 0;
            var listeners = this.events.get(eventName);
            for (i = 0; i < listeners.length; i++) {
                listeners[i]("The " + eventName + " has been emited", args);
            }
        }
    }, {
        key: "off",
        value: function off(eventName) {
            this.events.delete(eventName);
        }
    }]);

    return EventEmitter;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = exports.Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, [{
        key: "log",
        value: function log(info) {
            console.log(info);
        }
    }]);

    return Logger;
}();
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Movie = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class_eventemitter = require("./class_eventemitter.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Movie = exports.Movie = function (_EventEmitter) {
    _inherits(Movie, _EventEmitter);

    function Movie(title, year, duration) {
        _classCallCheck(this, Movie);

        var _this = _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).call(this));

        _this.title = title;
        _this.year = year;
        _this.duration = duration;
        _this.cast = [];
        return _this;
    }

    _createClass(Movie, [{
        key: "addCast",
        value: function addCast(actor) {
            this.cast = this.cast.concat(actor);
        }
    }, {
        key: "play",
        value: function play() {
            _get(Movie.prototype.__proto__ || Object.getPrototypeOf(Movie.prototype), "emit", this).call(this, "play");
        }
    }, {
        key: "pause",
        value: function pause() {
            _get(Movie.prototype.__proto__ || Object.getPrototypeOf(Movie.prototype), "emit", this).call(this, "pause");
        }
    }, {
        key: "resume",
        value: function resume() {
            _get(Movie.prototype.__proto__ || Object.getPrototypeOf(Movie.prototype), "emit", this).call(this, "resume");
        }
    }]);

    return Movie;
}(_class_eventemitter.EventEmitter);
"use strict";

var _class_logger = require("./class_logger.js");

var _class_movie = require("./class_movie.js");

var _class_actor = require("./class_actor.js");

function share(friendName) {
    var logger = new _class_logger.Logger();
    logger.log(friendName + " share " + this.title);
}

function like(friendName) {
    var logger = new _class_logger.Logger();
    logger.log(friendName + " likes " + this.title);
}

var terminator = new _class_movie.Movie('Terminator', 1984, 90);
var logger = new _class_logger.Logger();
terminator.on("play", logger.log);

var social = { share: share, like: like };

var ironman = new _class_movie.Movie("Iron Man", 2008, 126);

Object.assign(ironman, social);

var hobbit = new _class_movie.Movie("El hobbit", 2012, 169);
var ian = new _class_actor.Actor("Ian McKellen", 77);
var otherCast = [new _class_actor.Actor("Martin Freeman", 45), new _class_actor.Actor("Richard Armitage", 45), new _class_actor.Actor("Sylvester McCoy", 71)];
