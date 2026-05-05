from flask import Blueprint, jsonify
from db import get_db

meteo_bp = Blueprint("meteo", __name__)

@meteo_bp.route("/api/meteo")
def get_meteo():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM meteo ORDER BY date DESC LIMIT 30")
    return jsonify(cursor.fetchall())