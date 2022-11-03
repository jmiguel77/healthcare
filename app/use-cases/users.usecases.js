import User from '../models/user.js';

export class UsersUsecases {
    constructor(userRepository) {
        this.repository = userRepository;
    }

    addUser = async (data) => {
        if (data === undefined || data === null) {
            throw 'Data received is emtpy'
        }
        const user = new User(null, data.name, data.email, data.password);
        await this.repository.add(user);
    }
}
