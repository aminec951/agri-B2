const URL_BACKEND = "https://mortuary-eating-polyester.ngrok-free.dev";


// =============================
// RÉCUPÉRER TOUTES LES ALERTES
// ============================
fetch(URL_BACKEND + "/api/alertes", { headers: { "ngrok-skip-browser-warning": "true" } })
    .then(r => r.json())
    .then(alertes => {

        // Compter par niveau
        let nb1 = 0, nb2 = 0, nb3 = 0;

        alertes.forEach(a => {
            const niveau = parseInt(a.niveau);
            if (niveau === 1) nb1++;
            else if (niveau === 2) nb2++;
            else if (niveau === 3) nb3++;
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
            if (parseInt(alerte.niveau) === 3) couleur = "rouge";
            else if (parseInt(alerte.niveau) === 2) couleur = "orange";
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