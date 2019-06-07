var canvas, ctx;

// variabili di stato
var x,y,vx,vy,r;


function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");

    // raggio della pallina
    r = 20;

    // parto al centro
    x = canvas.width/2;
    y = canvas.height/2;

    // velocità iniziale
    vx = 10;
    vy = 7;

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

    var dt = 0.3;

    // muovi la posizione
    x = x + vx*dt;
    y = y + vy*dt;

    // limiti nel movimento:
    var x0 = r,
        x1 = canvas.width - r,
        y0 = r,
        y1 = canvas.height - r;

    // gestisce i rimbalzi orizzontali
    if(x>x1)      { x = x1 - (x-x1); vx = -vx; }
    else if(x<x0) { x = x0 + (x0-x); vx = -vx; }

    // gestisce i rimbalzi verticali
    if(y>y1)      { y = y1 - (y-y1); vy = -vy; }
    else if(y<y0) { y = y0 + (y0-y); vy = -vy; }

}

// disegna tutto
function disegna() {
    ctx.fillStyle = "red";
    cerchio(x,y,r);
}
