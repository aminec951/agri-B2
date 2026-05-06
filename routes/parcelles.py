from flask import Blueprint, jsonify, request
from db import get_db

parcelles_bp = Blueprint("parcelles", __name__)

@parcelles_bp.route("/api/parcelles")
def get_parcelles():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT p.id, p.nom, p.localisation, p.surface_ha, c.type as culture
        FROM parcelles p
        LEFT JOIN cultures c ON c.parcelle_id = p.id
    """)
    parcelles = cursor.fetchall()
    return jsonify(parcelles)

