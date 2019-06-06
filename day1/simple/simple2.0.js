var canvas, ctx;

function disegna() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const cx = width/2;        
    const cy = height/2;        
    const r = Math.min(cx,cy) * 0.9;
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.moveTo(cx+r,cy+0);
    
    const p = 11;
    const q = 6;
    const n = p;

    var i;
    for(i=1; i<=n; i++) {
        var phi = i*Math.PI*2* q/p;
        var x = cx + r * Math.cos(phi);
        var y = cy + r * Math.sin(phi);
        ctx.lineTo(x,y);
    }
    ctx.stroke();
}
