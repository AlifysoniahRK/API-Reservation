const express = require('express');
const cors = require('cors');

const app = express();
let reservations = [];
let prochainId = 1;
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "Bienvenue dans mon API de réservation"
    });
});

app.get('/reservations', (req, res) => {
    res.json(reservations);
});

app.use(express.json());

app.post('/reservations', (req, res) => {
    const reservation = {
    id: prochainId,
    ...req.body
};

prochainId++;

reservations.push(reservation);

    console.log("Nouvelle réservation reçue :", reservation);

    res.json({
        message: "Réservation enregistrée avec succès",
        reservation: reservation
    });
});
app.put('/reservations/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const index = reservations.findIndex(
        reservation => reservation.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Réservation introuvable"
        });
    }

    reservations[index] = {
        id: id,
        ...req.body
    };

    res.json({
        message: "Réservation modifiée avec succès",
        reservation: reservations[index]
    });
});
app.delete('/reservations/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const index = reservations.findIndex(
        reservation => reservation.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Réservation introuvable"
        });
    }

    reservations.splice(index, 1);

    res.json({
        message: "Réservation supprimée avec succès"
    });
});
app.get('/reservations', (req, res) => {
    res.json(reservations);
});
app.listen(3000, () => {
    console.log("API démarrée sur http://localhost:3000");
});