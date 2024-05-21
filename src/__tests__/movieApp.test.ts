import { IMovie } from "../ts/models/Movie";
import { createHtml, displayNoResult, handleSubmit, init} from "../ts/movieApp";
import { getData } from "../ts/services/movieService";

// Mockar getData-funktionen från movieService
jest.mock("../ts/services/movieService", () => ({
  getData: jest.fn(),
}));

// Omvandlar getData till en mock-funktion för testning
const mockGetData = getData as jest.MockedFunction<typeof getData>;

describe("handleSubmit", () => {
  let searchText: HTMLInputElement;
  let movieContainer: HTMLDivElement;
  let form: HTMLFormElement;

  beforeEach(() => {
    // Ställer in HTML-strukturen innan varje test
    document.body.innerHTML = `
      <form id="searchForm">
        <input id="searchText" type="text" />
        <button type="submit">Search</button>
      </form>
      <div id="movie-container"></div>
    `;

    // Initierar form-elementen
    searchText = document.getElementById("searchText") as HTMLInputElement;
    movieContainer = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    form = document.getElementById("searchForm") as HTMLFormElement;

    // Mockar formulärets submit-händelse för att anropa handleSubmit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSubmit();
    });

    // Anropar init-funktionen för att ställa in event-lyssnare
    init();
  });

  test("it should display movies when getData returns results", async () => {
    // Förbereder mock-data för getData
    const movies: IMovie[] = [
      {
        Title: "Avatar",
        imdbID: "tt0499549",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        Year: "2009",
      },
    ];
    mockGetData.mockResolvedValueOnce(movies);
    searchText.value = "Avatar";

    // Skickar in förmuläret
    form.dispatchEvent(new Event("submit"));

    // Väntar på den asynkrona funktionen
    await new Promise(process.nextTick);

    // Verifierar att filmerna visas korrekt
    expect(movieContainer.innerHTML).toContain("Avatar");
    expect(movieContainer.querySelector("img")?.src).toBe(
      "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
    );
  });

  test("it should display no result message when getData returns no results", async () => {
    // Förbereder mock för tomt resultat
    mockGetData.mockResolvedValueOnce([]);
    searchText.value = "NonExistentMovie";

    // Skickar in formuläret
    form.dispatchEvent(new Event("submit"));

    // Väntar på den asynkrona funktionen
    await new Promise(process.nextTick);

    // Verifierar att inget resultat-meddelande visas
    expect(movieContainer.innerHTML).toContain("Inga sökresultat att visa");
  });

  test("it should display no result message when getData throws an error", async () => {
    // Förbereder mock för felhantering
    mockGetData.mockRejectedValueOnce(new Error("API error"));
    searchText.value = "ErrorMovie";

    // Skickar in formuläret
    form.dispatchEvent(new Event("submit"));

    // Väntar på den asynkrona funktionen
    await new Promise(process.nextTick);

    // Verifierar att inget resultat-meddelande visas
    expect(movieContainer.innerHTML).toContain("Inga sökresultat att visa");
  });
});

describe("createHtml", () => {
  test("it should correctly append movie elements to container", () => {
    // Skapar en container-div
    const container = document.createElement("div");
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

    // Anropar createHTML-funktionen
    createHtml(movies, container);

    // Verifierar att filmelementen har lagts till korrekt i containern
    expect(container.innerHTML).toContain("Avatar");
    expect(container.querySelector("img")?.src).toBe(
      "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
    );
  });
});

describe("displayNoResult", () => {
  test("it should correctly display no result message", () => {
    // Skapar en container-div
    const container = document.createElement("div");

    // Anropar displayNoResult-funktionen
    displayNoResult(container);

    // Verifierar att inget resultat-meddelande visas på ett korrekt sätt
    expect(container.innerHTML).toContain("Inga sökresultat att visa");
  });
});