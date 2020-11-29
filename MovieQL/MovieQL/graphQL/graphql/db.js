/*
const people = [
    {
    id: "1",
    name: "hong",
    age: 25,
    gender: "male"
    },
    {
    id: "2",
    name: "hong",
    age: 25,
    gender: "male"
    },
    {
    id: "3",
    name: "hong",
    age: 25,
    gender: "male"
    },
    {
    id: "4",
    name: "hong",
    age: 25,
    gender: "male"
    }
];
*/

let movies = [
    {
        id: 0,
        name: "Star Wars - The new one",
        score: 7
    },
    {
        id: 1,
        name: "Avengers - The new one",
        score: 8
    },
    {
        id: 2,
        name: "The Godfather I",
        score: 9
    },
    {
        id: 3,
        name: "Logan",
        score: 2
    }
];

export const getMovies = () => movies;

export const getById = id => {
    const filterMovies = movies.filter(movie => movie.id === id);
    return filterMovies[0];
}

export const deleteMovie = (id) => {
    const cleanedMovies = movies.filter(movie => movie.id !== id);
    if(movies.length > cleanedMovies.length) {
        movies = cleanedMovies;
        return true;
    } else {
        return false;
    }
};

export const addMovie = (name, score) => {
    const newMovie = {
        id: `${movies.length + 1}`,
        name,
        score
    };
    movies.push(newMovie);
    return newMovie;
}

/*
export const getById = id => {
    const filteredpeople = people.filter(person => person.id === String(id));
    return filteredpeople[0];
};
*/