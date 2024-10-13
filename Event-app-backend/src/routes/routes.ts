import express from 'express';
import EventModel from '../models/EventModel';
import eventsController from '../controllers/eventsController';
const router = express.Router();

// List all events
router.get('/event/list',eventsController.listAllEvents);

// Create an event
router.post('/event',eventsController.createEvent);

// Show event details
router.get('/event/:id',eventsController.getEventDetails);

// Add votes to an event
router.post('/event/:id/vote',eventsController.addVote);

// Show results of an event
router.get('/event/:id/results', eventsController.showResult);

export default router;
