import { testData } from "../ts/services/__mocks__/movieService";
import * as movieService from "../ts/services/movieService";

// Mockar axios-biblioteket för att simulera API-anrop
jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      // Returnerar ett fel om URL:en slutar på 'error'
      if (url.endsWith("error")) {
        reject("error");
        // Returnerar tom data om URL:en slutar på 'empty'
      } else if (url.endsWith("empty")) {
        resolve({ data: { Search: [] } });
        // Returnerar testData för alla andra URL:er
      } else {
        resolve({ data: { Search: testData } });
      }
    });
  },
}));

// Testsvit för funktionerna i MovieService 
describe("MovieService", () => {
  test("it should generate error message", async () => {
    try {
      await movieService.getData("error");
    } catch (error: any) {
      expect(error).toBe("error");
    }
  });

  test("it should get test data", async () => {
    const data = await movieService.getData("test");
    // Kontrollera att tre filmer returneras
    expect(data.length).toBe(3);
    // Kontrollera att första filmen är 'Avatar'
    expect(data[0].Title).toBe("Avatar");
    // Kontrollera att data inte är null
    expect(data).not.toBe(null);
  });

  test("it should handle empty data response", async () => {
    const data = await movieService.getData("empty");
    // Kontrollera att inga filmer returneras 
    expect(data.length).toBe(0);
  });

  test("it should not throw error for valid request", async () => {
    const data = await movieService.getData("valid");
    // Kontrollera att data är definierad
    expect(data).toBeDefined();
    // Kontrollera att data är en array
    expect(Array.isArray(data)).toBe(true);
  });
});
