import User from '../models/user.js';
import passwordUtils from '../utils/password.utils.js';
import tokenUtils from '../utils/token.utils.js';

export class UsersUseCases {
    constructor(userRepository) {
        this.repository = userRepository;
    }

    addUser = async (data) => {
        if (data === undefined || data === null) {
            throw 'Data received is empty';
        }
        if (data.email === undefined || data.email === null
            || data.password === undefined || data.password === null) {
            throw 'Email and password are required';
        }
        const user = new User(null, data.name, data.email, passwordUtils.encryptPassword(data.password));
        await this.repository.add(user);
    }

    validateUser = async (data) => {
        if (data.email === undefined || data.email === null || data.password === undefined || data.password === null) {
            throw 'Email and password are required';
        }
        const foundUser = await this.repository.fetch(data.email);
        if (!foundUser) {
            throw 'Invalid credentials';
        }
        const credentialsAreValid = passwordUtils.validatePassword(data.password, foundUser.password);
        if (!credentialsAreValid) {
            throw 'Invalid credentials';
        }
        const user = new User(foundUser.id, foundUser.name, foundUser.email);
        return tokenUtils.generateToken(user);
    }
}
