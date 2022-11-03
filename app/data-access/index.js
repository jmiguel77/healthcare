import {Sequelize, DataTypes} from 'sequelize';
import {UserRepository} from "./user.repository.js";

const sequelize = new Sequelize(
    'healthcaredb',
    'mono',
    'mono',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log
    }
);

const userRepository = new UserRepository(sequelize);

export default {
    userRepository
}
