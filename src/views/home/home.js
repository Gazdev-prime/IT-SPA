import $ from 'jquery';

export const home = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2><center>HOME</center></h2><br>');
    const p = $('<p><center>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</center></p>');

    fragment.append(h2, p);

    return fragment;
};
