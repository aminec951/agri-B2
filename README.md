# 🌾 Agri-B2 — Application de suivi agricole

Projet Bachelor 2 — Sup de Vinci Paris  
Commanditaire : Chambre d'Agriculture

---

## 📌 Description

Application web permettant aux acteurs agricoles de surveiller leurs cultures, 
exploiter des données (météo, observations terrain) et améliorer leur prise de décision.

---

## 👥 Équipe

| Membre | Rôle |
|--------|------|
| Mohammed | Backend — Flask + BDD |
| Hamza | Frontend — HTML/CSS/JS |
| Amine & Mellina | GitHub / VM / Déploiement / Sécu |

---

## 🛠️ Stack technique

- **Frontend** : HTML, CSS, JavaScript, Chart.js
- **Backend** : Python 3, Flask
- **Base de données** : MySQL
- **Serveur** : Ubuntu Linux, Nginx
- **Déploiement** : VM Linux (local) + Let's Encrypt (HTTPS)
- **Versioning** : Git / GitHub

---

## 📁 Structure du projet
agri-B2/
├── app/
│   ├── routes/          # Routes Flask (parcelles, météo, alertes)
│   ├── models/          # Modèles BDD
│   ├── templates/       # Pages HTML
│   └── static/          # CSS, JS, images
├── database/
│   └── schema.sql       # Script création tables
├── docs/                # Schémas d'architecture
├── requirements.txt     # Dépendances Python
└── README.md
---

## ⚙️ Installation

### Prérequis
- Python 3.10+
- MySQL
- HTML/CSS/JavaScript

### Lancer le projet

```bash
git clone https://github.com/aminec951/agri-B2.git
cd agri-B2
pip install -r requirements.txt
python app.py
```

---

## 🌿 Branches

| Branche | Usage |
|---------|-------|
| `main` | Version stable |
| `dev` | Branche de travail commune |
| `feature/*` | Développement de fonctionnalités |

---

## 📝 Convention de commits

| Préfixe | Usage |
|---------|-------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `docs:` | Documentation |
| `setup:` | Configuration / infrastructure |
| `style:` | Mise en forme |

---

## 📄 Livrables

- MVP fonctionnel
- Base de données (MCD, MLD, schema.sql)
- Schéma d'architecture
- Documentation
- Soutenance vidéo (15 min)
