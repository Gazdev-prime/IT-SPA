import $ from 'jquery';
import axios from 'axios';

export const roomsDetail = (roomId) => {
    const article = $('<article>Loading...</article>');

    // POBIERAMY POJEDYNCZY POKOJ (WG. JEGO ID) Z SERWERA
    axios
        .get(`http://localhost:3000/rooms/${roomId}`)
        .then(response => response.data)
        .then(room => {
            const { id, name, beds, guests, price, description } = room;

            // WYTWARZAMY ZAWARTOSC `article`
            const card = $(`
                <div class="card text-center">
                    <h2 class="card-header">
                        ${name.toUpperCase()}
                    </h2>
                    <div class="card-body">
                        <h5 class="card-title">Beds: ${beds} | Guests: ${guests}</h5>
                        <h5 class="card-title">${price.toFixed(2)} zł</h5>
                        <p class="card-text">${description}</p>
                        <button type="button" class="btn btn-outline-dark">BOOK</button>
                    </div>
                </div>
            `);

            card.find('button').on('click', event => {
                event.preventDefault();

                const navigationEvent = new CustomEvent('navigation', {
                    detail: {
                        view: 'book',
                        roomId: id
                    }
                });

                document.dispatchEvent(navigationEvent);
            });

            article.empty().append(card);
        });

    return article;
};
