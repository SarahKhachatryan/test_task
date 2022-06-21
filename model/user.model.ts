import { DataTypes, Sequelize } from "sequelize";

  function createMyUserModel (sequelize: Sequelize) {
  
  const myUser = sequelize.define('myUser',{
  
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [3,20]
      }
    },
  
    lastname: {
      type: DataTypes.STRING,
      validate:{
        len: [3,20]
      }
   },
  
    age:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:18,
        max:99
      }
    },
  },
    {
    paranoid: true
  },
  );

  return myUser;
  
}
module.exports =  createMyUserModel;