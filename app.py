from flask import Flask
from routes.parcelles import parcelles_bp
from routes.meteo import meteo_bp
from routes.alertes import alertes_bp
from routes.observations import observations_bp

app = Flask(__name__)
app.secret_key = "agri_secret_key"

app.register_blueprint(parcelles_bp)
app.register_blueprint(meteo_bp)
app.register_blueprint(alertes_bp)
app.register_blueprint(observations_bp)

@app.route("/")
def index():
    return "API Agri OK"

if __name__ == "__main__":
    app.run(debug=True)