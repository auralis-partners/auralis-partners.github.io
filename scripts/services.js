import { annotate } from 'rough-notation';

stickybits('.services-container-img > img', { stickyBitStickyOffset: 100 });

const containers = document.querySelectorAll('.services-container-text > div');
containers.forEach((c) => {
    const h2Heading = c.querySelector('h2');

    const annotation = annotate(h2Heading, { type: 'highlight', color: '#a9d3ff5f' });
    const observer = new window.IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            annotation.show();
            return
        }
    }, {
        root: null,
        threshold: 0.5,
    });

    observer.observe(c);
});
