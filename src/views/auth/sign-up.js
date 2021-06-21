import $ from 'jquery';
import axios from 'axios';
import { required, short, nonUnique, passwordDiffer } from '../../auth/sign-up'

export const signUp = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2><center>SIGN UP</center></h2><br>');
    const section = $(`
        <section>
            Loading...
        </section>
    `);

    const form = $(`
        <div class="row w-100 d-flex justify-content-center">
            <div class="col-6">    
                <form name="signUp" autocomplete="off" novalidate>
                    <div class="mb-3">
                        <p id="signUp-success" class="text-success">Account created. Sign in to continue.</p>
                        <label for="login" class="form-label">Login</label>
                        <input id="login" type="email" class="form-control">
                        <p id="login-required" class="text-danger">Login is required.</p>
                        <p id="login-nonUnique" class="text-danger">Login is non unique.</p>
                    </div>
                    <div class="mb-3">
                        <label for="password1" class="form-label">Password</label>
                        <input id="password1" type="password" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="password2" class="form-label">Repeat password</label>
                        <input id="password2" type="password" class="form-control">
                        <p id="password-differ" class="text-danger">Passwords differ.</p>
                        <p id="password-required" class="text-danger">Password is required.</p>
                        <p id="password-short" class="text-danger">Password is too short.</p>
                    </div>
                    <div class="mb-3">
                        <label for="avatar" class="form-label">Avatar</label>
                        <input class="form-control" type="file" id="avatar">
                    </div>            
                    <center><button type="button" class="btn btn-outline-dark">SIGN UP</button></center>
                </form>
            </div>
        </div>
    `);

    const errorMessages = {
        login: {
            required: form.find('#login-required'),
            nonUnique: form.find('#login-nonUnique')
        },
        password: {
            required: form.find('#password-required'),
            short: form.find('#password-short'),
            differ: form.find('#password-differ')
        }
    };

    const successMessages = {
        userCreated: form.find('#signUp-success'),
    };
    
    // UKRYWAMY WSZYSTKIE WIADOMOSCI O BLEDACH ZANIM POKAZEMY FORMULARZ UZYTKOWNIKOWI
    errorMessages.login.required.hide();
    errorMessages.login.nonUnique.hide();
    errorMessages.password.required.hide();
    errorMessages.password.short.hide();
    errorMessages.password.differ.hide();
    successMessages.userCreated.hide();

    const uploadedFile = {
        avatar: '',
        get userAvatar() {
            return this.avatar;
        },
        set userAvatar(img) {
            this.avatar = img;
        }
    };

    form.find('#avatar').on('change', (event) => {
        const file = event.target.files[0]; 
        const reader = new FileReader();

        reader.onload = function() {
            uploadedFile.userAvatar = reader.result;
        };

        if (file) reader.readAsDataURL(file);
    });
    form.find('button').on('click', async event => {
        try {
            event.preventDefault();

            const login = form.find('#login').val();
            const password1 = form.find('#password1').val();
            const password2 = form.find('#password2').val();

            const loginIsRequired = required(login);
            const loginIsNonUnique = await nonUnique(login);
            const passwordIsRequired = required(password1) || required(password2);
            const passwordIsDifferent = passwordDiffer(password1, password2);
            const passwordIsShort = short(password1) || short(password2);

            loginIsRequired ? errorMessages.login.required.show() : errorMessages.login.required.hide();
            loginIsNonUnique ? errorMessages.login.nonUnique.show() : errorMessages.login.nonUnique.hide();
            passwordIsRequired ? errorMessages.password.required.show() : errorMessages.password.required.hide();
            passwordIsDifferent ? errorMessages.password.differ.show() : errorMessages.password.differ.hide();
            passwordIsShort ? errorMessages.password.short.show() : errorMessages.password.short.hide();
            successMessages.userCreated.hide();

            if (!loginIsRequired && !passwordIsRequired && !passwordIsShort && !loginIsNonUnique && !passwordIsDifferent) {
                await axios.post('http://localhost:3000/users', {
                    avatar: uploadedFile.userAvatar,
                    l: login,
                    p: password1
                });
                successMessages.userCreated.show();
            }
        } catch (error) {
            console.log(error);
        }
    });

    section.empty().append(form);
    fragment.append(h2, section);

    return fragment;
};
