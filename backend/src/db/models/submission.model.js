import {Schema, model} from "mongoose";
const submissionSchema = new Schema({
  activityId: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
  },

  fieldWorkerId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  data: {
    type: String,
  },

  ngoId:{
    type: Schema.Types.ObjectId,
    ref: "ngo",
  }
  
}, { timestamps: true });

export const Submission =  model('submission', submissionSchema);
