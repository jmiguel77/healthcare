import User from "../models/user.js";
import {DataTypes} from "sequelize";

export class UserRepository {
    userEntity;

    constructor(sequelize) {
        this.sequelize = sequelize;

        this.userEntity = sequelize.define('User', {
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

        this.userEntity.sync().then();
    }

    addUser = async (user) => {
        await this.userEntity.create({
            name: user.name,
            email: user.email,
            password: user.password
        });
    }
}
