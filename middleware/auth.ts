import { Handler } from "express";
import { CustomError } from "../error/error.model";

class authMiddleware{

    auth: Handler = (req, res, next) => {

        const authHeader = req.headers.authorization;

        if (authHeader && authHeader !== null && authHeader.split(' ')[0]==='Bearer')
        {
            next();
        }
       else{
           next(new CustomError('No Bearer token is present.',401));
       }
    }

}

export default new authMiddleware();