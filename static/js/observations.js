var serveur = "http://10.105.2.47:5000"
var etatChoisi = "Normal"
var toutesLesObservations = []

document.getElementById("champ-date").value = new Date().toISOString().split("T")[0]

chargerParcelles()
chargerObservations()

function chargerParcelles() {
    fetch(serveur + "/api/parcelles")
    .then(function(reponse) { return reponse.json() })
    .then(function(parcelles) {
        var menuFormulaire = document.getElementById("champ-parcelle")
        var menuFiltre = document.getElementById("filtre-parcelle")
        for (var i = 0; i < parcelles.length; i++) {
            var p = parcelles[i]
            menuFormulaire.innerHTML += '<option value="' + p.id + '">' + p.nom + ' — ' + p.localisation + '</option>'
            menuFiltre.innerHTML += '<option value="' + p.id + '">' + p.nom + '</option>'
        }
    })
}

function chargerObservations() {
    fetch(serveur + "/api/observations")
    .then(function(reponse) { return reponse.json() })
    .then(function(observations) {
        toutesLesObservations = observations
        afficherObservations(observations)
    })
}

function afficherObservations(observations) {
    var liste = document.getElementById("liste-observations")
    if (observations.length === 0) {
        liste.innerHTML = '<p style="color:#888; font-size:13px;">Aucune observation</p>'
        return
    }
    liste.innerHTML = ""
    for (var i = 0; i < observations.length; i++) {
        var o = observations[i]
        var couleur = "point-bleu"
        if (o.etat === "Normal") couleur = "point-vert"
        if (o.etat === "Stress hydrique") couleur = "point-orange"
        if (o.etat === "Maladie détectée") couleur = "point-rouge"
        var dateAffichee = new Date(o.date).toLocaleDateString("fr-FR")
        var commentaire = o.commentaire ? o.commentaire : "Aucun commentaire"
        liste.innerHTML +=
            '<div class="obs">' +
                '<div class="point ' + couleur + '"></div>' +
                '<div class="obs-info">' +
                    '<div class="obs-ligne1">' +
                        '<span class="obs-etat">' + o.etat + '</span>' +
                        '<span class="obs-date">' + dateAffichee + '</span>' +
                    '</div>' +
                    '<div class="obs-parcelle">Parcelle ' + o.parcelle_id + '</div>' +
                    '<div class="obs-commentaire">' + commentaire + '</div>' +
                '</div>' +
            '</div>'
    }
}

function choisirEtat(bouton, etat) {
    var tousBoutons = document.querySelectorAll(".btn-etat")
    for (var i = 0; i < tousBoutons.length; i++) {
        tousBoutons[i].classList.remove("actif")
    }
    bouton.classList.add("actif")
    etatChoisi = etat
}

function filtrer() {
    var parcelleId = document.getElementById("filtre-parcelle").value
    if (parcelleId === "") {
        afficherObservations(toutesLesObservations)
    } else {
        var resultat = []
        for (var i = 0; i < toutesLesObservations.length; i++) {
            if (toutesLesObservations[i].parcelle_id == parcelleId) {
                resultat.push(toutesLesObservations[i])
            }
        }
        afficherObservations(resultat)
    }
}

function envoyerObservation() {
    var parcelleId = document.getElementById("champ-parcelle").value
    var date = document.getElementById("champ-date").value
    var commentaire = document.getElementById("champ-commentaire").value
    if (parcelleId === "" || date === "") {
        alert("Veuillez choisir une parcelle et une date")
        return
    }
    var donnees = {
        date: date,
        etat: etatChoisi,
        parcelle_id: parseInt(parcelleId),
        commentaire: commentaire
    }
    fetch(serveur + "/api/observations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees)
    })
    .then(function(reponse) { return reponse.json() })
    .then(function() {
        document.getElementById("message-succes").style.display = "block"
        setTimeout(function() {
            document.getElementById("message-succes").style.display = "none"
        }, 3000)
        document.getElementById("champ-commentaire").value = ""
        document.getElementById("champ-parcelle").value = ""
        chargerObservations()
    })
}