import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyRole = (req, res, next) => {
     try {
          const token = req.cookies.jwt;
          console.log(token);

          if (!token) return res.status(401).json({message: "Unauthorized, missing token"});

          const user = jwt.verify(token, process.env.JWT_SECRET); 
          console.log(user);

          req.user = user;

          next();
     } catch (error) {
          console.error(error.message);
          res.status(401).json({message: "Invalid or expired token"});
     }
}