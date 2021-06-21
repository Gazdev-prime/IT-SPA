import axios from 'axios';

export const required = value => {
    //                         OR                OR
    return value === undefined || value === null || value === '';
};

export const short = value => {
    //                              AND
    return typeof value === 'string' && value.length < 6;
};

export const nonUnique = async value => {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;
    const logins = users.map(user => user.l);
    const result = logins.includes(value);
    return result;
};

export const passwordDiffer = (password1, password2) => {
    return password1 !== password2;
}
