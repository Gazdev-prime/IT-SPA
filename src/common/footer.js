import $ from 'jquery';

export const footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return $(`
        <footer>
            <center><small>Wszelkie prawa zastrzeżone &copy; ${year}</small></center>
        </footer>
    `);
};
