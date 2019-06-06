var canvas, ctx;

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    disegna();
}

function disegna() {
    const time = performance.now()*0.001;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0,0,width,height);
    const cx = width / 2, cy = height / 2;

    const outMargin = 20;

    const L = 30, margin = 10;
    const d = L + margin;

    const nx = Math.floor((width - 2 * outMargin + margin)/d);
    const ny = Math.floor((height - 2 * outMargin + margin)/d);
     
    const x0 = (width - (nx * d - margin))/2;
    const y0 = (height - (ny * d - margin))/2;
    
    ctx.lineWidth = 2;
    for(var i=0; i<ny; i++) {
        for(var j=0; j<nx; j++) {
            var x = x0+d*j+L/2;
            var y = y0+d*i+L/2;
            
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate(time);
            ctx.beginPath();
            ctx.rect(-L/2,-L/2, L, L);
            ctx.stroke();
            ctx.restore();
        }
    }
    requestAnimationFrame(disegna);
}
