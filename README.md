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


# AgroSuivi - Backend

Cette partie présente le travail réalisé sur la partie backend du projet (Moha).

## Stack utilisée

Python avec Flask pour le backend, MySQL comme base de données. La communication avec le frontend se fait via une API REST qui renvoie du JSON.

## Choix techniques

**Pourquoi Flask et pas Django ?**
Django aurait été trop lourd pour ce qu'on avait à faire. Flask permet de monter une API rapidement avec seulement ce dont on a besoin. En 3 jours, la simplicité prime. On définit une route, une fonction, et c'est parti.

**Pourquoi Python et pas PHP ?**
Python était le langage le plus maîtrisé pour la partie backend dans notre groupe. Flask est aussi bien documenté et les bibliothèques pour manipuler des données (notamment pour l'import CSV) sont très pratiques.

**Pourquoi une API REST et pas des pages serveur ?**
Le frontend est géré par Hamza en HTML/CSS/JS pur. Il était plus propre de séparer complètement les deux : Flask s'occupe des données, le frontend s'occupe de l'affichage. Chacun travaille de son côté sans bloquer l'autre.

**Pourquoi mysql-connector et pas SQLAlchemy ?**
SQLAlchemy aurait rajouté une couche d'abstraction inutile. On connaît SQL, on écrit nos requêtes directement. C'est plus lisible et plus facile à déboguer.

## Structure des fichiers

```
agri-B2/
├── app.py                  # Point d'entrée, création de l'app Flask
├── db.py                   # Connexion MySQL réutilisable
├── import_csv.py           # Script d'import des fichiers CSV
├── routes/
│   ├── parcelles.py        # Routes CRUD parcelles
│   ├── cultures.py         # Routes CRUD cultures
│   ├── observations.py     # Routes CRUD observations
│   └── alertes.py          # Génération des alertes
├── requirements.txt
└── .env                    # Variables d'environnement (non versionné)
```

## Les routes

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/parcelles` | Liste toutes les parcelles |
| GET | `/api/parcelles/<id>` | Détail d'une parcelle |
| POST | `/api/observations` | Ajoute une observation |
| GET | `/api/observations` | Liste les observations (filtrable par parcelle) |
| GET | `/api/alertes` | Retourne les alertes actives |
| GET | `/api/dashboard` | Données résumées pour le tableau de bord |

## Les alertes

Les alertes sont générées côté backend à partir des données d'observation. Les règles appliquées :

- Température > 35°C → alerte chaleur
- Humidité < 20% → alerte sécheresse
- Précipitations < seuil défini par culture → alerte irrigation

Ces règles sont définies dans `routes/alertes.py`. Si une observation dépasse un seuil, une alerte est créée en base et renvoyée au frontend.

## Installation

```bash
git clone <url-du-repo>
cd agri-B2
pip install -r requirements.txt
cp .env.example .env   # renseigner les valeurs
python app.py
```

Par défaut, le serveur tourne sur `http://localhost:5000`.

## Variables d'environnement

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agri_db
```

Ce fichier n'est pas versionné (présent dans `.gitignore`).

## Import des données CSV

```bash
python import_csv.py
```

Les fichiers CSV doivent être placés dans un dossier `data/` à la racine.

## Fonctionnalités implémentées

- API REST complète pour les parcelles, observations et alertes
- Gestion des CORS pour permettre les appels depuis le frontend (ngrok compris)
- Génération automatique des alertes à chaque nouvelle observation
- Import des CSV de départ
- Endpoint `/api/dashboard` qui agrège les données pour la page d'accueil

## Fonctionnalités non implémentées

- Pas d'authentification (on a préféré se concentrer sur le cœur métier)
- Pas de pagination sur les listes (volume de données limité pour le projet)
- Pas de websocket pour les alertes en temps réel

## Améliorations possibles

- Ajouter un système de connexion avec JWT
- Mettre en place une tâche planifiée pour vérifier les alertes automatiquement
- Ajouter des prévisions météo via une API externe

---

# AgroSuivi - Base de données

Cette partie présente le travail réalisé sur la modélisation et la gestion de la base de données du projet (Amine).

## Stack utilisée

MySQL comme système de gestion de base de données. La BDD tourne sur la VM Linux mise en place par Mellina.

## Choix techniques

**Pourquoi MySQL et pas PostgreSQL ou MongoDB ?**
MySQL est le SGBD qu'on maîtrise le mieux dans le groupe. Il s'intègre bien avec Python/Flask via mysql-connector. Pour un projet comme le nôtre avec des données structurées et des relations claires, une base relationnelle s'imposait naturellement.

**Pourquoi normaliser jusqu'en 3NF ?**
On a voulu éviter les redondances dès le départ. Par exemple, une culture n'est pas dupliquée dans chaque observation : on stocke uniquement son identifiant. Ça simplifie les mises à jour et évite les incohérences.

**Pourquoi des clés étrangères avec contraintes ?**
Pour garantir l'intégrité des données. Si une parcelle est supprimée, ses observations le sont aussi automatiquement (CASCADE). Ça évite des données orphelines qui pollueraient les résultats.

## Schéma de la base

La base contient 5 tables principales :

- **parcelles** : identifiant, nom, superficie, localisation, culture associée
- **cultures** : identifiant, nom, seuils (température, humidité, précipitations)
- **observations** : date, parcelle, température, humidité, précipitations, notes
- **alertes** : date, parcelle, type d'alerte, niveau (info / warning / critique)
- **meteo** : données météo importées depuis les CSV fournis

Le MCD et le MLD complets sont disponibles dans le dossier `docs/`.

## Import des données

Les 5 fichiers CSV fournis dans le cahier des charges ont été importés via le script `import_csv.py` (côté backend). Pour recréer la base de zéro :

```bash
mysql -u root -p < docs/schema.sql
python import_csv.py
```

## Requêtes importantes

**Observations récentes par parcelle :**
```sql
SELECT o.*, p.nom AS parcelle
FROM observations o
JOIN parcelles p ON o.parcelle_id = p.id
ORDER BY o.date DESC
LIMIT 20;
```

**Alertes actives par niveau :**
```sql
SELECT niveau, COUNT(*) AS nb
FROM alertes
WHERE resolue = 0
GROUP BY niveau;
```

**Parcelles sans observation depuis 7 jours :**
```sql
SELECT p.nom
FROM parcelles p
LEFT JOIN observations o ON o.parcelle_id = p.id
  AND o.date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
WHERE o.id IS NULL;
```

## Fonctionnalités implémentées

- Modélisation complète (MCD + MLD)
- Script SQL de création des tables avec contraintes et clés étrangères
- Import des 5 fichiers CSV
- Requêtes SQL d'analyse pour le backend
- Vérification de la cohérence des données après import

## Fonctionnalités non implémentées

- Pas de procédures stockées (les règles métier sont gérées côté Flask)
- Pas d'index optimisés (volume de données trop faible pour que ça change quelque chose)
- Pas de sauvegarde automatique planifiée

## Améliorations possibles

- Ajouter des index sur les colonnes les plus filtrées (date, parcelle_id)
- Mettre en place des sauvegardes automatiques avec mysqldump
- Intégrer une table de logs pour tracer les modifications

---

# AgroSuivi - Infrastructure

Cette partie présente le travail réalisé sur l'infrastructure et le déploiement du projet (Mellina).

## Stack utilisée

VM Linux (Ubuntu Server) avec Apache, Gunicorn et MySQL. L'application Flask est servie par Gunicorn, Apache joue le rôle de reverse proxy.

## Choix techniques

**Pourquoi Linux et pas Windows Server ?**
Linux est le standard pour héberger des applications web. C'est gratuit, stable, et bien adapté à Python/Flask. Sur Windows, la configuration de Gunicorn aurait été plus complexe.

**Pourquoi Apache + Gunicorn et pas juste Flask en mode dev ?**
Flask intègre un serveur de développement, mais il n'est pas fait pour la production : il ne gère pas bien la charge et n'est pas sécurisé. Gunicorn gère les processus Python, Apache gère les requêtes HTTP entrantes et les transmet à Gunicorn. C'est la configuration standard pour Flask en production.

**Pourquoi ngrok pour les tests ?**
Pendant le développement, ngrok permettait d'exposer le serveur local à l'équipe sans avoir à configurer le réseau de l'école. Hamza pouvait tester ses pages frontend avec l'URL ngrok en attendant que la VM soit opérationnelle.

**Pourquoi une seule VM ?**
On a centralisé le backend et la BDD sur la même machine pour simplifier la configuration réseau. Dans un vrai projet, on séparerait les deux.

## Architecture du déploiement

```
Internet / Frontend (navigateur)
        │
        ▼
   Apache (port 80)
   Reverse proxy
        │
        ▼
  Gunicorn (port 5000)
  Serveur WSGI Flask
        │
        ▼
   MySQL (port 3306)
   Base de données
```

## Configuration Apache

Le virtualhost Apache (`/etc/apache2/sites-available/agri.conf`) redirige les requêtes vers Gunicorn :

```apache
<VirtualHost *:80>
    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/
</VirtualHost>
```

## Lancer l'application

```bash
cd /var/www/agri-B2
source venv/bin/activate
gunicorn -w 2 -b 127.0.0.1:5000 app:app
```

## Installation depuis zéro

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install apache2 mysql-server python3 python3-pip python3-venv -y
sudo a2enmod proxy proxy_http
sudo systemctl restart apache2

cd /var/www
git clone <url-du-repo> agri-B2
cd agri-B2

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

mysql -u root -p < docs/schema.sql
```

## Fonctionnalités implémentées

- VM Linux configurée avec Apache, Gunicorn et MySQL
- Reverse proxy Apache vers Gunicorn opérationnel
- Déploiement de l'application Flask et de la BDD
- Tests de connectivité réseau entre les membres
- Schéma d'architecture réseau (disponible dans `docs/`)
- Exposition temporaire via ngrok pendant les phases de test

## Fonctionnalités non implémentées

- Pas de HTTPS (certificat SSL non configuré, hors scope du projet)
- Pas de firewall configuré (ufw non activé)
- Pas de service systemd pour redémarrer automatiquement Gunicorn

## Améliorations possibles

- Configurer HTTPS avec Let's Encrypt (Certbot)
- Créer un service systemd pour que Gunicorn redémarre automatiquement
- Mettre en place un firewall (ufw) et restreindre les ports exposés
- Séparer la VM base de données de la VM applicative
