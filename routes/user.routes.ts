import { Router } from 'express'
import { UserController } from '../controllers/user.controller';
import validation from '../middleware/validation';
import { createUserSchema, updateUserSchema } from '../schemas/user.schemas';

class Routes {
    public router: Router;
    public UserController: UserController;

    constructor() {
        this.router = Router();
        this.UserController = new UserController();

        this.router.get('/', this.UserController.getAllUsers)

        this.router.get('/:id', this.UserController.getUser);

        this.router.post('/',validation.validate(createUserSchema), this.UserController.createUser);

        this.router.put('/:id',validation.validate(updateUserSchema), this.UserController.updateUser);

        this.router.delete('/:id', this.UserController.deleteUser);

    }

}

export default Routes;