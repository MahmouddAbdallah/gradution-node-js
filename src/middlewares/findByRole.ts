import Doctor from "../models/Doctor";
import Pharmacist from "../models/Pharmacist";
import User from "../models/User";

const findByRole = async (id: string, role: string) => {
    try {
        const roleLow = role.toLocaleLowerCase()
        let user: any = {};
        if (roleLow == 'user') {
            user = await User.findById(id).select("name picture role");
        }
        else if (roleLow == 'doctor') {
            user = await Doctor.findById(id).select("name picture role")
        }
        else if (roleLow == 'pharmacist') {
            user = await Pharmacist.findById(id).select("name picture role")
        }
        if (!user) return false;
        else {
            return user;
        }
    } catch (error) {
        return false
    }
}

export default findByRole