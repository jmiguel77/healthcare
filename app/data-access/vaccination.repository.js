import {DataTypes} from 'sequelize';
import {Vaccination} from "../models/vaccination.js";

export class VaccinationRepository {
    vaccinationEntity;

    constructor(sequelize) {
        this.sequelize = sequelize;

        this.vaccinationEntity = sequelize.define('Vaccination', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dose: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            drugId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        });

        this.vaccinationEntity.sync().then();
    }

    add = async (vaccination) => {
        await this.vaccinationEntity.create({
            name: vaccination.name,
            dose: vaccination.dose,
            date: vaccination.date,
            drugId: vaccination.drugId
        });
    }

    fetch = async () => {
        const entities = await this.vaccinationEntity.findAll();
        const result = [];
        entities.forEach((entity) => {
            result.push(this.#toVaccination(entity));
        })
        return result;
    }

    update = async (id, vaccination) => {
        const entity = await this.#fetchEntity(id);
        entity.name = vaccination.name;
        entity.dose = vaccination.dose;
        entity.date = vaccination.date;
        entity.drugId = vaccination.drugId;
        await entity.save();
    }

    delete = async (id) => {
        const entity = await this.#fetchEntity(id);
        await entity.destroy();
    }

    #fetchEntity = async (id) => {
        const entity = await this.vaccinationEntity.findOne({
            where: {id}
        });
        if (!entity) {
            throw 'Not found';
        }
        return entity;
    }

    #toVaccination = (entity) => {
        return new Vaccination(
            entity.dataValues.id,
            entity.dataValues.name,
            entity.dataValues.dose,
            entity.dataValues.date,
            entity.dataValues.drugId
        );
    }
}
