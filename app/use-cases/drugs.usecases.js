import {Drug} from '../models/drug.js';

export class DrugsUseCases {
    constructor(drugRepository) {
        this.repository = drugRepository;
    }

    addDrug = async (data) => {
        const drug = this.validateAndTransform(data);
        await this.repository.add(drug);
    }

    fetchDrugs = async () => {
        return await this.repository.fetch();
    }

    updateDrug = async (id, data) => {
        const drug = this.validateAndTransform(data);
        await this.repository.update(id, drug);
    }

    deleteDrug = async (id) => {
        await this.repository.delete(id);
    }

    validateAndTransform = (data) => {
        if (data === undefined || data === null) {
            throw 'Data received is empty';
        }
        if (data.name === undefined || data.name === null
            || data.approved === undefined || data.approved === null
            || data.minDose === undefined || data.minDose === null
            || data.maxDose === undefined || data.maxDose === null
            || data.availableAt === undefined || data.availableAt === null) {
            throw 'name, approved, minDose, maxDose and availableAt must not be null';
        }

        let availableAt = null;
        if (typeof data.availableAt === 'string') {
            availableAt = new Date(data.availableAt);
        } else {
            throw 'availableAt must be a string in the format mm-dd-yyyy hh:mm:ss';
        }

        return new Drug(null, data.name, data.approved, data.minDose, data.maxDose, availableAt);
    }
}
