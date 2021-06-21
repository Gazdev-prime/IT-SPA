import $ from 'jquery';
import axios from 'axios';

export const rooms = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2><center>ROOMS</center></h2><br>');
    const container = $(`
        <div class="container">
            
        </div>
    `);
    const row = $(`
        <div class="row">
            Loading...
        </div>
    `);

    // POBIERAMY LISTE POKOI Z SERWERA
    axios
        .get('http://localhost:3000/rooms')
        .then(response => response.data)
        .then(rooms => {
            const articles = rooms.map(room => {
                const { id, name, beds, guests, price } = room;

                const card = $(`
                    <div id="roomCard" class="card text-center">
                        <h5 class="card-header w-100">${name.toUpperCase()}</h5>
                        <div class="card-body">
                            <p class="card-text"><strong>Beds: </strong>${beds} | <strong>Guests: </strong>${guests}</p>
                            <p class="card-text"><strong>Price: </strong>${price.toFixed(2)} zł</p>
                        </div
                    </div>
                `);

                const col = $('<div class="col-6 mb-3"></div')
                col.append(card);

                card.on('click', event => {
                    console.log('clik')
                    event.preventDefault();

                    const navigationEvent = new CustomEvent('navigation', {
                        detail: {
                            view: 'rooms-detail',
                            roomId: id
                        }
                    });

                    document.dispatchEvent(navigationEvent);
                });

                return col;
            });
            // DOCZEPIAMY WYTWORZONE ARTYKUŁY DO SEKCJI
            row.empty().append(articles);
            container.append(row);
        });

    fragment.append(h2, container);

    return fragment;
};
