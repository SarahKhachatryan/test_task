import { Sequelize } from 'sequelize-typescript';

export const connect = () => {

    const hostName = process.env.HOST;
    const userName: any = process.env.USER;
    const password: any = process.env.PASSWORD;
    const database: any = process.env.DB;
    const dialect: any = process.env.DIALECT;

    console.log('dialect  ', dialect)

    const operatorsAliases: any = false;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect,
        operatorsAliases,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    require('../model/user.model')(sequelize);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    return db;

}