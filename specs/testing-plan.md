# Plan de Tests Unitaires - Emotive Portfolio

## 1. Objectifs
- Assurer la non-régression visuelle et fonctionnelle des pages principales.
- Valider le rendu des composants critiques (Sections, Bento Grid).
- Automatiser l'exécution des tests via CI (GitHub Actions).

## 2. Stack Technique
- **Framework de Test**: `Jest`
    - Standard de l'industrie, rapide, excellente intégration avec Next.js.
- **Utilitaires de Test**: `React Testing Library (RTL)`
    - Favorise les tests centrés sur l'utilisateur (testez ce que l'utilisateur voit, pas l'implémentation interne).
- **Environnement**: `jsdom`
    - Simule un navigateur pour les tests React.
- **CI**: `GitHub Actions`
    - Workflow automatisé à chaque push/PR.

## 3. Structure des Fichiers
Nous placerons les tests dans un dossier `__tests__` à la racine pour séparer clairement le code source des tests, ou co-localisés si vous préférez. Pour ce projet, `__tests__` à la racine est recommandé pour Next.js App Router.

Structure proposée :
```
.
├── __tests__
│   ├── pages
│   │   └── home.test.tsx    # Test de la page d'accueil
│   └── components
│       ├── Hero.test.tsx
│       ├── Tools.test.tsx
│       └── ...
├── jest.config.ts           # Configuration Jest
└── jest.setup.ts            # Configuration globale (extends expect)
```

## 4. Stratégie de Test

### 4.1. Page d'Accueil (`src/app/page.tsx`)
- **Smoke Test**: Vérifier que la page se monte sans erreur.
- **Contenu Statique**: Vérifier la présence des sections principales (Hero, A propos, Projets, etc.).
- **SEO**: Vérifier que le titre et les méta-données sont générés (si testable unitairement via les fonctions de métadata, sinon test E2E plus tard).

### 4.2. Sections (`src/components/sections/*`)
Pour chaque section (Hero, Tools, etc.) :
- Vérifier que le composant s'affiche.
- Vérifier la présence des titres clés (h1, h2).
- Vérifier que les éléments interactifs (boutons, cartes) sont présents dans le DOM.

> **Note sur GSAP/Animations** : Les tests unitaires (JSDOM) ne gèrent pas bien les calculs de layout réels ou les transitions complexes. Nous mockerons GSAP si nécessaire pour éviter des faux positifs ou des ralentissements, et nous nous concentrerons sur la présence *structurelle* des éléments.

## 5. Workflow CI (GitHub Actions)
Création d'un fichier `.github/workflows/test.yml` :
- Déclencheur : `push` et `pull_request` sur la branche principale.
- Job :
    - Checkout du code.
    - Installation de Node.js (v20+).
    - Installation des dépendances (`npm ci`).
    - Exécution des tests (`npm test`).

## 6. Prochaines Étapes (Action Plan)
1.  **Installation** : Installer les dépendances (`jest`, `@testing-library/react`, etc.).
2.  **Configuration** : Créer `jest.config.ts` et `jest.setup.ts`.
3.  **Implémentation** : Écrire le premier test pour la Home Page.
4.  **Extension** : Écrire les tests pour les Sections.
5.  **CI** : Configurer GitHub Actions.
