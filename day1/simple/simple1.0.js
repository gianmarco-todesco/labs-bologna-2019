var canvas, ctx;

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    disegna();
}

questa riga è tutta sbagliata


function disegna() {
    const width = canvas.width;
    const height = canvas.height;
    const cx = width/2;
    const cy = height/2;

    ctx.clearRect(0,0,width,height);
    var t = performance.now() * 0.001;
    var i,n = 40;
    for(i=0; i<n; i++) {
        var r = 10 + 4*i;
        var phi = 3*Math.PI*i/n*t * 0.5;
        ctx.beginPath();
        ctx.arc(cx,cy,r,phi,phi+Math.PI);
        ctx.stroke();
    }
    requestAnimationFrame(disegna);
}
