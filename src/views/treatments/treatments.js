import $ from 'jquery';
import axios from 'axios';
import { shoppingCart } from '../../cart/cart';

export const treatments = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2><center>TREATMENTS</center></h2><br>');
    const section = $(`
        <div>
            Loading...
        </div>
    `);
    
    axios
        .get('http://localhost:3000/treatments')
        .then(response => response.data)
        .then(treatments => {
            const articles = treatments.map((treatment, index) => {
                const { name, area, time, price } = treatment;

                const itemActive = $(`<div class="carousel-item active"></div>`);
                const itemInactive = $(`<div class="carousel-item"></div>`);
                const carouselItem = index === 0 ? itemActive : itemInactive;
                const itemContent = $(`
                    <div id=${index} class="card text-center">
                        <h5 class="card-header w-100">${name.toUpperCase()}</h5>
                        <div class="card-body">
                            <p class="card-text"><strong>Area: </strong>${area} | <strong>Time:</strong> ${time} min</p>
                            <p class="card-text"><strong>Price: </strong>${price.toFixed(2)} zł</p>
                            <button type="button" class="btn btn-outline-dark">ADD TO CART</button>
                        </div>
                        <div class="card-footer text-success added" id="add-success${index}">
                            <br>
                        </div>
                    </div>
                `);

                itemContent.find('button').on('click', event => {
                    event.preventDefault();
                    
                    const item = { name, price };
                    shoppingCart.fullCart = item;
                    
                    $('.added').html('<br>');
                    $(`#add-success${index}`).html('Added to cart.');
                });

                carouselItem.append(itemContent);

                return carouselItem;
            });
            
            const carousel = $(`
                <div id="carouselTreatments" class="carousel slide" data-bs-ride="carousel">
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselTreatments" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselTreatments" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            `);

            const carouselInner = $('<div class="carousel-inner"></div>');
            carouselInner.append(articles);
            carousel.prepend(carouselInner);
            section.empty().append(carousel);
        });

    fragment.append(h2, section);

    return fragment;
};
