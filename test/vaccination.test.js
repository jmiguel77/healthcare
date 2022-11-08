import {expect, jest, test} from '@jest/globals';
import {VaccinationsUseCases} from '../app/use-cases/vaccinations.usecases.js';
import {Vaccination} from "../app/models/vaccination.js";
import {Drug} from "../app/models/drug";

const vaccinationRepository = {
    add: (vaccination) => {
    }
};
const drugRepository = {
    fetchById: (id) => {
        return new Drug(id, 'mock drug', true, 1, 10, new Date('01-01-2022 00:00:00'));
    }
};
const drugRepositoryWithUnapprovedDrug = {
    fetchById: (id) => {
        return new Drug(id, 'mock drug', false, 1, 10, new Date('01-01-2022 00:00:00'));
    }
};

test('should report error for null data', () => {
    const vaccinationUseCases = new VaccinationsUseCases(vaccinationRepository, drugRepository);
    const vaccination = null;
    vaccinationUseCases.addVaccination(vaccination)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Data received is empty')).not.toBe(-1);
        })
});

test('should report error for required properties', () => {
    const vaccinationUseCases = new VaccinationsUseCases(vaccinationRepository, drugRepository);
    const vaccination = new Vaccination();
    vaccinationUseCases.addVaccination(vaccination)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('cannot be null')).not.toBe(-1);
        })
});

test('should report error for invalid date', () => {
    const vaccinationUseCases = new VaccinationsUseCases(vaccinationRepository, drugRepository);
    const vaccination = new Vaccination(null, 'Some User', 2, '1234567890', 1);
    vaccinationUseCases.addVaccination(vaccination)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Vaccination date must be a string in the format')).not.toBe(-1);
        })
});

test('should report error for dose', () => {
    const vaccinationUseCases = new VaccinationsUseCases(vaccinationRepository, drugRepository);
    const vaccination = new Vaccination(null, 'Some User', 100, '31-12-2022', 1);
    vaccinationUseCases.addVaccination(vaccination)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Vaccination dose must be between')).not.toBe(-1);
        })
});

test('should report error for date', () => {
    const vaccinationUseCases = new VaccinationsUseCases(vaccinationRepository, drugRepository);
    const vaccination = new Vaccination(null, 'Some User', 2, '31-12-2020', 1);
    vaccinationUseCases.addVaccination(vaccination)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Vaccination date is not valid')).not.toBe(-1);
        })
});

test('should report error for drug not approved', () => {
    const vaccinationUseCases = new VaccinationsUseCases(vaccinationRepository, drugRepositoryWithUnapprovedDrug);
    const vaccination = new Vaccination(null, 'Some User', 2, '05-01-2022', 1);
    vaccinationUseCases.addVaccination(vaccination)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Drug is not yet approved')).not.toBe(-1);
        })
});

test('should not report any errors', async () => {
    const vaccinationUseCases = new VaccinationsUseCases(vaccinationRepository, drugRepository);
    const vaccination = new Vaccination(null, 'Some User', 2, '05-01-2022', 1);
    let error = await vaccinationUseCases.addVaccination(vaccination);
    expect(error).toBe(undefined);
});
