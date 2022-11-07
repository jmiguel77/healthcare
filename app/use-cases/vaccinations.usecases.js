import {Vaccination} from '../models/vaccination.js';

export class VaccinationsUseCases {
    constructor(vaccinationRepository, drugRepository) {
        this.vaccinationRepository = vaccinationRepository;
        this.drugRepository = drugRepository
    }

    addVaccination = async (data) => {
        const vaccination = await this.#validateAndTransform(data);
        this.vaccinationRepository.add(vaccination);
    }

    fetchVaccinations = async () => {
        return await this.vaccinationRepository.fetch();
    }

    updateVaccination = async (id, data) => {
        const vaccination = await this.#validateAndTransform(data);
        await this.vaccinationRepository.update(id, vaccination);
    }

    deleteVaccination = async (id) => {
        await this.vaccinationRepository.delete(id);
    }

    #validateAndTransform = async (data) => {
        if (data === undefined || data === null) {
            throw 'Data received is empty';
        }
        let date = null;
        if (typeof data.date === 'string') {
            date = new Date(data.date);
        } else {
            throw 'Vaccination date must be a string in the format mm-dd-yyyy hh:mm:ss';
        }

        const vaccination = new Vaccination(null, data.name, data.dose, date, data.drugId);
        const drug = await this.drugRepository.fetchById(vaccination.drugId);

        if (vaccination.dose < drug.minDose || vaccination.dose > drug.maxDose) {
            throw `Vaccination dose must be between ${drug.minDose} and ${drug.maxDose}`;
        }

        if (vaccination.date < drug.availableAt) {
            throw `Vaccination date is not valid. Must be after ${drug.availableAt}`
        }

        if (!drug.approved) {
            throw 'Drug is not yet approved';
        }

        return vaccination;
    }
}
