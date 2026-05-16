import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../db/models/user.model.js';

dotenv.config();

export const verifyToken = async (req, res, next) => {
     try {
          const token = req.cookies.jwt;
          console.log(token);

          if (!token) return res.status(401).json({message: "Unauthorized, missing token"});

          const user = jwt.verify(token, process.env.JWT_SECRET); 
          console.log(user.role);
          const userUpdated = await User.findById(user.id);
          console.log(userUpdated);
          req.user = userUpdated;
          next();
     } catch (error) {
          console.error(error.message);
          return res.status(401).json({message: "Invalid or expired token"});
     }
}

export const verifyRole = (req,res,next) => {
// export const verifyAdminRole = (req,res,next) => {
try {
          console.log("HERE");
          const token = req.cookies.jwt;
          console.log(token);
          if (!token) return res.status(401).json({message: "Unauthorized, missing token"});
          const user = jwt.verify(token, process.env.JWT_SECRET);

          console.log(user);
          if (!user || user.role !== "admin") {
               return res.status(403).json({message: "Access denied, admin role required"});
          }
          req.user = user;
          console.log(req.user.id);
          next();
     } catch (error) {
          console.error(error.message);
          return res.status(401).json({message: "Invalid or expired token"});
     }
}