import { Submission } from "../db/models/submission.model.js";
import { User } from "../db/models/user.model.js";
export const getAllSubmissions = async (req, res) => {
  try {

    console.log("user role", req.user.role);
    const { role, id } = req.user;
    if (role === "admin") {

      const responseSubmissions = await Submission.find({})
        // .populate("activityId")
        // .populate("fieldWorkerId");

      if (!responseSubmissions || responseSubmissions.length === 0) {
        return res.status(404).json({
          message: "No submissions found"
        });
      }

      return res.status(200).json({
        message: "All submissions retrieved successfully",
        data: responseSubmissions,
      });

    }
    else if (role === "field-worker") {

      const responseSubmissions = await Submission.find({
        fieldWorkerId: id,
      })
        .populate("activityId")
        .populate("fieldWorkerId");
      
      console.log(responseSubmissions);
      console.log(id);
      return res.status(200).json({
        message: "User submissions retrieved successfully",
        data: responseSubmissions,
      });
    }

    else {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createSubmission = async (req, res) => {
  try {

    const { activityId, data } = req.body;

    const newSubmission = await Submission.create({
      activityId,
      data,

      fieldWorkerId: req.user.id,
    });

    res.status(201).json({
      message: "Submission created successfully",
      data: newSubmission,
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateSubmission = async (req, res) => {
    try{
        const {id} = req.params;
        const {data} = req.body;
        const submission = await Submission.findByIdAndUpdate(id, { data }, { new: true });
        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }
        res.status(200).json({
            message: "Submission updated successfully",
            data: submission
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}
export const deleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission.findByIdAndDelete(id);
        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }
        res.status(200).json({
            message: "Submission deleted successfully",
            data: submission
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
}