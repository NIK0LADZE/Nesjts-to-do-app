import * as bcrypt from 'bcrypt';

export function bcryptPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}