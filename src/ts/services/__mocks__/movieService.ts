import { IMovie } from "../../models/Movie";

// Skapar testdata för filmer
export let testData: IMovie[] = [
    { 
      Title: "Avatar", 
      imdbID: "tt0499549", 
      Type: "movie", 
      Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg", 
      Year: "2009" 
    },
    { 
      Title: "The Matrix", 
      imdbID: "tt0133093", 
      Type: "movie", 
      Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", 
      Year: "1999" 
    },
    { 
      Title: "Harry Potter and the Prisoner of Azkaban", 
      imdbID: "tt0304141", 
      Type: "movie", 
      Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg", 
      Year: "2004" 
    },
];

// Asynkron funktion som returnerar testdata 
export const getData = async (): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    // Kontrollera om testData innehåller filmer
    if (testData.length > 0) {
      // Om testData innehåller filmer, returnera dom
      resolve(testData);
    } else {
      // Om testData är tom, visa ett felmeddelande
      reject("Couldn't find a match");
    }
  });
};