import { Handler } from "express";
import Joi from "joi";
import { CustomError } from "../error/error.model";

class validationMiddleware {
    validate = (schema: Joi.AnySchema): Handler => (req, res, next) => {

         const validation = schema.validate(req.body,{abortEarly: false});
         //if you want to get just the top error remove {abortEarly: false}

         if(!validation.error){
            next();
            return;
         }
        next(new CustomError(validation.error.message, 400));
        return;
    }
}

export default new validationMiddleware();