import User from "../db/models/user.model.js";

export const getUserDetails =async (req,res) => {
    try{
        const {id} = req.user;
        console.log(id);
        const record = await User.findById(id);
        console.log(record);
        res.status(200).json(record);
    }
    catch(error)
    {
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        /** console.log("user role", req.body.role);
        const { role } = req.body;

        if (role === 'admin') { **/
            const users = await User.find({});
            console.log(users);

            if (!users || user.length === 0) return res.status(404).json({message: "Not Found"});
            res.status(200).json({message: "Succesfully retrieved users", data: users});
        /**} else {
            res.status(403).json({message: "Forbidden"});
        } **/
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateUserRole = async (req, res) => { //only role can be updated
    try {
        const { id } = req.params;
        const { role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, {$set: {role: role}}, {new: true, runValidators: true});
        if (!updatedUser) return res.status(404).json({message: "Not Found"});

        res.status(200).json({message: "succesfully updated user role", data: updatedUser});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "some error , idek"});
    }
}