import {expect, jest, test} from '@jest/globals';
import {DrugsUseCases} from '../app/use-cases/drugs.usecases.js';
import {Drug} from '../app/models/drug.js';

const drugRepository = {
    add: (drug) => {
    }
}

test('should report error for null data', () => {
    const drugsUseCases = new DrugsUseCases(drugRepository);
    const drug = null;
    drugsUseCases.addDrug(drug)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Data received is empty')).not.toBe(-1);
        })
});

test('should report error for empty properties', () => {
    const drugsUseCases = new DrugsUseCases(drugRepository);
    const drug = new Drug();
    drugsUseCases.addDrug(drug)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('must not be null')).not.toBe(-1);
        })
});

test('should report error for invalid date', () => {
    const drugsUseCases = new DrugsUseCases(drugRepository);
    const drug = new Drug(null, 'mock drug', true, 1, 10, '1234567890');
    drugsUseCases.addDrug(drug)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('must be a string in the format')).not.toBe(-1);
        })
});

test('should not report any error', async () => {
    const drugsUseCases = new DrugsUseCases(drugRepository);
    const drug = new Drug(null, 'mock drug', true, 1, 10, '01-01-2000 00:00:00');
    const error = await drugsUseCases.addDrug(drug);
    expect(error).toBe(undefined);
});
