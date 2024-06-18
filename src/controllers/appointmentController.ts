import { Request, Response } from "express"
import Appointment from "../models/Appointment";

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { doctorId, date, timeSlot, noted } = req.body;
        if (!doctorId) return res.status(400).json({ message: "The doctorId feild is required" });
        if (!date) return res.status(400).json({ message: "The date feild is required" });
        if (!timeSlot) return res.status(400).json({ message: "The timeSlot feild is required" });
        const appointment = await Appointment.create({
            date,
            timeSlot,
            doctor: doctorId,
            patient: req.user._id,
            noted
        })
        return res.status(201).json({ message: "Appointment created successfully", appointment });
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const updateAppointment = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id } = req.params
        const appointment = await Appointment.findByIdAndUpdate(id, {
            ...body,
            updatedAt: new Date()
        });
        return res.status(200).json({ message: "Appointment update successfully", appointment });
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Appointment.findByIdAndDelete(id);
        return res.status(200).json({ message: "Appointment update successfully" });
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchAppointments = async (req: Request, res: Response) => {
    try {
        const role = req.role;
        let appointments: any[] = []
        if (role == 'doctor') {
            appointments = await Appointment.find({ doctor: req.user._id }).populate("patient", 'name role email').select("-__v -doctor");
        } else if (role == 'user') {
            appointments = await Appointment.find({ patient: req.user._id }).populate("doctor", 'name role email').select("-__v -user");
        }
        return res.status(200).json({ appointments });
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}