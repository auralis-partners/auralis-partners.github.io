import { annotate } from 'rough-notation';

if (document.querySelector('#content-header')) {
    const header = document.querySelector('#content-header > h1');
    const annotation = annotate(header, { type: 'underline', color: '#086788', multiline: true });
    annotation.show();
}

const footer = document.querySelector('#footer');
const content = document.querySelector('#content');

const contentPosition = content.getBoundingClientRect();

content.style.minHeight = `${window.innerHeight - contentPosition.top - footer.clientHeight}px`;
footer.style.display = 'block';