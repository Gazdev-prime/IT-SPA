import $ from 'jquery';

// nasz callback to, tzw. higher-order function
export function callback(view) {
    return function (event) {
        event.preventDefault();

        const navigationEvent = new CustomEvent('navigation', {
            detail: {
                view: view
            }
        });

        document.dispatchEvent(navigationEvent);
    }
}

export const navigation = () => {
    const fragment = $(document.createDocumentFragment());
    const nav = $('<nav id="navbar" class="navbar sticky-top navbar-light"></nav>');
    const container = $(`
        <div id="navbarContainer" class="container-fluid d-flex justify-content-between">
        </div>
    `);

    const homeButton = $(`
        <button type="button" class="btn btn-link" id="home">IT SPA</button>
    `);
    homeButton.on('click', callback('home'), window.scrollTo(0,0));

    const userPicture = $(`
        <a class="navbar-brand">
            <img class="rounded-circle" id="userAvatar" src="${require('../images/user.png')}" alt="User" width="75px" height="75px">
        </a>
    `);
    userPicture.on('click', callback('auth'));

    const menu = $(`
        <div class="btn-group" role="group">
        </div>
    `);
    const roomsButton = $('<button type="button" id="rooms" class="btn btn-link">ROOMS</button>');
    roomsButton.on('click', callback('rooms'));

    const treatmentsButton = $('<button type="button" id="treatments" class="btn btn-link">SPA & WELLNESS</button>');
    treatmentsButton.on('click', callback('treatments'));

    const cartButton = $('<button type="button" id="cart" class="btn btn-link"><i class="bi bi-cart-fill"></i></button>');
    cartButton.on('mouseenter', callback('cart'));
    
    menu.append(roomsButton, treatmentsButton, cartButton)
    container.append(homeButton, menu, userPicture);
    nav.append(container);
    fragment.append(nav);
    
    return fragment;
};
