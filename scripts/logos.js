function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function splitToNChunks(array, n) {
    let result = [];
    for (let i = n; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}

return;

let logos = JSON.parse(document.getElementById('logos').innerText);
/*
    {% for logo in site.content.logos %}
        <img src="{{ logo.src }}" alt="{{ logo.name }}" class="carousel-cell">
    {% endfor %}
*/
shuffle(logos);
logos = splitToNChunks(logos, 2);
console.log(logos);

const carousel = document.getElementById('logos-carousel');

logos.forEach((chunk, i) => {
    i = i + 1;
    let el = document.createElement('div', { id: `carousel-${i}` });
    chunk.forEach(logo => {
        let img = document.createElement('img');
        img.src = logo.src;
        img.alt = logo.name;
        img.classList.add('carousel-cell');
        el.appendChild(img);
    });

    carousel.appendChild(el);

    let flkty = new Flickity(el, {
        cellAlign: 'center',
        contain: true,
        autoPlay: true,
        pageDots: false,
        wrapAround: true,
        prevNextButtons: false,
        initialIndex: 4,
        rightToLeft: i % 2 === 0
    });

    let hr = document.createElement('hr');
    carousel.appendChild(hr);
});



