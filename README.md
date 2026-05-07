# 🌾 AgriDash – Application de suivi agricole

Application web Flask de suivi des cultures, météo, alertes et observations agricoles, déployée sur VM Ubuntu 24.04 LTS avec Nginx + Gunicorn + MySQL.

## 📊 Stack technique

- **Backend** : Python Flask
- **Serveur WSGI** : Gunicorn (lancé via systemd)
- **Reverse proxy** : Nginx (HTTP + HTTPS)
- **Base de données** : MySQL 8 (localhost)
- **OS** : Ubuntu 24.04 LTS
- **Sécurité** : UFW, HTTPS auto-signé, headers OWASP

## 🏗️ Architecture
[Client HTTPS] → [UFW] → [Nginx :80/:443] → [Gunicorn :5000] → [Flask] → [MySQL :3306]
## ⚙️ Déploiement sur VM

1. Préparer Ubuntu : Python, MySQL, Nginx, Git
2. Créer la BDD `agri` et l'user `agri_user` sur MySQL
3. Cloner le repo (branche dev), créer un venv, installer les dépendances
4. Modifier `db.py` et `import_csv.py` avec les identifiants `agri_user`
5. Créer les tables : `mysql -u agri_user -p agri < schema.sql`
6. Importer les CSV : `python3 import_csv.py`
7. Configurer le service systemd Gunicorn
8. Configurer Nginx en reverse proxy
9. Générer un certificat SSL auto-signé pour HTTPS
10. Activer le pare-feu UFW (ports 22, 80, 443 only)

Données importées : 10 parcelles, 10 cultures, 60 météo, 100 observations, 50 alertes.

## 📡 Routes API

| Méthode | URL | Description |
|---|---|---|
| GET | `/api/parcelles` | Liste des parcelles avec leur culture |
| GET | `/api/meteo` | Données météo |
| GET | `/api/alertes` | Liste des alertes |
| GET | `/api/observations` | Observations terrain |
| POST | `/api/observations` | Ajouter une observation |
| GET | `/api/dashboard` | Tableau de bord global |

## 🛡️ Sécurité

- Pare-feu UFW (ports 22, 80, 443 only)
- MySQL localhost only (pas exposé sur réseau)
- User MySQL dédié `agri_user` (moindre privilège)
- HTTPS chiffré (TLS auto-signé)
- Headers OWASP (X-Frame-Options, XSS, nosniff, Referrer-Policy)
- Reverse proxy Nginx
- Service systemd avec auto-restart
- Requêtes SQL préparées (anti-injection)

## 🌐 Accès

- HTTP : http://192.168.223.130
- HTTPS : https://192.168.223.130
- API : http://192.168.223.130/api/parcelles

## 👥 Équipe

- **Mohammed** : Backend Flask
- **Hamza** : Frontend HTML/CSS/JS
- **Amine** : Déploiement, infrastructure, sécurité
- **Mellina** : Schéma d'architecture, documentation

## 📄 Licence

Projet pédagogique – Bachelor 2 IT Systems, Networks & Cloud – Sup de Vinci Paris
