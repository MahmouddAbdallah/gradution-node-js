import { Request, Response } from "express"
import Appointment from "../models/Appointment";
import Notification from "../models/Notification";

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { doctorId, date, timeSlot, noted } = req.body;
        if (!doctorId) return res.status(400).json({ message: "The doctorId feild is required" });
        if (!date) return res.status(400).json({ message: "The date feild is required" });
        if (!timeSlot) return res.status(400).json({ message: "The timeSlot feild is required" });
        const user = req.user
        const appointment = await Appointment.create({
            date,
            timeSlot,
            doctor: doctorId,
            patient: user._id,
            noted
        })


        if (appointment) {
            await Notification.create({
                message: appointment.noted,
                userType: 'User',
                user: appointment?.patient,
                type: 'Appointment',
                schemaId: appointment?._id
            })
            return res.status(200).json({ message: "Appointment create successfully", appointment });
        } else {
            return res.status(404).json({ message: "Appointment not found" });
        }


    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const updateAppointment = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = req?.user;
        const { id } = req.params
        const appointment = await Appointment.findByIdAndUpdate(id, {
            ...body,
            updatedAt: new Date()
        });


        if (appointment) {
            if (user._id == appointment.patient) {
                await Notification.create({
                    message: `Appointment updated successfully`,
                    userType: 'Doctor',
                    user: appointment?.doctor,
                    type: 'Appointment',
                    schemaId: appointment?._id
                })
                return res.status(200).json({ message: "Appointment update successfully", appointment });
            } else {
                await Notification.create({
                    message: `Appointment updated successfully`,
                    userType: 'User',
                    user: appointment?.patient,
                    type: 'Appointment',
                    schemaId: appointment?._id
                })
                return res.status(200).json({ message: "Appointment updated successfully", appointment });
            }
        } else {
            return res.status(404).json({ message: "Appointment not found" });
        }

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
            appointments = await Appointment.find({ doctor: req.user._id }).populate("patient", 'name role picture').select("-__v -doctor");
        } else if (role == 'user') {
            appointments = await Appointment.find({ patient: req.user._id }).populate("doctor", 'name role picture').select("-__v -user");
        }
        return res.status(200).json({ appointments });
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}