from flask import Flask
from routes.parcelles import parcelles_bp
from routes.meteo import meteo_bp
from routes.alertes import alertes_bp
from routes.observations import observations_bp
from alertes_auto import generer_alertes
from routes.dashboard import dashboard_bp


from flask import Flask
from flask_cors import CORS
from routes.parcelles import parcelles_bp
from routes.meteo import meteo_bp
from routes.alertes import alertes_bp
from routes.observations import observations_bp
from routes.dashboard import dashboard_bp
from alertes_auto import generer_alertes

app = Flask(__name__)
app.secret_key = "agri_secret_key"
CORS(app)  # ajoute cette ligne

app.register_blueprint(parcelles_bp)
app.register_blueprint(meteo_bp)
app.register_blueprint(alertes_bp)
app.register_blueprint(observations_bp)
app.register_blueprint(dashboard_bp)

if __name__ == "__main__":
    generer_alertes()
    app.run(debug=True, host="0.0.0.0")