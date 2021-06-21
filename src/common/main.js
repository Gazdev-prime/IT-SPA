import $ from 'jquery';
import { home,
    rooms,
    roomsDetail,
    treatments,
    bookingDetail,
    getCart,
    signIn,
    signUp,
    modify,
} from '../views';

// const viewMap = new Map([
//     ['home', home],
//     ['rooms', rooms],
//     ['rooms-detail', roomsDetail]
// ]);

// viewMap.get('home') // -> zwraca fn home
// viewMap.get('xyz123') // -> zwraca undefined

export const main = () => {
    const mainElement = $('<main></main>');
    mainElement.append(home());// NA START POKAZUJEMY CHOCIAZ WIDOK `HOME`

    document.addEventListener('navigation', event => {
        // const { detail } = event; <-- DESTRUKTURYZACJA OBIEKTU
        const detail = event.detail; // NP. { view: 'home' } LUB { view: 'rooms' }
        const roomId = detail.roomId;
        const item = detail.item;

        switch (detail.view) {
            case 'home':
                mainElement.empty().append(home());
                break;

            case 'rooms':
                mainElement.empty().append(rooms());
                break;

            case 'rooms-detail':
                mainElement.empty().append(roomsDetail(roomId));
                break;

            case 'treatments':
                mainElement.empty().append(treatments());
                break;

            case 'book':
                mainElement.empty().append(bookingDetail(roomId));
                break;

            case 'cart':
                mainElement.empty().append(getCart());
                break;

            case 'auth':
                mainElement.empty().append(signIn());
                break;

            case 'signUp':
                mainElement.empty().append(signUp());
                break;

            case 'modify-item':
                mainElement.empty().append(modify(item));
            break;

            default:
                const oops = $('<h2>Oops, coś poszło nie tak!</h2>');
                mainElement.empty().append(oops);
        }
    });

    return mainElement;
};
