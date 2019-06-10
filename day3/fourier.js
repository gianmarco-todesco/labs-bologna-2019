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
    var t = performance.now() * 0.0001;

    var cx = canvas.width/2;
    var cy = canvas.height/2;

    var x= cx, y = cy;
    var phi;

    var r;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    for(var i=0; i<C.length; i++) {
        r = C[i];
        cerchio(x, y, r);

        phi = (i+1) * t * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(x,y);
        x = x + r*Math.cos(phi);
        y = y + r*Math.sin(phi);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    traccia.push([x,y]);

    if(traccia.length>=2) {
        ctx.beginPath();
        ctx.moveTo(traccia[0][0], traccia[0][1]);
        for(var j=1; j<traccia.length;j++) {
            ctx.lineTo(traccia[j][0], traccia[j][1]);
        }
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FF8888";
        ctx.stroke();

    }





}

function cerchio(x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();
}
