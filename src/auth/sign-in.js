import axios from 'axios';

export const checkLoginData = async value => {
    const { login, password } = value;
    const { data } = await axios.get(`http://localhost:3000/users?l=${login}&p=${password}`);
    const user = data[0];
    return user;
};
