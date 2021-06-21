import $ from 'jquery';
import { shoppingCart } from '../../cart/cart'

export const getCart = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2><center>SHOPPING CART</center></h2><br>');
    const section = $(`
        <section>
            Loading...
        </section>
    `);
    
    const cart = shoppingCart.fullCart;
    const articles = cart.map(item => {
        const { name, price, from, to, quantity, calculatedPrice } = item;

        const row = $(`
            <tr>
                <td id="name">
                    <h5>${name.toUpperCase()}</h5>
                    <br>
                </td>
                <td>${quantity}</td>
                <td id="price">${(calculatedPrice || price).toFixed(2)} zł</td>
                <td>
                    <button type="button" id="delete-btn" class="btn btn-outline-danger"><i class="bi bi-trash-fill"></i></button>
                    <button type="button" id="modify-btn" class="btn btn-outline-dark"><i class="bi bi-pencil-fill"></i></button>
                </td>
            </tr>
        `);
        row.find('#delete-btn').on('click', (event) => {
            shoppingCart.deleteItem(item);
            event.preventDefault();

            const navigationEvent = new CustomEvent('navigation', {
                detail: {
                    view: 'cart'
                }
            });

            document.dispatchEvent(navigationEvent);
        });
        row.find('#modify-btn').on('click', (event) => {
            event.preventDefault();

            const navigationEvent = new CustomEvent('navigation', {
                detail: {
                    view: 'modify-item',
                    item,
                }
            });

            document.dispatchEvent(navigationEvent);
        });
        
        if (from && to) {
            const reservationDate = $(`
                <td>
                    <p><strong>From: </strong>${from}</p>
                    <p><strong>To: </strong>${to}</p>
                </td>
            `)
            row.find('#name').append(reservationDate);
        }

        return row;
    });

    const totalPrice = cart.length > 0 ? cart.reduce((acc, { price, calculatedPrice, quantity }) => {
        const cost = calculatedPrice || price;
        return acc + cost * quantity;
    }, 0) : 0;
    const summary = $(`
        <tr>
            <td colspan=2><strong>TOTAL</td>
            <td colspan=2>${totalPrice.toFixed(2)} zł</td>
        </tr>        
    `);

    const table = $(`
        <table class="table table-hover align-middle">
            <thead>
                <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">PRICE</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `);

    table.find('tbody').append(articles);
    table.find('tbody').append(summary);
    section.empty().append(table);
    fragment.append(h2, section);

    return fragment;
};
