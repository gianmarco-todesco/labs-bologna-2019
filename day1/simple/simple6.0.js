var canvas, ctx;
const text = "Animazioni matematiche";

function inizia() {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");

    disegna();


}


function disegna() {
    const time = performance.now()*0.001;
    const width = canvas.width;
    const height = canvas.height;

    const t1 = 1.0; // tempo (sec) che una lettera impiega a ruotare
    const t2 = 3.0; // tempo (sec) in cui la lettera sta ferma
    const dt = 0.1; // ritardo (sec) fra il movimento di una lettera e la successiva
    ctx.clearRect(0,0,width,height);

    ctx.font = "70px Georgia bold"
    const cHeight = 50;
    var x = 50;
    for(var i=0; i<text.length; i++) {

        let angle = 0.0;
        var t = (time - dt*i) / (t1 + t2);
        t = (t - Math.floor(t)) * (t1 + t2);
        if(t<t1) angle =  2*Math.PI*t/t1;


        const char = text.substr(i,1);
        ctx.save();
        let cWidth = ctx.measureText(char).width + 6;
        ctx.translate(x + cWidth/2, 100);
        ctx.rotate(angle);
        ctx.fillText(char, -cWidth/2, cHeight/2);
        ctx.restore();
        x += cWidth;
    }
    requestAnimationFrame(disegna);
}
