var canvas, ctx;

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    disegna();
}

function disegna() {
    const width = canvas.width;
    const height = canvas.height;
    const cy = height/2;
    const d = 15;
        
    ctx.clearRect(0,0,width,height);
    var t = performance.now() * 0.001;    
    var i,n = 38;
    ctx.fillStyle = "cyan";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;    
    for(i=0; i<n; i++) {
        var x = d + (d + 5) * i;
        var y = cy + Math.sin(i*t*0.2)*40;
        ctx.beginPath();
        ctx.rect(x-d/2,y-d/2,d,d);
        ctx.fill();
        ctx.stroke();
    }
    requestAnimationFrame(disegna);
}
