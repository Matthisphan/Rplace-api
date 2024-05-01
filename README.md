# Projet Rplace - Documentation API

Ce projet consiste en un backend pour l'application Rplace. Il gère les opérations liées à l'enregistrement et à l'authentification des utilisateurs, ainsi que la manipulation de la grille dynamique.

## Fonctionnalités

- Enregistrement des utilisateurs
- Authentification des utilisateurs
- Gestion de la grille dynamique

## Prérequis

Avant de lancer le backend de l'application, assurez-vous d'avoir Node.js et npm installés sur votre machine. Vous devez également avoir un serveur MongoDB en cours d'exécution ou un accès à un service MongoDB (par exemple, MongoDB Atlas).

## Installation

1. **Clonez ce dépôt sur votre machine :**

    ```bash
    git clone https://github.com/votre-utilisateur/Rplace-backend.git
    ```

2. **Accédez au répertoire du projet :**

    ```bash
    cd Rplace-api
    ```

3. **Installez les dépendances :**

    ```bash
    npm install
    ```

4. **Créez un fichier `.env` dans le répertoire racine du projet et définissez les variables d'environnement suivantes :**

    ```dotenv
    PORT=5000
    MONGODB_URI=URL_de_votre_base_de_données_MongoDB
    JWT_SECRET=Votre_clé_secrète_pour_les_tokens_JWT
    ```

## Lancement du serveur

1. **Démarrez le serveur :**

    ```bash
    npm start
    ```

    Le serveur démarrera sur le port spécifié dans votre fichier `.env`.

## Routes API

### Enregistrement d'un utilisateur

- **URL :** POST `/api/register`
- **Description :** Permet à un utilisateur de s'enregistrer avec un nom d'utilisateur et un mot de passe.
- **Paramètres du corps :**
  - `username` : Nom d'utilisateur
  - `password` : Mot de passe
- **Réponse réussie :** `201 Created`
- **Réponse en cas d'échec :** `400 Bad Request`, `500 Internal Server Error`

### Connexion d'un utilisateur

- **URL :** POST `/api/login`
- **Description :** Permet à un utilisateur de se connecter avec son nom d'utilisateur et son mot de passe.
- **Paramètres du corps :**
  - `username` : Nom d'utilisateur
  - `password` : Mot de passe
- **Réponse réussie :** `200 OK` (avec un jeton JWT dans le corps de la réponse)
- **Réponse en cas d'échec :** `404 Not Found` (si l'utilisateur n'existe pas), `401 Unauthorized` (si le mot de passe est incorrect), `500 Internal Server Error`

### Déconnexion d'un utilisateur

- **URL :** POST `/api/logout`
- **Description :** Permet à un utilisateur de se déconnecter en effaçant son jeton JWT.
- **Paramètres de l'en-tête :** `Authorization: Bearer VOTRE_JETON_JWT`
- **Réponse réussie :** `200 OK`
- **Réponse en cas d'échec :** `404 Not Found` (si l'utilisateur n'existe pas), `500 Internal Server Error`

### Sauvegarde de la grille

- **URL :** POST `/api/grid`
- **Description :** Permet de sauvegarder la grille dynamique dans la base de données.
- **Paramètres du corps :**
  - `row` : Tableau représentant la grille dynamique
- **Paramètres de l'en-tête :** `Authorization: Bearer VOTRE_JETON_JWT`
- **Réponse réussie :** `201 Created`
- **Réponse en cas d'échec :** `500 Internal Server Error`

### Récupération de la grille

- **URL :** GET `/api/grid`
- **Description :** Permet de récupérer la grille dynamique stockée dans la base de données.
- **Paramètres de l'en-tête :** `Authorization: Bearer VOTRE_JETON_JWT`
- **Réponse réussie :** `200 OK` (avec la grille dynamique dans le corps de la réponse)
- **Réponse en cas d'échec :** `404 Not Found`, `500 Internal Server Error`

---

Ce document a été créé par [Matthis PHAN](https://github.com/Matthisphan).
