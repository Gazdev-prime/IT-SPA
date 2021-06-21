import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import { header, main, footer } from './common';// PO POPRAWCE
import { navigation } from './navigation/navigation';

const body = $(document.body);

body.append(header());
body.append(navigation(), $(`<br>`));
body.append(main());
body.append(footer());
