var canvas, ctx;

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    disegna();
}

function disegna() {
    const width = canvas.width;
    const height = canvas.height;

    const L = 25, margin = 10;
    const d = L + margin;

    const nx = Math.floor((width + margin)/d);
    const ny = Math.floor((height + margin)/d);
     
    const x0 = (width - (nx * d - margin))/2;
    const y0 = (height - (ny * d - margin))/2;
    
    for(var i=0; i<ny; i++) {
        for(var j=0; j<nx; j++) {
            ctx.beginPath();
            ctx.rect(x0+d*j, y0+d*i, L, L);
            ctx.stroke();
        }
    }
    requestAnimationFrame(disegna);
}
