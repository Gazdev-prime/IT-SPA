import $ from 'jquery';

export const header = () => {
    const title = 'IT SPA';

    return $(`
        <div class="card text-white">
            <center>
                <img class="img-fluid" id="mainPic" src="${require('../images/landscape.png')}" alt="IT SPA">
            </center>
            <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <p class="card-title" id="header">${title}</p>
            </div>
        </div>
    `);
};
