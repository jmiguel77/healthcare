import {DataTypes} from 'sequelize';

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
}
