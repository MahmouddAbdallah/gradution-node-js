import express from 'express';
import { protectionAuth } from '../middlewares/verifyAuth'
import { createAppointment, deleteAppointment, fetchAppointments, updateAppointment } from '../controllers/appointmentController';
const router = express.Router();

router.route('/appointment')
    .post(protectionAuth, createAppointment)
    .get(protectionAuth, fetchAppointments)

router.route('/appointment/:id')
    .put(protectionAuth, updateAppointment)
    .delete(protectionAuth, deleteAppointment)

export default router