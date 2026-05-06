const URL_BACKEND = "http://10.105.2.47:5000";


// =============================
// RÉCUPÉRER TOUTES LES ALERTES
// ============================
fetch(URL_BACKEND + "/api/alertes")
    .then(r => r.json())
    .then(alertes => {

        // Compter par niveau
        let nb1 = 0, nb2 = 0, nb3 = 0;

        alertes.forEach(a => {
            if (a.niveau === 1) nb1++;
            else if (a.niveau === 2) nb2++;
            else if (a.niveau === 3) nb3++;
        });

        // Mettre à jour les KPI
        document.getElementById("nb-niveau-1").textContent = nb1;
        document.getElementById("nb-niveau-2").textContent = nb2;
        document.getElementById("nb-niveau-3").textContent = nb3;


        // Afficher la liste
        const liste = document.getElementById("liste-alertes");

        alertes.forEach(alerte => {

            // Choisir la couleur selon le niveau
            let couleur;
            if (alerte.niveau === 3) couleur = "rouge";
            else if (alerte.niveau === 2) couleur = "orange";
            else couleur = "bleu";

            liste.innerHTML += `
                <div class="alerte ${couleur}">
                    <strong>${alerte.type}</strong> — Parcelle ${alerte.parcelle_id}
                    <span class="alerte-date">${alerte.date}</span>
                </div>
            `;
        });

    })
    .catch(erreur => {
        console.log(erreur);
        alert("Impossible de joindre le backend.");
    });