import {Schema, model} from 'mongoose';

const activitySchema = new Schema({
     title: {
          type: String,
          required: true
     },
     description: {
          type: String,
     },
     activityType: {
          type: String,
     },
     location: {
          type: String,
          required: true
     },
     beneficiary: {
          name: {
               type: String,
               required: true
          },
          email: {
               type: String,
          },
          phone: {
               type: String,
               required: true
          }
     }, 
     ngo: {
          type: Schema.Types.ObjectId,
          ref : 'NGO',
     }, 
     assignedWorkers: [{
          type: Schema.Types.ObjectId,
          ref: 'User'
     }],
     status: {
          type: String,
          default: 'Pending',
     }
}, { timestamps: true });

export const Activity = model('Activity', activitySchema);