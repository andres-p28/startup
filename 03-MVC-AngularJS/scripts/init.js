//init some values in localStorage

class Movie {
    constructor(title, year, duration) {
        this.title = title;
        this.year = year;
        this.duration = duration;
    }
}

let movieList_init = [new Movie("The Shawshank Redemption", 1994, 142),
                      new Movie("Inception", 2010, 148),
                      new Movie("The Hobbit: An Unexpected Journey", 2012, 169),
                      new Movie("Back to the Future", 1985, 116)
                      ];    

let data = localStorage.getItem("movieList");

if (data == null) {
    localStorage.setItem("movieList", JSON.stringify(movieList_init));    
}
else if (JSON.parse(data).length == 0) {
    localStorage.setItem("movieList", JSON.stringify(movieList_init));
}  
    