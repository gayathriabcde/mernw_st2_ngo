import { Activity } from '../db/models/activity.model.js';    

export const getAllActivities = async (req, res) => {
     try {
          console.log("user role", req.user.role);

          const { role } = req.user;

          if (role === "admin") {
               const responseActivities = await Activity.find({});

               if (!responseActivities || responseActivities.length === 0) return res.status(404).json({message: "Not Found"});
               return res.status(200).json({
                    message: "Activities retrieved succesfully",
                    data: responseActivities
               });
          } else {
               //res.status(403).json({ message: "Forbidden" });
               const responseActivities = await Activity.find({assignedWorkers: req.user.id});
               return res.status(200).json({
                    message: "Activities retrieved succesfully",
                    data: responseActivities
               });
          }
     } catch (error) {
          console.error(error.message);
          return res.status(500).json({
               message: "Server error"
          })
     }
}

export const createActivity = async (req, res) => {
     try {
          console.log("user role", req.user.role);
          const { role } = req.user;

          if (role === 'admin') {
               //const { title, description, activityType, location, beneficiary: {name: beneficiaryName, beneficiaryEmail, beneficiaryPhone}, ngo } = req.body;
               const { title, description, activityType, location, beneficiary, ngo, assignedWorkers } = req.body;
               
               const createdPost = await Activity.create({title, description, activityType, location, beneficiary, assignedWorkers, ngo})
               console.log(createdPost);

               if (!createdPost) return res.status(500).json({message: "Error idk."});

               res.status(201).json({message: "Created Activity", data: createdPost});
          } else {
               return res.status(403).json({message: "Forbidden"});
          }
     } catch (error) {
          console.error(error.message);

          if (error.name == 'ValidationError') return res.status(400).json({message: error.message});
          return res.status(500).json({message: "Error!"});
     }
}

export const updateActivityFields = async (req, res) => { //title, description, location, and type
     try {
          console.log("user role", req.user.role);
          const { role } = req.user;

          if (role === 'admin') {
               const { id } = req.params;
               const { title, description, location, activityType, newWorkerId, status } = req.body; 
          
               const fieldsToUpdate = {};
               const updateQuery = {};

               if (title != null) fieldsToUpdate.title = title;
               if (description != null) fieldsToUpdate.description = description;
               if (location != null) fieldsToUpdate.location = location;
               if (activityType != null) fieldsToUpdate.activityType = activityType;
               if (status != null) fieldsToUpdate.status = status;

               if (Object.keys(fieldsToUpdate).length > 0) {
                    updateQuery.$set = fieldsToUpdate;
               }

               if (newWorkerId != null) updateQuery.$addToSet = { assignedWorkers: newWorkerId };

               const updatedActivity = await Activity.findByIdAndUpdate(id, updateQuery , {new: true, runValidators: true});
               if (!updatedActivity) return res.status(404).json({message: "Activity not found"});

               res.status(200).json({message: "Updated activity succesfully", data: updatedActivity});
          } else {
               return res.status(403).json({message: "Forbidden"});
          }
     } catch (error) {
          console.error(error.message);

          if (error.name == 'ValidationError') return res.status(400).json({message: error.message});
          return res.status(500).json({message: "Error!"});
     }
}

export const deleteActivity = async (req, res) => {
     try {
          console.log("user role", req.user.role);
          const { role } = req.user;
          
          if (role === 'admin') {
               const { id } = req.params;
               const deletedActivity = await Activity.findByIdAndDelete(id);

               if (!deletedActivity) return res.status(404).json({message: "Not Found"});

               res.status(200).json({message: "Succesfully deleted Activity", data: deletedActivity});
          }  else {
               return res.status(403).json({message: "Forbidden"});
          }
     } catch (error) {
          console.error(error.messsage);
          if (error.name == 'ValidationError') return res.status(400).json({message: error.message});
          return res.status(500).json({message: "Error!"});
     }
}