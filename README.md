# AgroSuivi - Frontend

Cette partie présente le travail réalisé sur la partie frontend du projet (Hamza).

## Stack utilisée

HTML, CSS et JavaScript pour le frontend, sans framework. Suffisant pour ce qu'on avait à faire et plus rapide à mettre en place qu'un projet React ou Vue.

Pour communiquer avec le backend, j'utilise l'API fetch.

## Choix techniques

**Pourquoi pas de framework JS (React, Vue, Angular) ?**
Utiliser un framework aurait rajouté de la complexité pour pas grand chose, surtout en 3 jours. Le JavaScript natif suffit pour gérer les appels API et la manipulation du DOM (récupérer les éléments avec `getElementById` et modifier leur contenu pour afficher les données).

**Pourquoi pas de framework CSS (Bootstrap, Tailwind) ?**
Pour garder le contrôle sur le rendu et avoir un design qui se démarque. Avec Bootstrap, on aurait eu un site qui ressemble à beaucoup d'autres. En écrivant le CSS à la main, j'ai pu créer un style "bento sombre" qui correspond à ce que je voulais.

**Pourquoi un seul fichier CSS pour toutes les pages ?**
Les pages partagent beaucoup d'éléments (sidebar, cartes, badges, formulaires). Faire un fichier par page aurait créé des doublons partout. Avec un seul fichier, je modifie la sidebar une fois et ça met à jour les 4 pages.

**Pourquoi un seul breakpoint pour le responsive ?**
On a deux usages principaux : PC et téléphone. Un breakpoint à 768px gère les deux. Pas besoin d'en mettre 3 ou 4 pour ce projet.

## Les pages

L'application contient 4 pages :

- **index.html** : le tableau de bord avec les chiffres clés (parcelles, météo, alertes, observations)
- **parcelles.html** : la liste des parcelles sous forme de cartes, avec filtres
- **observations.html** : un formulaire pour saisir une observation et la liste des observations passées
- **alertes.html** : la liste des alertes triées par niveau

Toutes les pages partagent la même sidebar à gauche pour la navigation.

## Structure des fichiers

```
templates/
  index.html
  parcelles.html
  observations.html
  alertes.html

static/
  css/
    style.css
  js/
    dashboard.js
    parcelles.js
    observations.js
    alertes.js
```

## Le design

J'ai voulu sortir du style "tout vert" qu'on voit habituellement sur les outils agricoles. J'ai choisi un thème sombre avec des couleurs vives (vert citron, orange) pour faire ressortir les informations importantes.

Couleurs principales :
- Fond : `#0F1410`
- Cartes : `#1A211D`
- Vert citron : `#C5F558` (statut OK)
- Orange : `#F5A65B` (alertes moyennes)
- Rouge : `#E04545` (alertes critiques)

La police utilisée est Arial. Elle est installée par défaut sur tous les systèmes et reste lisible partout.

## Communication avec le backend

Tous les fichiers JS commencent par cette ligne qui définit l'URL du backend :

```javascript
var serveur = "https://...";
```

Si l'URL change, il suffit de la modifier ici.

Pour les appels fetch, j'ai dû ajouter un header particulier à cause de ngrok :

```javascript
fetch(serveur + "/api/parcelles", {
    headers: { "ngrok-skip-browser-warning": "true" }
})
```

Sans ce header, ngrok renvoyait une page HTML d'avertissement au lieu du JSON, et tout plantait. J'ai mis du temps à comprendre d'où ça venait.

Une fois les données reçues du backend, je modifie le DOM pour les afficher. Par exemple sur le dashboard, après avoir récupéré le nombre de parcelles :

```javascript
document.getElementById("nb-parcelles").textContent = data.nb_parcelles;
```

Pour les listes (alertes, observations, parcelles), je construis le HTML dans une variable et je l'injecte avec `innerHTML` dans le bon conteneur.

## Responsive

J'ai mis une media query à 768px pour gérer le mobile. Sur petit écran :
- la sidebar passe en haut
- les grilles passent en une seule colonne
- les tailles de police sont réduites

## Fonctionnalités implémentées

- Affichage en temps réel des données depuis le backend
- Saisie d'une nouvelle observation (formulaire qui envoie en POST)
- Filtre des observations par parcelle
- Filtre des parcelles par état
- Compteurs automatiques sur la page Alertes selon le niveau

## Fonctionnalités non implémentées

- Pas de page de connexion (on a préféré se concentrer sur les fonctionnalités principales)
- Pas de création de parcelle depuis l'interface (on a privilégié la saisie d'observation, qui sert plus au quotidien)
- Pas de carte avec la localisation des parcelles

## Lancement du projet

1. Vérifier que le backend tourne (demander l'URL à jour si besoin)
2. Mettre à jour l'URL dans les fichiers JS si elle a changé
3. Installer l'extension Live Server dans VS Code
4. Clic droit sur `templates/index.html` puis "Open with Live Server"

L'application s'ouvre dans le navigateur.

## Améliorations possibles côté frontend

- Ajouter une carte avec Leaflet pour voir les parcelles sur un plan
- Faire des graphiques sur l'évolution des observations dans le temps
- Ajouter une page de connexion utilisateur
