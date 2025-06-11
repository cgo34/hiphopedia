# Plateforme de Contenu Hip-Hop
Application web de streaming spécialisée dans le contenu hip-hop français, permettant de découvrir des artistes et leur contenu à travers différents formats vidéo.

## Types de Contenus
- 🎥 Clips
- 🎤 Interviews
- 📽️ Documentaires
- 📰 Reportages
- 🎬 Shorts

## Fonctionnalités Principales

### Gestion des Artistes
- Profils détaillés des artistes
- Catégorisation (rappeurs, producteurs, réalisateurs, etc.)
- Relations entre artistes (featuring, collaborations)

### Gestion des Vidéos
- Lecture vidéo optimisée
- Catégorisation par type
- Filtrage avancé
- Carousel de contenus
- Suggestions personnalisées

### Interface Utilisateur
- Design responsive
- Navigation fluide
- Composants réutilisables
- Thème sombre

## Architecture

### Structure du Projet
src/
├── core/                          # Cœur de l'application
│   ├── domain/                    # Entités et règles métier
│   │   ├── entities/             # Modèles de données
│   │   │   ├── Actor.ts
│   │   │   ├── Collection.ts
│   │   │   └── Video.ts
│   │   ├── interfaces/          # Contrats
│   │   │   ├── repositories/
│   │   │   └── services/
│   │   ├── errors/             # Gestion des erreurs
│   │   └── types/             # Types partagés
│   └── application/           # Logique applicative
│       ├── services/         # Services métier
│       └── mappers/         # Transformation de données
├── infrastructure/          # Couche technique
│   ├── repositories/       # Implémentation des repositories
│   │   ├── SupabaseVideoRepository.ts
│   │   └── SupabaseActorRepository.ts
│   └── database/          # Configuration base de données
└── ui/                    # Interface utilisateur
    ├── components/        # Composants Vue
    │   ├── shared/       # Composants génériques
    │   └── features/     # Composants métier
    ├── composables/      # Logique réutilisable
    │   ├── actors/
    │   └── videos/
    └── pages/            # Pages de l'application

## Technologies Utilisées
- Vue.js 3
- TypeScript
- Supabase
- InversifyJS (Injection de dépendances)
- Vuetify (UI Framework)

## Installation
```
npm install
```

### Démarrage en développement
```
npm run dev
```

### Build production
```
npm run build
```

## Points Forts
- Architecture Clean/Hexagonale
- Injection de dépendances
- Typage fort avec TypeScript
- Composants réutilisables
- Séparation des responsabilités

## Bonnes Pratiques
- SOLID Principles
- DRY (Don't Repeat Yourself)
- Composants atomiques
- Documentation du code

## License
MIT