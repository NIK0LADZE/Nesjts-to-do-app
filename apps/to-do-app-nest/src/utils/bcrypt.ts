import * as bcrypt from 'bcrypt';

export const bcryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}