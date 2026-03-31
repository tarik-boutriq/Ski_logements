const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReservation = async (req, res, next) => {
    try {
        const filters = {};
        
        if (req.query.logement_id) filters.logement_id = req.query.logement_id;
        if (req.query.client_id) filters.client_id = req.query.client_id;

        let results = await prisma.reservation.findMany({
            where: filters,
            include: {
                logement: {
                    select: {
                        nom: true,
                        station: true
                    }
                },
                client: {
                    select: {
                        nom_de_client: true,
                        prenom_de_client: true
                    }
                }
            },
            orderBy: {
                start: 'asc'
            }
        }); 
        
        if (results.length !== 0) {
            res.status(200).json({
                data: results
            });
        } else {
            const error = new Error("Aucune réservation trouvée !!");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error); 
    }
};

const createReservation = async (req, res, next) => {
    try {
        const { logement_id, client_id, start, end } = req.body;

        const reservationExistante = await prisma.reservation.findFirst({
            where: {
                logement_id: logement_id,
                start: start,
                end: end
            }
        });

        if (reservationExistante) {
            const error = new Error("Conflit : Ce logement est déjà réservé pour ces dates !");
            error.status = 409;
            throw error;
        }

        const newReservation = await prisma.reservation.create({
            data: {
                logement_id,
                client_id,
                start,
                end
            }
        });

        res.status(201).json({ data: newReservation });
    } catch (error) {
        next(error);
    }
};

const getReservationById = async (req, res, next) => {
    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: req.params.id },
            include: {
                logement: {
                    select: {
                        nom: true,
                        station: true
                    }
                },
                client: {
                    select: {
                        nom_de_client: true,
                        prenom_de_client: true
                    }
                }
            }
        });

        if (reservation) {
            res.status(200).json({ data: reservation });
        } else {
            const error = new Error("Réservation non trouvée !");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

const updateReservation = async (req, res, next) => {
    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: req.params.id }
        });

        if (!reservation) {
            const error = new Error("Réservation non trouvée !");
            error.status = 404;
            throw error;
        } else {
            const body = req.body || {};
            
            const reservationModifie = await prisma.reservation.update({
                where: { id: req.params.id },
                data: {
                    logement_id: body.logement_id || reservation.logement_id,
                    client_id: body.client_id || reservation.client_id,
                    start: body.start || reservation.start,
                    end: body.end || reservation.end
                }
            });
            res.status(200).json({ data: reservationModifie });
        }
    } catch (error) {
        next(error);
    }
};

const deleteReservation = async (req, res, next) => {
    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: req.params.id }
        });

        if (!reservation) {
            const error = new Error("Réservation non trouvée !");
            error.status = 404;
            throw error;
        }

        await prisma.reservation.delete({
            where: { id: req.params.id }
        });
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getReservation,
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation
};