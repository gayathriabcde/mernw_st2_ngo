import {Schema, model} from "mongoose";
const submissionSchema = new Schema({
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },

  fieldWorkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  data: {
    type: String,
  },
  
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);