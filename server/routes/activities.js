import express from 'express';
import activitiesController from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', activitiesController.getActivities);
router.post('/', activitiesController.createActivity);
router.delete('/:id', activitiesController.deleteActivity);
router.post('/bulk', activitiesController.addActivitiesBulk);

export default router;