var canvas,engine,scene,camera,light,ground;
var shadowGenerator;
var n = 12;
var lato = 6;
var box;
var boxes = [];

// inizializzazione
window.addEventListener("DOMContentLoaded", function() {

	// creo canvas, engine e scene
    canvas = document.getElementById('c');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(0.3,0.3,0.3);
 
	// camera
	camera = new BABYLON.ArcRotateCamera('cam',0,1.3,30, new BABYLON.Vector3(0,0,0), scene);
    camera.upperBetaLimit = 1.3
    camera.attachControl(canvas,true);
	
	// luce
    light = new BABYLON.PointLight('light1', new BABYLON.Vector3(1,20,-10), scene);
    light.parent = camera;

	// ombre
    shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.setDarkness(0.5);
    shadowGenerator.usePoissonSampling = true;
    
	// pavimento
    ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 30, height: 30, subdivsions: 4}, scene);
    ground.material = new BABYLON.StandardMaterial("m",scene);
    ground.material.diffuseColor.copyFromFloats(.3,.5,0.6);
    ground.material.ambientColor.copyFromFloats(.3,.5,0.6);
    ground.material.specularColor.copyFromFloats(0.01,0.01,0.01);
    
	// cubi
    for(var i=0; i<n; i++) {
        box = BABYLON.MeshBuilder.CreateBox("b", {size:2}, scene);
        box.material = new BABYLON.StandardMaterial("m",scene);
        box.material.diffuseColor.set(0.8,0.7,.1);
        box.material.ambientColor.set(0.8,0.7,.1);
        box.position.y = 1;
    
        boxes.push(box);
        shadowGenerator.addShadowCaster(box);
    }

    
    ground.receiveShadows = true;

    engine.runRenderLoop(function() { 
        animate();
        scene.render(); 
    });
    window.addEventListener('resize', function() { engine.resize(); });
    
});

// posiziona un cubo che sta rotolando nella direzione x
// che sia partito da x0,z0 e che abbia fatto t passi
function rollx(box, x0, z0, t) {
    // scompongo t in parte intera (i) e decimale (f)
	var i = Math.floor(t);	
    var f = t - i;
	
	// ruoto il cubo
    box.setPivotPoint(new BABYLON.Vector3(1,-1,0));        
    box.rotation.z = -f*Math.PI/2;
	box.rotation.x = 0;
	
	// e lo sposto
    box.position.x = x0 + 2*i;
	box.position.z = z0;	
}

// posiziona un cubo che sta rotolando nella direzione z
// che sia partito da x0,z0 e che abbia fatto t passi
function rollz(box, x0, z0, t) {
    // scompongo t in parte intera (i) e decimale (f)
	var i = Math.floor(t);	
    var f = t - i;
	
	// ruoto il cubo
    box.setPivotPoint(new BABYLON.Vector3(0,-1,1));        
    box.rotation.x = f*Math.PI/2;
	box.rotation.z = 0;
	
	// e lo sposto
    box.position.x = x0;
	box.position.z = z0 + 2*i;	
}


// muove un cubo lungo un quadrato
// t controlla il movimento. t=0 => inizio, t=1 => fine
function tour(box, t) {
	var r = lato;
	// il movimento è periodico. ci interessa solo la parte decimale di t
    t -= Math.floor(t); 
    
	// trovo l'indice (i) del lato su cui il cubo si sta muovendo
	// modifico t in modo che controlli il movimento lungo il lato (t=0 => inizio del lato, t=1 => fine del lato)
	t = t*4;	
    var i = Math.floor(t); 
	t = t-i;
	
    if(i==0)      { rollx(box, -r,-r, t*lato); }
	else if(i==1) { rollz(box,  r,-r, t*lato); }
	else if(i==2) { rollx(box, -r, r, (1-t)*lato); }
	else          { rollz(box, -r,-r, (1-t)*lato); }
}

// muove tutti i cubi
function animate() {
    var t = performance.now()*0.00006;

	
    for(var i=0;i<n;i++)
       tour(boxes[i],t + i/n);
}
