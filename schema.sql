CREATE TABLE parcelles (
    id INT PRIMARY KEY,
    nom VARCHAR(100),
    localisation VARCHAR(200),
    surface_ha FLOAT
);

CREATE TABLE cultures (
    id INT PRIMARY KEY,
    type VARCHAR(100),
    date_semis DATE,
    parcelle_id INT,
    FOREIGN KEY (parcelle_id) REFERENCES parcelles(id)
);

CREATE TABLE meteo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    temperature FLOAT,
    humidite FLOAT,
    pluie_mm FLOAT
);

CREATE TABLE observations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    etat VARCHAR(100),
    parcelle_id INT,
    commentaire TEXT,
    FOREIGN KEY (parcelle_id) REFERENCES parcelles(id)
);

CREATE TABLE alertes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    type VARCHAR(100),
    parcelle_id INT,
    niveau VARCHAR(50),
    FOREIGN KEY (parcelle_id) REFERENCES parcelles(id)
);
