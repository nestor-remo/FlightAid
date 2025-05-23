import express from 'express';
import TripsController from '../controllers/tripsController.js';

const router = express.Router();

router.get('/', TripsController.getTripsbyUser);
router.get('/:id', TripsController.getTrip);
router.post('/', TripsController.createTrip);
router.delete('/:id', TripsController.deleteTrip);
router.put('/:id', TripsController.updateTrip);
router.delete('/', TripsController.deleteAllTrips);

export default router;