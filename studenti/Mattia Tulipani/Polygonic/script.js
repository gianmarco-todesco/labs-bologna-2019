var c = document.getElementById('lavagna');
var ctx=c.getContext("2d");


var num = 3 //numero di angoli
var polygonRadius = 60; // raggio del poligono

var x = new Array();  //ascisse vertici
var y = new Array();  //ordinate vertici
var r = 5; //Raggio pallottole


var xo = c.width/2;
var yo = c.height/2;
ctx.translate(xo,yo);


var scaleFactor = 0.1;
var oldnum = 0;

// creo la forma del poligono
for(var i=0; i<num; i++) {
  var phi = Math.PI*2*i/num;
  x[i] = polygonRadius*Math.cos(phi);
  y[i] = polygonRadius*Math.sin(phi);
}


function animate() {
  ctx.clearRect(-xo,-yo,c.width,c.height);

  var t = performance.now() * 0.001;

  ctx.save();
  ctx.rotate(t);
  disegnaPoligono();


  scaleFactor *= 1.03;
  disegnaPallottole();
  ctx.restore();
  var s = t*0.3 + 2;
  var si = Math.floor(s);
  var sf = s - si;
  sf = sf*5; if(sf>1) sf = 1;
  num = si + sf;

  if (si > oldnum) {
    oldnum = si;
    scaleFactor = 0.1
  }

  requestAnimationFrame(animate);
}

function cerchio(x,y,r) {
  ctx.strokeStyle = "#FE19AA";
  ctx.fillStyle = "#FE19AA";
  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
}

function disegnaPallottole() {
  for (var i=0;i<num;i++) {
    var phi = Math.PI*2*i/num;
    cerchio(polygonRadius*Math.cos(phi)*scaleFactor,polygonRadius*Math.sin(phi)*scaleFactor,r);
  }
}

function disegnaPoligono() {
  ctx.strokeStyle = "#FE19AA";
  ctx.fillStyle = "#FE19AA";
  ctx.beginPath();
  ctx.moveTo(x[0],y[0]);
  for (var i = 1; i < num; i++) {
    var phi = Math.PI*2*i/num;
    ctx.lineTo(polygonRadius*Math.cos(phi), polygonRadius*Math.sin(phi));
  }
  ctx.fill();
}
animate();
