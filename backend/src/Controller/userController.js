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
        const users = await User.find({});
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}