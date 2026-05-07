
// L'adresse du backend de Moha (sur le réseau Wi-Fi)
const URL_BACKEND = "https://mortuary-eating-polyester.ngrok-free.dev";


// 1) RÉCUPÉRER TOUTES LES DONNÉES DU DASHBOARD

fetch(URL_BACKEND + "/api/dashboard", { headers: { "ngrok-skip-browser-warning": "true" } })
    .then(reponse => reponse.json())
    .then(data => {

        // Météo du jour
        document.getElementById("meteo-temp").textContent = data.meteo.temperature + "°";
        document.getElementById("meteo-detail").textContent =
            "Humidité " + data.meteo.humidite + "% · Pluie " + data.meteo.pluie_mm + "mm";

        // Nombre de parcelles
        document.getElementById("nb-parcelles").textContent = data.nb_parcelles;

        // Nombre d'alertes
        document.getElementById("nb-alertes").textContent = data.alertes.length;

        // Nombre d'observations
        document.getElementById("nb-observations").textContent = data.observations.length;

        // Nombre de parcelles à risque (alertes niveau >= 2)
        const parcellesRisque = new Set(
            data.alertes.filter(a => parseInt(a.niveau) >= 2).map(a => a.parcelle_id)
        );
        document.getElementById("nb-risque").textContent = parcellesRisque.size;


        // 2) AFFICHER LES DERNIÈRES ALERTES
        const listeAlertes = document.getElementById("liste-alertes");

        // Pour chaque alerte, on crée un petit bloc HTML
        data.alertes.forEach(alerte => {

            // Choisir la couleur selon le niveau
            let couleur;
            if (parseInt(alerte.niveau) === 3) {
                couleur = "rouge";
            } else if (parseInt(alerte.niveau) === 2) {
                couleur = "orange";
            } else {
                couleur = "bleu";
            }

            // Ajouter le HTML dans la liste
            listeAlertes.innerHTML += `
                <div class="alerte ${couleur}">
                    ${alerte.type} — Parcelle ${alerte.parcelle_id}
                </div>
            `;
        });

    })
    .catch(erreur => {
        console.log("Erreur :", erreur);
        alert("Impossible de joindre le backend. Vérifie que Moha l'a bien lancé.");
    });




