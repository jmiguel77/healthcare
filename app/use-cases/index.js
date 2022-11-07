import dataAccess from '../data-access/index.js';
import {UsersUseCases} from './users.usecases.js';
import {DrugsUseCases} from "./drugs.usecases.js";
import {VaccinationsUseCases} from "./vaccinations.usecases.js";

const userUseCases = new UsersUseCases(dataAccess.userRepository);
const drugsUseCases = new DrugsUseCases(dataAccess.drugRepository);
const vaccinationsUseCases = new VaccinationsUseCases(dataAccess.vaccinationRepository, dataAccess.drugRepository);

export default {
    userUseCases,
    drugsUseCases,
    vaccinationsUseCases
}
