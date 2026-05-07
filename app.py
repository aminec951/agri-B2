from flask import Flask, render_template
from flask_cors import CORS
from routes.parcelles import parcelles_bp
from routes.meteo import meteo_bp
from routes.alertes import alertes_bp
from routes.observations import observations_bp
from routes.dashboard import dashboard_bp
from alertes_auto import generer_alertes

app = Flask(__name__)
app.secret_key = "agri_secret_key"
CORS(app)

app.register_blueprint(parcelles_bp)
app.register_blueprint(meteo_bp)
app.register_blueprint(alertes_bp)
app.register_blueprint(observations_bp)
app.register_blueprint(dashboard_bp)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/parcelles')
def parcelles():
    return render_template('parcelles.html')

@app.route('/observations')
def observations():
    return render_template('observations.html')

@app.route('/alertes')
def alertes():
    return render_template('alertes.html')

if __name__ == "__main__":
    generer_alertes()
    app.run(debug=True, host="0.0.0.0", port=5001)

