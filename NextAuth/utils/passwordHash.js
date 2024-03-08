import {hash, compare} from 'bcrypt'

export function encryptPassword(password) {
    const hashedPw = hash(password, 10);
    return hashedPw
}

export async function checkPassword(password, hashedPw) {
    const match = await compare(password, hashedPw);
    return match;
}