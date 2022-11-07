import {DataTypes} from 'sequelize';
import {Drug} from '../models/drug.js';

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

    fetch = async () => {
        const entities = await this.drugEntity.findAll();
        const drugs = [];
        entities.forEach((entity) => {
            drugs.push(this.#toDrug(entity));
        });
        return drugs;
    }

    fetchById = async (id) => {
        const entity = await this.#fetchEntity(id);
        return this.#toDrug(entity);
    }

    update = async (id, drug) => {
        const entity = this.#fetchEntity(id);
        entity.name = drug.name;
        entity.approved = drug.approved;
        entity.minDose = drug.minDose;
        entity.maxDose = drug.maxDose;
        entity.availableAt = drug.availableAt;
        await entity.save();
    }

    delete = async (id) => {
        const entity = this.#fetchEntity(id);
        await entity.destroy();
    }

    #fetchEntity = async (id) => {
        const entity = await this.drugEntity.findOne({
            where: {
                id
            }
        });
        if (!entity) {
            throw 'Not found';
        }
        return entity;
    }

    #toDrug = (entity) => {
        return new Drug(
            entity.dataValues.id,
            entity.dataValues.name,
            entity.dataValues.approved,
            entity.dataValues.minDose,
            entity.dataValues.maxDose,
            entity.dataValues.availableAt);
    }
}
