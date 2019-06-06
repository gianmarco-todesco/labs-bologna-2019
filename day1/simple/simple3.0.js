var canvas, ctx;
const n = 100;
var data = [];

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    for(var i=0; i<n; i++) data.push(0);
    disegna();
}

function calcola() {
    data[0] = data[0] * 0.9;
    for(var i = n-1; i>0; i--) 
        data[i] = data[i-1]; 
}

function beep() {
    data[0] = -50;
}
function boop() {
    data[0] = 50;
}

function disegna() {

    calcola();

    const width = canvas.width;
    const height = canvas.height;
    const cy = height/2;
    

        
    ctx.clearRect(0,0,width,height);

    ctx.beginPath();
    ctx.moveTo(0,cy);
    ctx.lineTo(width,cy);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,cy+data[0]);
    for(var i=0; i<n; i++) {
        ctx.lineTo(i * 10, cy + data[i]);
    }
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;    
    ctx.stroke();
    requestAnimationFrame(disegna);
}
