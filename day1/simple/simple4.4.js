var canvas, ctx;
var mousex=0, mousey=0, mousein=false;
var oldvalues;
var width, height;
const outMargin = 20;
const L = 15, margin = 3;
var nx,ny,x0,y0;

function inizia() {
    // canvas e ctx
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");

    // gestione eventi mouse
    canvas.addEventListener("mousemove", function(e) {
        mousex = e.offsetX;
        mousey = e.offsetY;
        mousein = true;
    });
    canvas.addEventListener("mouseout", function(e) { mousein = false; });

    // dimensioni canvas
    width = canvas.width;
    height = canvas.height;
    
    // numero quadrati 
    const d = L + margin;
    nx = Math.floor((width - 2 * outMargin + margin)/d);
    ny = Math.floor((height - 2 * outMargin + margin)/d);
     
    x0 = (width - (nx * d - margin))/2;
    y0 = (height - (ny * d - margin))/2;

    // inizializza l'array con i vecchi valori
    oldvalues = [];
    for(var i=0; i<ny; i++) {
        var row = [];
        for(var j=0;j<nx;j++) row.push(0);
        oldvalues.push(row);
    }

    disegna();
}

function disegna() {
    const d = L + margin;
    ctx.clearRect(0,0,width,height);
    
    ctx.lineWidth = 1;
    for(var i=0; i<ny; i++) {
        for(var j=0; j<nx; j++) {
            var x = x0+d*j+L/2;
            var y = y0+d*i+L/2;
            
            var ang = 0;
            
            if(mousein) {
                var dx = x - mousex;
                var dy = y - mousey;            
                var r2 = dx*dx+dy*dy;    
                ang = 2*Math.PI*Math.exp(-r2*0.00001);
            }

            oldvalues[i][j] = oldvalues[i][j] * 0.9 + ang * 0.1;
            ang = oldvalues[i][j];

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate(ang);
            ctx.beginPath();
            ctx.rect(-L/2,-L/2, L, L);
            ctx.stroke();
            ctx.restore();
        }
    }
    requestAnimationFrame(disegna);
}
