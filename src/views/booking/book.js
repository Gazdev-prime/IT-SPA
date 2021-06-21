import $ from 'jquery';
import axios from 'axios';
import { shoppingCart } from '../../cart/cart';
import { checkDate } from '../cart/modify';

export const bookingDetail = (roomId) => {
    const article = $('<article>Loading...</article>');

    axios
        .get(`http://localhost:3000/rooms/${roomId}`)
        .then(response => response.data)
        .then(room => {
            const { name, beds, guests, price } = room;
            
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
            const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
            const today = `${year}-${month}-${day}`;

            const addButton = $('<center><button type="button" class="btn btn-outline-dark">ADD TO CART</button></center>');
            article.empty().append(
                $(`<center><p id="add-success" class="text-success">Room added to cart.</p></center>`),
                $(`<h2><center>${name.toUpperCase()}</center></h2>`),
                $(`<p><center><strong>Bed: </strong>${beds} | <strong>Guests: </strong>${guests}</center></p>`),
                $(`<p><center><strong>${price.toFixed(2)} zł</strong></center></p>`),
                $(`<p><center><strong>PICK DATE</strong></center></p>`),
                $(`<center><p id="date-range" class="text-danger">Date range is incorrect.</p></center>`),
                $(`
                    <form class="row w-100 d-flex justify-content-center">
                        <div class="col-4 mb-3">
                            <label for="calendarFrom" class="form-label">From</label>
                            <input id="calendarFrom" type="date" class="form-control" value=${today}>
                        </div>
                        <div class="col-4 mb-3">
                            <label for="calendarTo" class="form-label">To</label>
                            <input id="calendarTo" type="date" class="form-control" value=${today}>
                        </div>
                    </form>
                `),
            );

            const errorMessages = {
                date: {
                    range: $('#date-range'),
                }
            };
            const successMessages = {
                itemAdded: $('#add-success'),
            };

            errorMessages.date.range.hide();
            successMessages.itemAdded.hide();

            addButton.on('click', event => {
                event.preventDefault();

                const from = $('#calendarFrom').val();
                const to = $('#calendarTo').val();
                const dateIsCorrect = checkDate(from, to);
               
                dateIsCorrect ? errorMessages.date.range.hide() : errorMessages.date.range.show();
                successMessages.itemAdded.hide();
                
                if (dateIsCorrect) {
                    const startDate = new Date(from);
                    const endDate = new Date(to);
                    const duration = endDate - startDate;
                    const days = duration / 1000 / 60 / 60 / 24;
                    const calculatedPrice = price * (days + 1);
                    const item = { name, price, calculatedPrice, from, to };
                    shoppingCart.fullCart = item;
                    successMessages.itemAdded.show();
                }
            });
            article.append(addButton);
        });

    return article;
};
