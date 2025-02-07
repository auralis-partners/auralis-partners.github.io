import { annotate } from 'rough-notation';

const header = document.querySelector('#content-header > h1');
const annotation = annotate(header, { type: 'underline', color: '#086788', multiline: true });
annotation.show();