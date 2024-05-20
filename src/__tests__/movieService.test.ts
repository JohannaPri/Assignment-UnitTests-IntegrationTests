import axios from 'axios';
import { getData } from '../ts/services/movieService';

// Mocka axios för att simulera anrop till Omdb API
jest.mock('axios');

describe('getData function', () => {
  test('it should return movie data when successful', async () => {
    // Mocka Axios get-funktionen för att returnera simulerad data
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: {
        Search: [
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
        ],
      },
    });

    // Anropa getData-funktionen med en söksträng
    const searchText = 'Avatar';
    const result = await getData(searchText);

    // Kontrollera att resultatet är en array av filmer
    expect(result).toEqual([
      {
        Title: 'Avatar',
        imdbID: 'tt0499549',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
        Year: '2009',
      },
      {
        Title: "The Matrix",
        imdbID: "tt0133093",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        Year: "1999",
      },
    ]);

    // Kontrollera att axios.get har anropats med rätt URL
    expect(axios.get).toHaveBeenCalledWith(
      `http://omdbapi.com/?apikey=416ed51a&s=${searchText}`
    );
  });

  test('it should return an empty array when an error occurs', async () => {
    // Mocka Axios get-funktionen för att simulera ett fel
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(
      new Error('Network Error')
    );

    // Anropa getData-funktionen med en söksträng
    const searchText = 'Avatar';
    const result = await getData(searchText);

    // Kontrollera att resultatet är en tom array
    expect(result).toEqual([]);

    // Kontrollera att axios.get har anropats med rätt URL
    expect(axios.get).toHaveBeenCalledWith(
      `http://omdbapi.com/?apikey=416ed51a&s=${searchText}`
    );
  });
});