var canvas, ctx;

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
        
    disegnaDrago(180, 200, 450,400, 14);
}


function disegnaDrago(x0,y0,x1,y1, livello) {
    if(livello == 0) {
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.stroke();
    } else {
        const xm = (x0+x1)/2;
        const ym = (y0+y1)/2;
        const x2 = xm - (y1-ym);
        const y2 = ym + (x1-xm);
        disegnaDrago(x0,y0,x2,y2, livello-1);
        disegnaDrago(x1,y1,x2,y2, livello-1);        
    }
}


