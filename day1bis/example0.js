var canvas, ctx;

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    anima();
}


function anima() {
    // cancella tutto
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    calcola();

    disegna();

    // richiama anima() il prima possibile
    requestAnimationFrame(anima);
}

// aggiorna tutte le variabili di stato per il nuovo fotogramma
function calcola() {

}

// disegna tutto
function disegna() {

}
