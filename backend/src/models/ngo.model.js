import {Schema, model} from "mongoose";

const ngoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  region: {
    type: String,
  },

  contactEmail: {
    type: String,
  },

  contactPhone: {
    type: String,
  },
});

export const NGO =  model('ngo', ngoSchema);
