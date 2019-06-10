var canvas, ctx;
var C = [100,0,50,0,20];
var traccia = [];

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    anima();
}


function anima() {
    // cancella tutto
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    disegna();

    // richiama anima() il prima possibile
    requestAnimationFrame(anima);
}

// disegna tutto
function disegna() {

    // tempo (in secondi) dall'inizio
    var t = performance.now() * 0.001;

    // centro del canvas
    var cx = canvas.width/2;
    var cy = canvas.height/2;

    // parto dal centro del canvas : (x,y) = (cx,cy)
    var x= cx, y = cy;

    // phi0 è la rotazione del primo cerchio (la più lenta)
    var phi0 = t * Math.PI * 2 / 10.0;

    // inizializzo larghezza e colore della linea
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    
    // ciclo su tutti i coefficienti (l'array C)
    for(var i=0; i<C.length; i++) {
        // raggio
        var r = C[i];
        // disegno il cerchio i-esimo
        cerchio(x, y, r);
        // calcolo la rotazione del cerchio i-esimo
        // (il secondo cerchio è veloce il doppio,
        // il terzo il triplo, ecc.)
        var phi = (i+1) * phi0;

        // disegno la linea che congiunge i centri 
        // dei cerchi i-esimo e (i+1)-esimo
        ctx.beginPath();
        ctx.moveTo(x,y);
        // (x,y) diventa la posizione del cerchio (i+1)-esimo
        x = x + r*Math.cos(phi);
        y = y + r*Math.sin(phi);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    // aggiungo la posizione del punto terminale all'array traccia[]
    traccia.push([x,y]);

    // faccio in modo che traccia[] non superi mai la lunghezza di
    // m elementi
    var m = 500;
    if(traccia.length>m)
        traccia.splice(0,traccia.length-m);

    // disegno la traccia
    if(traccia.length>=2) {
        ctx.beginPath();
        ctx.moveTo(traccia[0][0], traccia[0][1]);
        for(var j=1; j<traccia.length;j++) {
            ctx.lineTo(traccia[j][0], traccia[j][1]);
        }
        // linea spessa, colore rosso
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FF6666";
        ctx.stroke();
    }

    // disegno un puntino in corrispondenza del punto terminale
    cerchio(x,y,3);
    ctx.fill();
}


function cerchio(x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();
}
