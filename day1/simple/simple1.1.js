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
        
    ctx.clearRect(0,0,width,height);
    var t = performance.now() * 0.001;    
    var i,n = 26;
    ctx.fillStyle = "cyan";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;    
    for(i=0; i<n; i++) {
        var x = 20 + 30 * i;
        ctx.beginPath();
        ctx.rect(x-10,cy-10,20,20);
        ctx.fill();
        ctx.stroke();
    }
    requestAnimationFrame(disegna);
}
