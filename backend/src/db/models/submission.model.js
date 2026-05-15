import {Schema, model} from "mongoose";
const submissionSchema = new Schema({
  activityId: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
  },

  fieldWorkerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  data: {
    type: String,
  },

  ngoId:{
    type: Schema.Types.ObjectId,
    ref: "NGO",
  }
  
}, { timestamps: true });

export const Submission =  model('submission', submissionSchema);
