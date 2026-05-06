
// L'adresse du backend de Moha (sur le réseau Wi-Fi)
const URL_BACKEND = "http://10.105.2.47:5000";


// 1) RÉCUPÉRER TOUTES LES DONNÉES DU DASHBOARD

fetch(URL_BACKEND + "/api/dashboard")
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


        // 2) AFFICHER LES DERNIÈRES ALERTES
        const listeAlertes = document.getElementById("liste-alertes");

        // Pour chaque alerte, on crée un petit bloc HTML
        data.alertes.forEach(alerte => {

            // Choisir la couleur selon le niveau
            let couleur;
            if (alerte.niveau === 3) {
                couleur = "rouge";
            } else if (alerte.niveau === 2) {
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




// 3) NOMBRE DE PARCELLES À RISQUE
fetch(URL_BACKEND + "/api/parcelles")
    .then(reponse => reponse.json())
    .then(parcelles => {

        // On compte combien de parcelles ne sont pas "OK"
        let nbRisque = 0;
        parcelles.forEach(p => {
            if (p.etat && p.etat !== "OK") {
                nbRisque++;
            }
        });

        document.getElementById("nb-risque").textContent = nbRisque;
    });