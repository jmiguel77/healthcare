import {Sequelize} from 'sequelize';
import {UserRepository} from './user.repository.js';
import {DrugRepository} from './drug.repository.js';
import {VaccinationRepository} from "./vaccination.repository.js";

const sequelize = new Sequelize(
    'healthcaredb',
    'mono',
    'mono',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log
    }
);

const userRepository = new UserRepository(sequelize);
const drugRepository = new DrugRepository(sequelize);
const vaccinationRepository = new VaccinationRepository(sequelize);

export default {
    userRepository,
    drugRepository,
    vaccinationRepository
}
