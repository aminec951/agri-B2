from flask import Blueprint, jsonify
from db import get_db

alertes_bp = Blueprint("alertes", __name__)

@alertes_bp.route("/api/alertes")
def get_alertes():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alertes ORDER BY date DESC")
    return jsonify(cursor.fetchall())

@alertes_bp.route("/api/alertes/parcelle/<int:id>")
def get_alertes_parcelle(id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM alertes WHERE parcelle_id = %s ORDER BY date DESC",
        (id,)
    )
    return jsonify(cursor.fetchall())