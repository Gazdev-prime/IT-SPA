import $ from 'jquery';
import { checkLoginData } from '../../auth/sign-in';

export const signIn = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2><center>SIGN IN OR CREATE ACCOUNT</center></h2><br>');
    const section = $(`
        <section>
            Loading...
        </section>
    `);
    const form = $(`
        <div class="row w-100 d-flex justify-content-center">
            <div class="col-5">
                <form name="signIn" autocomplete="off" novalidate>
                    <center><p id="nonExisting" class="text-danger">Login or password is incorrect.</p></center>
                    <div class="mb-3">
                        <label for="login" class="form-label">Login</label>
                        <input id="login" type="email" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input id="password" type="password" class="form-control">
                    </div>
                    <center><button type="button" class="btn btn-outline-dark" id="signIn-btn">SIGN IN</button></center>
                </form>
            </div>
            <div class="col-5 d-flex justify-content-center align-items-center">
                <button type="button" id="signUp-btn" class="btn btn-outline-dark">CREATE ACCOUNT</button>
            </div>
        </div>
    `);
    const errorMessages = {
        nonExisting: form.find('#nonExisting')
    };
    
    errorMessages.nonExisting.hide();

    form.find("#signIn-btn").on('click', async event => {
        try {
            event.preventDefault();

            const login = form.find('#login').val();
            const password = form.find('#password').val();

            const user = await checkLoginData({ login, password });

            user ? errorMessages.nonExisting.hide() : errorMessages.nonExisting.show();
            
            if (user) {
                const { avatar } = user;
                const img = `${require('../../images/user.png')}`;
                const profilePic = avatar || img;
                $('#userAvatar').attr('src', profilePic);

                const navigationEvent = new CustomEvent('navigation', {
                    detail: {
                        view: 'home',
                    }
                });
                document.dispatchEvent(navigationEvent);   
            }
        } catch (error) {
            console.log(error);
        }
    });

    form.find('#signUp-btn').on('click', event => {
        event.preventDefault();

        const navigationEvent = new CustomEvent('navigation', {
            detail: {
                view: 'signUp',
            }
        });

        document.dispatchEvent(navigationEvent);
    });

    section.empty().append(form);
    fragment.append(h2, section);

    return fragment;
};
