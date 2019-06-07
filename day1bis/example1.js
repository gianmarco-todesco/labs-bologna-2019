var canvas, ctx;

// variabili di stato
var x;


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


function cerchio(x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();
}


// aggiorna tutte le variabili di stato per il nuovo fotogramma
function calcola() {
    // t = tempo trascorso in millisecondi
    var t = performance.now();
    var x0 = canvas.width/2;

    // calcolo il valore della variabile x
    x = x0 + 100 * Math.sin(t*0.005);
}

// disegna tutto
function disegna() {
    var w = canvas.width;
    var h = canvas.height;
    ctx.fillStyle = "yellow";
    cerchio(x,100,50);
    ctx.fillStyle = "cyan";
    cerchio(w-x,h-100,50);
}
