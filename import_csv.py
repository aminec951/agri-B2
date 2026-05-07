import csv
import mysql.connector


db = mysql.connector.connect(
    host="localhost",
    user="agri_user",
    password="MotDePasseSecurise123!",
    database="agri"
)
cursor = db.cursor()

# --- Import parcelles ---
fichier = open("parcelles.csv", encoding="utf-8")
lecteur = csv.DictReader(fichier)
for ligne in lecteur:
    cursor.execute(
        "INSERT INTO parcelles (id, nom, localisation, surface_ha) VALUES (%s, %s, %s, %s)",
        (ligne["id"], ligne["nom"], ligne["localisation"], ligne["surface_ha"])
    )
db.commit()
print("parcelles importées")

# --- Import cultures ---
fichier = open("cultures.csv", encoding="utf-8")
lecteur = csv.DictReader(fichier)
for ligne in lecteur:
    cursor.execute(
        "INSERT INTO cultures (id, type, date_semis, parcelle_id) VALUES (%s, %s, %s, %s)",
        (ligne["id"], ligne["type"], ligne["date_semis"], ligne["parcelle_id"])
    )
db.commit()
print("cultures importées")

# --- Import meteo ---
fichier = open("meteo.csv", encoding="utf-8")
lecteur = csv.DictReader(fichier)
for ligne in lecteur:
    cursor.execute(
        "INSERT INTO meteo (date, temperature, humidite, pluie_mm) VALUES (%s, %s, %s, %s)",
        (ligne["date"], ligne["temperature"], ligne["humidite"], ligne["pluie_mm"])
    )
db.commit()
print("meteo importée")

# --- Import observations ---
fichier = open("observations.csv", encoding="utf-8")
lecteur = csv.DictReader(fichier)
for ligne in lecteur:
    cursor.execute(
        "INSERT INTO observations (date, etat, parcelle_id, commentaire) VALUES (%s, %s, %s, %s)",
        (ligne["date"], ligne["etat"], ligne["parcelle_id"], ligne["commentaire"])
    )
db.commit()
print("observations importées")

# --- Import alertes ---
fichier = open("alertes.csv", encoding="utf-8")
lecteur = csv.DictReader(fichier)
for ligne in lecteur:
    cursor.execute(
        "INSERT INTO alertes (date, type, parcelle_id, niveau) VALUES (%s, %s, %s, %s)",
        (ligne["date"], ligne["type"], ligne["parcelle_id"], ligne["niveau"])
    )
db.commit()
print("alertes importées")

print("Tout est importé !")
