from db import get_db
from datetime import date

def generer_alertes():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # On récupère la météo du jour
    cursor.execute("SELECT * FROM meteo ORDER BY date DESC LIMIT 1")
    meteo = cursor.fetchone()

    if not meteo:
        print("Pas de données météo")
        return

    aujourd_hui = date.today()
    cursor2 = db.cursor()

    if meteo["humidite"] > 80 and meteo["temperature"] > 20:
        cursor2.execute(
            "INSERT INTO alertes (date, type, parcelle_id, niveau) VALUES (%s, %s, %s, %s)",
            (aujourd_hui, "Risque maladie", 1, 3)
        )
        print("Alerte créée : Risque maladie")

    if meteo["temperature"] < 0:
        cursor2.execute(
            "INSERT INTO alertes (date, type, parcelle_id, niveau) VALUES (%s, %s, %s, %s)",
            (aujourd_hui, "Risque gel", 1, 2)
        )
        print("Alerte créée : Risque gel")

    if meteo["pluie_mm"] > 20:
        cursor2.execute(
            "INSERT INTO alertes (date, type, parcelle_id, niveau) VALUES (%s, %s, %s, %s)",
            (aujourd_hui, "Risque inondation", 1, 2)
        )
        print("Alerte créée : Risque inondation")

    db.commit()
    print("Vérification des alertes terminée")