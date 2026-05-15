import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
    },

    ngoId: {
        type: Schema.Types.ObjectId,
        ref: "NGO",
    },

    role: {
        type: String,
        enum: ["admin", "field-worker"],
        default: "field-worker",
    },
    avatar: {
        type: String,
        default: 'https://avatar.iran.liara.run/public'
    }
    
}, { timestamps: true })


export const User =  model('user', userSchema);

