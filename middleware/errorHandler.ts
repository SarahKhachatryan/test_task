import {ErrorRequestHandler } from "express";
import { CustomError } from "../error/error.model";

const handleError: ErrorRequestHandler = (
    err: CustomError,
    req,
    res) => {

    const { message, status = 500 } = err

    res.status(status).send(
        {
            status,
            message,
        });
}

export default handleError;