import {Drug} from '../models/drug.js';

export class DrugsUseCases {
    constructor(drugRepository) {
        this.repository = drugRepository;
    }

    addDrug = async (data) => {
        if (data === undefined || data === null) {
            throw 'Data received is empty';
        }
        let availableAt = null;
        if (typeof data.availableAt === 'string') {
            availableAt = new Date(data.availableAt);
        } else {
            throw 'availableAt must be a string in the format dd-mm-yyyy hh:mm:ss';
        }

        const drug = new Drug(null, data.name, data.approved, data.minDose, data.maxDose, availableAt);
        await this.repository.add(drug);
    }
}
