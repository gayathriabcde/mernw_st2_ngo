import { OAuth2Client } from 'google-auth-library';
import { User } from '../db/models/user.model.js';
import jwt from 'jsonwebtoken';

const oAuthClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

export const loginWithGoogle = async (req, res) => {
    try {
        const { token } = req.body;
        if(!token) {
            console.error("Google token not found.");
            return res.status(400).json({ message: "Bad Request"});
        }

        let ticket;
        try {
            console.log("Verifying the token of user with google.");
            console.log("Client", process.env.GOOGLE_CLIENT_ID)
            ticket = await oAuthClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

        } catch (error) {
            console.error("Error in validating google token", error.message);
            return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in validating google token id"});
        }

        const { 
            email, 
            email_verified,
            picture,
            given_name: firstName, 
            family_name: lastName 
        } = ticket.getPayload();

        if (!email || !email_verified) return res.status(400).json({ message: 'Google account email not available or not verified' });

        console.log("Searching for user in MongoDB");
        let user = await User.findOne({ email });

        if(!user) {
            console.log("User not found. Creating a new user.");
            try {
                user = await User.create({
                    name: `${firstName} ${lastName ?? ""}`.trim(),
                    email: email,
                    phone: undefined,
                    role: 'field-worker',
                    ngoId: undefined,
                    avatar: picture
               });

            } catch (error) {
                console.log("Error occurred while creating the user in mongodb in loginWithGoogle", error.message);
                return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Something went wrong while creating the user."});
            }
        } 

        console.log("Generating the jwt token for user.");
        const userToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

        console.log("Token Generated. Setting the token to cookies as jwt.");
          res.cookie("jwt", userToken, { 
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true, 
                    sameSite: 'lax' 
          });

        return res.status(200).json({ 
            status: "SUCCESS", 
            message: "Login Successfully!",
            data: { 
               name: user.name, 
               email: user.email, 
               phone: user.phone,
               token: userToken, 
               avatar: user.avatar, 
               ngoId: user.ngoId
            } 
        });

    } catch (error) {
        console.error("Error in loginWithGoogle", error.message);
        return res.status(500).json({ message: "Something Went Wrong", error: error.message });
    }
}