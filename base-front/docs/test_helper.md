# ✅ Guide : Aide à la configuration des tests unitaires Angular (composants standalone)

## 🎯 Objectif

Ce document explique comment écrire des tests pour les composants `standalone` Angular 15+, avec un focus sur la configuration correcte de l’environnement de test (`TestBed`) pour éviter les erreurs courantes.

---

## 🧱 Structure de base recommandée

```ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MonComposant } from './mon-composant.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { GLOBAL_CONFIG } from 'src/app/config/global.config';

describe('MonComposant', () => {
  let fixture: ComponentFixture<MonComposant>;
  let component: MonComposant;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonComposant],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: GLOBAL_CONFIG, useValue: { appName: 'TestApp' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MonComposant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## 🧪 Cas particuliers à gérer

| Composant/Service utilisé | À ajouter dans le test |
|---------------------------|-------------------------|
| `HttpClient` (dans service ou composant) | `provideHttpClient()` |
| `Router` / `routerLink` / `router-outlet` | `provideRouter([])` |
| `inject(GLOBAL_CONFIG)` | `{ provide: GLOBAL_CONFIG, useValue: ... }` |
| `AuthService` / service custom | mocker avec `jasmine.createSpyObj(...)` |
| Sous-composants standalone | rien à faire s’ils sont dans `imports: [...]` |

---

## 🛑 Erreurs fréquentes & correctifs

| Erreur | Cause | Solution |
|-------|-------|----------|
| `No provider for HttpClient` | `HttpClient` utilisé sans provider | Ajouter `provideHttpClient()` |
| `No provider for Router` ou `ActivatedRoute` | Présence de `routerLink`, `Router`, ou `router-outlet` | Ajouter `provideRouter([])` |
| `No provider for InjectionToken global.config` | `inject(GLOBAL_CONFIG)` utilisé | Fournir le token avec `useValue` |
| `Unexpected value AuthService imported by module` | Service mis dans `imports` au lieu de `providers` | Retirer de `imports` et mocker dans `providers` |

---

## 🧠 Bonnes pratiques

- ✅ Utiliser `spyOn(...).and.returnValue(...)` pour les services comme `AuthService`, `ListService`, etc.
- ✅ Toujours typer les mocks pour éviter les erreurs `TS2345`
- ✅ Tester le `template` uniquement si tu veux valider un rendu HTML
- ✅ Ne jamais importer des services dans `imports: [...]`

---

## 🧰 Utilitaire recommandé

Créer un fichier `test.utils.ts` contenant :

```ts
export const mockGlobalConfig = {
  appName: 'EasyGroup',
};
```

Et utiliser dans les tests :

```ts
{ provide: GLOBAL_CONFIG, useValue: mockGlobalConfig }
```

---

## 📁 Où placer ce fichier

`/src/test_helper.md` ou `/docs/test_helper.md`
