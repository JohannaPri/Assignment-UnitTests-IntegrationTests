import { testData } from "../ts/services/__mocks__/movieService";
import * as movieService from "../ts/services/movieService";

// Mockar axios-biblioteket för att simulera API-anrop
jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (url.endsWith("error")) {
        reject("error");
      } else if (url.endsWith("empty")) {
        resolve({ data: { Search: [] } });
      } else {
        resolve({ data: { Search: testData } });
      }
    });
  },
}));
 
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
    expect(data.length).toBe(3);
    expect(data[0].Title).toBe("Avatar");
    expect(data).not.toBe(null);
  });

  test("it should handle empty data response", async () => {
    const data = await movieService.getData("empty"); 
    expect(data.length).toBe(0);
  });

  test("it should not throw error for valid request", async () => {
    const data = await movieService.getData("valid");
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
  });
});
