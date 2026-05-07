from flask import Blueprint, jsonify
from db import get_db

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/api/dashboard")
def get_dashboard():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Dernière météo
    cursor.execute("SELECT * FROM meteo ORDER BY date DESC LIMIT 1")
    meteo = cursor.fetchone()

    # Nombre total de parcelles
    cursor.execute("SELECT COUNT(*) as total FROM parcelles")
    nb_parcelles = cursor.fetchone()

    # 5 dernières alertes
    cursor.execute("SELECT * FROM alertes ORDER BY date DESC LIMIT 5")
    alertes = cursor.fetchall()

    # 5 dernières observations
    cursor.execute("SELECT * FROM observations ORDER BY date DESC LIMIT 5")
    observations = cursor.fetchall()

    return jsonify({
        "meteo": meteo,
        "nb_parcelles": nb_parcelles["total"],
        "alertes": alertes,
        "observations": observations
    })