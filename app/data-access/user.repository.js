import {DataTypes} from 'sequelize';
import User from "../models/user.js";

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
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

        this.userEntity.sync().then();
    }

    add = async (user) => {
        await this.userEntity.create({
            name: user.name,
            email: user.email,
            password: user.password
        });
    }

    fetch = async (email) => {
        const foundUser = await this.userEntity.findOne({
            where: {
                email: email
            }
        });
        if (foundUser == null) {
            return null;
        }
        return new User(foundUser.id, foundUser.name, foundUser.email, foundUser.password);
    }
}
