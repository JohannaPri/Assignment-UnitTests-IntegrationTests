import { testData } from '../ts/services/__mocks__/movieService';
import * as movieService from '../ts/services/movieService';

// Mockar axios-biblioteket för att simulera HTTP-anrop
jest.mock('axios', () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      // Om URL:en slutar med 'error', avvisa promisen med ett fel
      if (url.endsWith('error')) {
        reject('error');
      } else {
        // Annars lös promisen med testdata
        resolve({ data: { Search: testData } });
      }
    });
  },
}));

// Testar att generera ett felmeddelande vid felaktig URL
test('it should generate error message', async () => {
  try {
    // Försöker hämta data med en URL som slutar med 'error'
    await movieService.getData('error');
  } catch (error: any) {
    // Kontrollera att felmeddelandet är korrekt
    expect(error.length).toBe(0);
    // Kontrollera att testdata är tomt
    expect(testData.length).toBe(0);
    // Kontrollera att testdatans första titel inte är 'Avatar'
    expect(testData[0].Title).not.toBe('Avatar');
  }
});

// Testar att hämta testdata med en korrekt URL
test('it should get test data', async () => {
  // Hämta data med en korrekt URL
  await movieService.getData('text');

  // kontrollera att testdata innehåller 3 filmer
  expect(testData.length).toBe(3);
  // Kontrollera att första filmens titel är 'Avatar'
  expect(testData[0].Title).toBe('Avatar');
  // Kontrollera att testdata inte är null
  expect(testData).not.toBe(null);
});
