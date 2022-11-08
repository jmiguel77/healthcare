import {expect, test} from '@jest/globals';
import {UsersUseCases} from '../app/use-cases/users.usecases.js';
import User from '../app/models/user.js';
import passwordUtils from '../app/utils/password.utils.js';
import tokenUtils from "../app/utils/token.utils.js";

const userRepository = {
    add: (data) => {
    },
    fetch: (email) => {
        return new User(0, 'Mock User', 'mockuser@mail.com', passwordUtils.encryptPassword('password'));
    }
};

const userRepositoryWithoutUser = {
    add: (data) => {
    },
    fetch: (email) => {
        return null;
    }
};

test('should report error for null data', () => {
    const usersUseCases = new UsersUseCases(userRepository);
    const user = null;
    usersUseCases.addUser(user)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Data received is empty')).not.toBe(-1);
        });
});

test('should report error for null email and password', () => {
    const usersUseCases = new UsersUseCases(userRepository);
    const user = new User();
    usersUseCases.addUser(user)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('are required')).not.toBe(-1);
        });
});

test('should not report errors adding users', async () => {
    const usersUseCases = new UsersUseCases(userRepository);
    const user = new User(null, 'New User', 'newuser@mail.com', 'password');
    const errors = await usersUseCases.addUser(user);
    expect(errors).toBe(undefined);
});

test('should report error for null email and password', () => {
    const usersUseCases = new UsersUseCases(userRepository);
    const user = new User();
    usersUseCases.validateUser(user)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Email and password are required')).not.toBe(-1);
        });
});

test('should report error for not existing user', () => {
    const usersUseCases = new UsersUseCases(userRepositoryWithoutUser);
    const data = {
        email: 'some@mail.com',
        password: 'password'
    };
    usersUseCases.validateUser(data)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Invalid credentials')).not.toBe(-1);
        });
});

test('should report error for not matching passwords', () => {
    const usersUseCases = new UsersUseCases(userRepository);
    const data = {
        email: 'mockuser@mail.com',
        password: 'otherpassword'
    };
    usersUseCases.validateUser(data)
        .catch((err) => {
            expect(err).not.toBeNull();
            expect(typeof err === 'string').toBe(true);
            expect(err.indexOf('Invalid credentials')).not.toBe(-1);
        });
});

test('should produce token', async () => {
    const usersUseCases = new UsersUseCases(userRepository);
    const data = {
        email: 'mockuser@mail.com',
        password: 'password'
    };
    const token = await usersUseCases.validateUser(data);
    expect(token).not.toBeNull();
    const validToken = tokenUtils.isValidToken(token);
    expect(validToken).toBe(true);
});
