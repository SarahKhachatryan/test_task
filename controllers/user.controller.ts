import { Logger } from "../logger/api.logger";
import { UserRepository } from "../repository/user.repository";
import { Handler } from "express";
import { CustomError } from "../error/error.model";

export class UserController {
    private userRepository: UserRepository;
    private logger: Logger;

    constructor() {
        this.userRepository = new UserRepository();
        this.logger = new Logger();
    }

    getAllUsers: Handler = async (req, res, next) => {
        try {
            const users = await this.userRepository.getAllUsers(req.query);
            const message = req.query? 'Get users.': 'Get users with query.';
            this.logger.info(message, {req, res}, req.correlationId())
            res.send(users);
        } catch (e: any) {
            next(new CustomError(e.message))
        }

    }

    createUser: Handler = async (req, res, next) => {
        try {

            const user = await this.userRepository.createUser(req.body);

            this.logger.info('User created.', {req, res}, req.correlationId());
            res.status(201).send(user);


        } catch (e: any) {
            next(new CustomError(e.message))
        }

    }

    getUser: Handler = async (req, res, next) => {
        try {
            const user = await this.userRepository.getUser(Number(req.params.id))
            if (!user) {
                return next((new CustomError('not found', 404)));
            }
            this.logger.info('Get user by id.', {req, res}, req.correlationId());
            res.send(user);

        } catch (e: any) {
            next(new CustomError(e.message))
        }

    }

    updateUser: Handler = async (req, res, next) => {
        try {
            const response = await this.userRepository.updateUser(Number(req.params.id), req.body);

            if(response[0] === 0){
                next(new CustomError('not found', 404));
                return;
            }
            this.logger.info('User updated.', {req, res}, req.correlationId())
            res.send('User updated.');
        } catch (e: any) {
            next(new CustomError(e.message))
        }
    }

    deleteUser: Handler = async (req, res, next) => {
        try {
            const response = await this.userRepository.deleteUser(Number(req.params.id));
            if(response === 0){
                next(new CustomError('not found', 404));
                return;
            }
            this.logger.info('User deleted.',{req, res}, req.correlationId())
            res.send('User deleted.')
        } catch (e: any) {
            next(new CustomError(e.message))
        }
    }
}