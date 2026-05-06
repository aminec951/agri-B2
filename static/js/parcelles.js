
const URL_BACKEND = "http://10.105.2.47:5000";


fetch(URL_BACKEND + "/api/parcelles")
    .then(reponse => reponse.json())
    .then(parcelles => {

        const grille = document.getElementById("grille-parcelles");

        // Pour chaque parcelle, on crée une carte
        parcelles.forEach(parcelle => {

            // Choisir la classe CSS selon l'état (par défaut OK)
            // Note : à adapter selon ce que renvoie Moha (ex: parcelle.etat)
            let classeCarte = "carte";
            let classeBadge = "badge ok";
            let texteBadge = "OK";

            if (parcelle.etat === "Risque") {
                classeCarte = "carte risque";
                classeBadge = "badge risque";
                texteBadge = "Risque";
            } else if (parcelle.etat === "Maladie") {
                classeCarte = "carte maladie";
                classeBadge = "badge maladie";
                texteBadge = "Maladie";
            }

            // Créer le HTML de la carte
            grille.innerHTML += `
                <div class="${classeCarte}">
                    <div class="carte-haut">
                        <div>
                            <div class="carte-nom">${parcelle.nom}</div>
                            <div class="carte-zone">${parcelle.localisation}</div>
                        </div>
                        <span class="${classeBadge}">${texteBadge}</span>
                    </div>
                    <div class="carte-infos">
                        <div>Surface<strong>${parcelle.surface_ha} ha</strong></div>
                        <div>Culture<strong>${parcelle.culture}</strong></div>
                    </div>
                </div>
            `;
        });

    })
    .catch(erreur => {
        console.log("Erreur :", erreur);
        alert("Impossible de joindre le backend.");
    });
