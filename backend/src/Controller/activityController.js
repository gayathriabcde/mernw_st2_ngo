import { Activity } from '../db/models/activity.model.js';

export const getAllActivities = async (req, res) => {
     try {
          console.log("user role", req.user.role);

          const { role } = req.user;

          if (role === "admin") {
               const responseActivities = await Activity.find({});

               if (!responseActivities || responseActivities.length === 0) return res.status(404).json({message: "Not Found"});
               res.status(200).json({
                    message: "Activities retrieved succesfully",
                    data: responseActivities
               })
          } else {
               res.status(403).json({ message: "Forbidden" });
          }
     } catch (error) {
          console.error(error.message);
          res.status(500).json({
               message: "Server error"
          })
     }
}