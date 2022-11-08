import bcrypt from 'bcryptjs';

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, parseInt(process.env.HC_PASSWORD_SALT, 10));
}

const validatePassword = (plainPassword, encryptedPassword) => {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
}

export default {encryptPassword, validatePassword};
