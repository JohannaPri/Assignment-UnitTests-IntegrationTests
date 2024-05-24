import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";

describe("movieSort", () => {
  // En array med filmer att använda i testfallen
  const movies: IMovie[] = [
    {
      Title: "Avatar",
      imdbID: "tt0499549",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
      Year: "2009",
    },
    {
      Title: "The Matrix",
      imdbID: "tt0133093",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      Year: "1999",
    },
    {
      Title: "Harry Potter and the Prisoner of Azkaban",
      imdbID: "tt0304141",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
      Year: "2004",
    },
  ];

  // Rensa alla mockfunktioner innan varje test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("it should sort movies in descending order", () => {
    const sortedMovies = movieSort([...movies], true);
    // Kontrollerar att de sorterade filmerna innehåller rätt ordning och attribut
    expect(sortedMovies).toEqual(
      expect.arrayContaining([
        {
          Title: "The Matrix",
          imdbID: "tt0133093",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          Year: "1999",
        },
        {
          Title: "Harry Potter and the Prisoner of Azkaban",
          imdbID: "tt0304141",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
          Year: "2004",
        },
        {
          Title: "Avatar",
          imdbID: "tt0499549",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          Year: "2009",
        },
      ])
    );
  });

  test("it should sort movies in ascending order", () => {
    const sortedMovies = movieSort([...movies], false);
    expect(sortedMovies).toEqual(
      expect.arrayContaining([
        {
          Title: "Avatar",
          imdbID: "tt0499549",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          Year: "2009",
        },
        {
          Title: "Harry Potter and the Prisoner of Azkaban",
          imdbID: "tt0304141",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
          Year: "2004",
        },
        {
          Title: "The Matrix",
          imdbID: "tt0133093",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          Year: "1999",
        },
      ])
    );
  });

  test("it should handle movies with equal titles and desc is true", () => {
    const equalTitleMovies = [
      {
        Title: "Avatar",
        imdbID: "tt0499549",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        Year: "2009",
      },
      {
        Title: "Avatar",
        imdbID: "tt0133093",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        Year: "1999",
      },
      {
        Title: "Avatar",
        imdbID: "tt0304141",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
        Year: "2004",
      },
    ];
    
    const sortedMovies = movieSort(equalTitleMovies, true);

    expect(sortedMovies).toEqual(
      expect.arrayContaining([
        {
          Title: "Avatar",
          imdbID: "tt0499549",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          Year: "2009",
        },
        {
          Title: "Avatar",
          imdbID: "tt0304141",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
          Year: "2004",
        },
        {
          Title: "Avatar",
          imdbID: "tt0133093",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          Year: "1999",
        },
      ])
    );
  });

  test("it should handle movies with equal titles and desc is false", () => {
    const equalTitleMovies = [
      {
        Title: "Avatar",
        imdbID: "tt0499549",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        Year: "1999",
      },
      {
        Title: "Avatar",
        imdbID: "tt0133093",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        Year: "2004",
      },
      {
        Title: "Avatar",
        imdbID: "tt0304141",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
        Year: "2009",
      },
    ];

    const sortedMovies = movieSort(equalTitleMovies, false);

    expect(sortedMovies).toEqual(
      expect.arrayContaining([
        {
          Title: "Avatar",
          imdbID: "tt0499549",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          Year: "1999",
        },
        {
          Title: "Avatar",
          imdbID: "tt0133093",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          Year: "2004",
        },
        {
          Title: "Avatar",
          imdbID: "tt0304141",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
          Year: "2009",
        },
      ])
    );
  });

  test("it should handle movies with equal data", () => {
    const equalData = [
      {
        Title: "Avatar",
        imdbID: "tt0499549",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        Year: "2009",
      },
      {
        Title: "Avatar",
        imdbID: "tt0499549",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        Year: "2009",
      },
      {
        Title: "Avatar",
        imdbID: "tt0499549",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        Year: "2009",
      },
    ];

    const sortedMovies = movieSort(equalData);

    expect(sortedMovies).toEqual(
      expect.arrayContaining([
        {
          Title: "Avatar",
          imdbID: "tt0499549",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          Year: "2009",
        },
        {
          Title: "Avatar",
          imdbID: "tt0499549",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          Year: "2009",
        },
        {
          Title: "Avatar",
          imdbID: "tt0499549",
          Type: "movie",
          Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          Year: "2009",
        },
      ])
    );
  });
});
