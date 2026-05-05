from flask import Blueprint, jsonify, request
from db import get_db

observations_bp = Blueprint("observations", __name__)

@observations_bp.route("/api/observations")
def get_observations():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM observations ORDER BY date DESC")
    return jsonify(cursor.fetchall())

@observations_bp.route("/api/observations", methods=["POST"])
def add_observation():
    data = request.get_json()
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO observations (date, etat, parcelle_id, commentaire) VALUES (%s, %s, %s, %s)",
        (data["date"], data["etat"], data["parcelle_id"], data["commentaire"])
    )
    db.commit()
    return jsonify({"message": "Observation ajoutée"}), 201