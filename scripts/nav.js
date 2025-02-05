import { annotate } from 'rough-notation';

const navMenu = document.getElementById('header-nav-menu');
const navDialog = document.getElementById('header-nav-dialog');
const navDialogMenu = document.getElementById('header-nav-dialog-menu');

const nav = document.getElementById('header-nav-open');
const navClose = document.getElementById('header-nav-close-container');

nav.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navDialogMenu.classList.toggle('open');
    navDialog.classList.add('open');
});

navClose.addEventListener('click', () => {
    navDialogMenu.classList.toggle('open');
    navDialog.classList.remove('open');

    setTimeout(() => {
        navMenu.classList.toggle('open');
    }, 250);
});

const navLogo = document.getElementById('header-nav-logo');
navLogo.addEventListener('click', () => {
    window.location.href = '/';
});

const current = document.getElementById('nav-current').innerText.replace('\n', '').trim();
const curentId = `nav-menu-${current}`;
document.getElementById(curentId).style.display = 'none';

let navLinks = document.getElementById('header-nav-links');
for (let link of navLinks.children) {
    if (!link.hasAttribute('nav')) {
        continue;
    }

    let leftBracket = annotate(link, {
        type: 'bracket',
        color: '#086788',
        brackets: 'left',
        animationDuration: 100,
    });

    let rightBracket = annotate(link, {
        type: 'bracket',
        color: '#086788',
        brackets: 'right',
        animationDuration: 100,
    });

    link.addEventListener('mouseenter', () => {
        leftBracket.show();
        rightBracket.show();
    });

    link.addEventListener('mouseleave', () => {
        leftBracket.hide();
        rightBracket.hide();
    });

    link.addEventListener('click', () => {
        window.location.href = `/${link.getAttribute('nav')}`;
    });
}