import $ from 'jquery';
import { shoppingCart } from '../../cart/cart'

const isNegative = (value) => {
    return value <= 0;
};

export const checkDate = (from, to) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
    const today = new Date(`${year}-${month}-${day}`);

    const startDate = new Date(from);
    const endDate = new Date(to);

    // startDate >= today
    const isStart = startDate >= today;
    // endDate <= startDate + year
    const maxDate = new Date(from);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const isEnd = endDate <= maxDate;
    // startDate <= endDate
    const isDate = startDate <= endDate;
    
    return isStart && isEnd && isDate;
};

export const modify = (item) => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2><center>MODIFY ITEM</center></h2>');
    const section = $(`
        <section>
            Loading...
        </section>
    `);
    
    const { name, price, from, to, quantity, calculatedPrice } = item;

    section.empty().append(
        $(`
            <h3><center><strong>${name.toUpperCase()}</strong></center></h3>
            <center><p id="price">Price: ${price} zł</p></center>
        `),
        $(`
            <form class="row w-100 d-flex justify-content-center" name="modify" autocomplete="off" novalidate>
                <div class="col-2 mb-3">
                    <label for="quantity" class="form-label">Quantity</label>
                    <input id="quantity" type="number" class="form-control" value=${quantity} min="1">
                </div>
            </form>
            <center><p id="quantity-negative" class="text-danger">Quantity have to be bigger than 0.</p>
        `)
    );

    if (from && to) {
        section.append(
            $(`
                <form class="row w-100 d-flex justify-content-center">
                    <div class="col-4 mb-3">
                        <label for="calendarFrom" class="form-label">From</label>
                        <input id="calendarFrom" type="date" class="form-control" value=${from}>
                    </div>
                    <div class="col-4 mb-3">
                        <label for="calendarTo" class="form-label">To</label>
                        <input id="calendarTo" type="date" class="form-control" value=${to}>
                    </div>
                </form>
                <center><p id="date-range" class="text-danger">Date range is incorrect.</p></center>
            `),
        );
    }

    section.append($('<center><button type="button" class="btn btn-outline-dark">CONFIRM</button></center>'));

    const errorMessages = {
        quantity: {
            negative: section.find('#quantity-negative'),
        },
        date: {
            range: section.find('#date-range'),
        }
    };

    errorMessages.quantity.negative.hide();
    errorMessages.date.range.hide();

    section.find('button').on('click', (event) => {
        event.preventDefault();

        const quantity = section.find('#quantity').val();
        const from = section.find('#calendarFrom').val();
        const to = section.find('#calendarTo').val();
        const quantityIsNegative = isNegative(quantity);
        const dateIsCorrect = from !== undefined ? checkDate(from, to) : 1;

        quantityIsNegative ? errorMessages.quantity.negative.show() : errorMessages.quantity.negative.hide();
        dateIsCorrect ? errorMessages.date.range.hide() : errorMessages.date.range.show();
        
        if (!quantityIsNegative && dateIsCorrect) {
            const startDate = new Date(from);
            const endDate = new Date(to);
            const duration = endDate - startDate;
            const days = duration / 1000 / 60 / 60 / 24;
            const calculatedPrice = price * (days + 1);

            const modifiedItem = { ...item, quantity, from, to, price, calculatedPrice };
            shoppingCart.modifyItem(item, modifiedItem);
            
            const navigationEvent = new CustomEvent('navigation', {
                detail: {
                    view: 'cart',
                }
            });
            document.dispatchEvent(navigationEvent);
        }
    });

    fragment.append(section);

    return section;
};
