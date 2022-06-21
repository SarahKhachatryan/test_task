import { connect } from "../config/db.config";

export class UserRepository {

    private db: any = {};
    private userRespository: any;

    constructor() {
        this.db = connect();
        this.userRespository = this.db.sequelize.getRepository('myUser');
    }

    async getAllUsers(query:object){
            if((query as any)?.name){
                
  const filteredUsers = this.userRespository.findAll({
      
      where:{
            firstname: (query as any)?.name
      }})
           return filteredUsers;
    }

             const users = await this.userRespository.findAll();
             return users;
    }

   async createUser(user: object){
         const newUser = await  this.userRespository.create(user);
         return newUser;
   }
   
   async getUser(userId:number){
        const user = await this.userRespository.findOne({
            where:{
                id: userId
            }
        })
        return user;
   }

   async updateUser(userId: number, data: object){

        const response = await this.userRespository.update(data, {
            where: {id: userId}
        })

        return response;
   }
   async deleteUser(userId: number){

          const response = await this.userRespository.destroy({
              where: {id: userId
            }});

          return response;
   }

}