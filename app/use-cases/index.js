import dataAccess from '../data-access/index.js';
import {UsersUsecases} from './users.usecases.js';
import {DrugsUseCases} from "./drugs.usecases.js";

const userUseCases = new UsersUsecases(dataAccess.userRepository);
const drugsUseCases = new DrugsUseCases(dataAccess.drugRepository);

export default {
    userUseCases,
    drugsUseCases
}
