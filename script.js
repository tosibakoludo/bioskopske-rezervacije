const seats = document.querySelectorAll(".row .seat");
var seatsNotOccupied = document.querySelectorAll(".row .seat:not(.occupied)");
const container = document.querySelector(".container");

ucitaj();
azuriraj();

container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
    }
    azuriraj();
})

movie.addEventListener("change", function () {
    localStorage.setItem("selectedMovie", movie.selectedIndex);
    ucitaj();
    azuriraj();
})

occupy.addEventListener("click", function (e) {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    selectedSeats.forEach(elem => {
        elem.classList.remove('selected');
        elem.classList.add('occupied');
    })
    azuriraj();
})

function ucitaj() {
    const selectedMovie = localStorage.getItem("selectedMovie");

    if (selectedMovie !== null) {
        movie.selectedIndex = selectedMovie;
    }

    const occupiedSeats = JSON.parse(localStorage.getItem("occupied" + movie.selectedIndex));
    const selectedSeats = JSON.parse(localStorage.getItem("selected" + movie.selectedIndex));

    if (occupiedSeats !== null && occupiedSeats.length > 0) {
        seats.forEach((elem, index) => {
            elem.classList.remove('occupied');
            if (occupiedSeats.indexOf(index) > -1) {
                elem.classList.add('occupied');
            }
        })
    } else {
        //ostaje occupied iz drugih filmova
        seatsNotOccupied.forEach(elem => {
            elem.classList.remove('occupied');
        })
    }

    seatsNotOccupied = document.querySelectorAll(".row .seat:not(.occupied)");

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seatsNotOccupied.forEach((elem, index) => {
            elem.classList.remove('selected');
            if (selectedSeats.indexOf(index) > -1) {
                elem.classList.add('selected');
            }
        })
    }
    else {
        //ostaje selektovano iz drugih filmova
        seatsNotOccupied.forEach(elem => {
            elem.classList.remove('selected');
        })
    }
}

function azuriraj() {
    const occupiedSeats = document.querySelectorAll(".row .seat.occupied");
    console.log(occupiedSeats);
    const occupiedSeatsIndex = [...occupiedSeats].map(seat => [...seats].indexOf(seat));
    console.log(occupiedSeatsIndex);

    seatsNotOccupied = document.querySelectorAll(".row .seat:not(.occupied)");

    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    console.log(selectedSeats);
    const seatsIndex = [...selectedSeats].map(seat => [...seatsNotOccupied].indexOf(seat));
    console.log(seatsIndex);

    localStorage.setItem("occupied" + movie.selectedIndex, JSON.stringify(occupiedSeatsIndex));
    localStorage.setItem("selected" + movie.selectedIndex, JSON.stringify(seatsIndex));
    localStorage.setItem("selectedMovie", movie.selectedIndex);

    const brojSelektovanih = selectedSeats.length;
    const cenaKarte = +movie.value;

    count.innerText = brojSelektovanih;
    total.innerText = brojSelektovanih * cenaKarte;
}

// function prva(a, b, c) {
//     console.log(a, b, c);
// }

// niz = [2, 3, 4];

// prva(niz);

// prva(...niz);

// var a = [3, 4, 5];

// var b = [45, ...a];

// function proba2(...[a, b, c]) {
//     return a + b + c;
// }

// console.log(proba2(4, 5, 6));

// function prva(a, b, c) {
//     console.log(arguments);
// }

// prva(4, 5, 6);

// function prva(a, b, c) {
//     console.log([...arguments]);
// }

// prva(4, 5, 6);