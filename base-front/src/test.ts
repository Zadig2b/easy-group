import 'zone.js/testing';
import {
  getTestBed
} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialiser l'environnement Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: true } }
);

// ✅ Chargement dynamique des .spec.ts
async function importAllTests() {
  const allSpecFiles = (import.meta as any).glob('./**/*.spec.ts');

  for (const path in allSpecFiles) {
    await allSpecFiles[path]();
  }
}

importAllTests();
