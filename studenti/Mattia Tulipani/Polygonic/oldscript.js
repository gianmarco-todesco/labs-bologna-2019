var c = document.getElementById('lavagna');
var ctx=c.getContext("2d");
var num = 10 //numero di angoli
var u = 100 //lunghezza di ogni lato
const alfa = 2*Math.PI/num;
var x = new Array();  //ascisse vertici
var y = new Array();  //ordinate vertici
var r = 5; //Raggio pallottole
var Ox = c.width/2;
var Oy = c.height/2;
ctx.translate(Ox,Oy);


function animate() {
  ctx.clearRect(-Ox,-Oy,c.width,c.height);
  u++;

  x[0]=-Math.sin(alfa/2);
  y[0]=Math.cos(alfa/2);
  for (i=1; i<=num-1; i+=1){
     x[i]=x[i-1]*Math.cos(-alfa) - y[i-1]*Math.sin(-alfa);
     y[i]=x[i-1]*Math.sin(-alfa) + y[i-1]*Math.cos(-alfa);
  }
  ctx.moveTo(u*x[0],u*y[0]);
  for (i=1;i<=num;i+=1){
    //ctx.lineTo(u*x[i],u*y[i]);
    cerchio(u*x[i-1],u*y[i-1],r);
  }

  poligono();
  requestAnimationFrame(animate);
}

function cerchio(x,y,r) {
  ctx.strokeStyle = "magenta";
  ctx.fillStyle = "magenta";
  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
}

function poligono() {
  ctx.strokeStyle = "magenta";
  ctx.fillStyle = "magenta";
  ctx.beginPath();
  ctx.moveTo(u*x[0],u*y[0]);
  for (var i = 1; i <= num; i+=1) {
    ctx.lineTo(u*x[i],u*y[i]);
  }
  ctx.fill();
  ctx.stroke();
}


animate();
