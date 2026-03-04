# 🎬 ProjetCine - Application de Gestion de Films

Ce projet est une application web moderne développée avec **Angular 21**, permettant de consulter, gérer et administrer une bibliothèque de films. Il propose une interface utilisateur riche basée sur **PrimeNG** et **Bootstrap**.

## 🚀 Fonctionnalités Principales

### 🍿 Exploration des Films
- **Page d'accueil dynamique** : Un carrousel et une présentation attractive des films.
- **Catalogue de films** : Liste complète des films disponibles via `nos-films`.
- **Fiches détaillées** : Visualisation des informations spécifiques à chaque œuvre.

### 👤 Gestion des Utilisateurs
- **Authentification complète** : Systèmes d'inscription et de connexion sécurisés.
- **Espace Personnel** : Profil utilisateur permettant de gérer ses informations.
- **Gestion des Rôles** : Distinction entre les utilisateurs standards et les administrateurs.

### 🛡️ Administration (Panel Admin)
- **Tableau de bord** : Vue d'ensemble pour la gestion du contenu.
- **Gestion du catalogue** :
  - Ajouter de nouveaux films via un formulaire dédié.
  - Modifier les informations des films existants.
  - Supprimer des entrées de la base de données.
- **Gestion des utilisateurs** : Administration des comptes inscrits sur la plateforme.

### 🛠️ Composants & Services Techniques
- **Système de Notifications (Toast)** : Alertes visuelles pour confirmer les actions (succès/erreur).
- **Services API centralisés** : Communication optimisée avec le backend pour les films et les utilisateurs.
- **Routage Dynamique** : Navigation fluide entre les différentes sections de l'application.

## 🛠️ Stack Technique

- **Framework** : [Angular 21](https://angular.dev/)
- **UI & Style** : 
  - [PrimeNG](https://primeng.org/) (Composants UI avancés)
  - [Bootstrap 5](https://getbootstrap.com/) (Mise en page et utilitaires)
  - [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Langage** : TypeScript
- **Style** : SCSS

## 📂 Structure du Projet

```text
src/app/
├── account-user/    # Gestion du profil utilisateur
├── add-movie/       # Formulaire d'ajout de film
├── admin/           # Vues liées à l'administration
├── carousel/        # Composant carrousel d'images
├── edit-movie/      # Formulaire d'édition de film
├── home/            # Page d'accueil avec cartes de films
├── home-princpipal/ # Vue principale du catalogue
├── models/          # Définition des interfaces (Movie, User, Toast)
├── movies-list/     # Liste tabulaire des films
├── services/        # Services API (Auth, Movies, Users, Toast)
├── toast/           # Composant de notification
└── user/            # Inscription et Connexion
```

## ⚙️ Installation et Lancement

1.  **Cloner le dépôt** :
    ```bash
    git clone [url-du-depot]
    cd projetCine
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    npm start
    ```
    L'application sera accessible sur `http://localhost:4200/`.

4.  **Builder pour la production** :
    ```bash
    npm run build
    ```

## 📝 Scripts Disponibles

- `npm start` : Lance l'application en mode développement.
- `npm run build` : Compile le projet pour la mise en production.
- `npm test` : Exécute les tests unitaires (non implémenté).
