import {DataTypes} from 'sequelize';

export class DrugRepository {
    drugEntity;

    constructor(sequelize) {
        this.sequelize = sequelize;

        this.drugEntity = sequelize.define('Drug', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            approved: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            minDose: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            maxDose: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            availableAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });

        this.drugEntity.sync().then();
    }

    add = async (drug) => {
        await this.drugEntity.create({
            name: drug.name,
            approved: drug.approved,
            minDose: drug.minDose,
            maxDose: drug.maxDose,
            availableAt: drug.availableAt
        });
    }
}
