var canvas,engine,scene,camera,light,ground;
var sfere = [];

// inizializzazione
window.addEventListener("DOMContentLoaded", function() {

	// canvas, engine, scene
    canvas = document.getElementById('c');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(0.3,0.3,0.3);

	// camera
    camera = new BABYLON.ArcRotateCamera('cam',0,0.3,14, 
        new BABYLON.Vector3(0,0,0), scene);
    camera.wheelPrecision = 50;
    camera.attachControl(canvas,true);

	// light
    light = new BABYLON.PointLight('light1', new BABYLON.Vector3(1,20,-10), scene);
    light.parent = camera;

	// grid (vedi plslib.js)
    createGrid(scene);

	// creo le sfere
    var m = 50;
    for(var i=0;i<m;i++) {
        var phi = Math.PI*2*i/m;
		// creo la sfera i-esima
        var sfera = BABYLON.MeshBuilder.CreateSphere("t", {diameter:0.25}, scene);

		// materiale
        var mat = sfera.material = new BABYLON.StandardMaterial("m",scene);
        mat.diffuseColor.set(0.5+0.5*Math.cos(phi), 0.5, 0.5+0.5*Math.sin(phi));
		
		// aggiungo la sfera i-esima alle altre
        sfere.push(sfera);    
    }
    
    scene.registerBeforeRender(animate);
    engine.runRenderLoop(function() { scene.render(); });
    window.addEventListener('resize', function() { engine.resize(); });
    
});

var rr = 2;

// animazione
function animate() {
	var t = performance.now()*0.0001;
	
    var m = sfere.length;
    for(var i=0;i<m;i++) {
		var x = Math.sin(t*i);
		var s = 2*i/(m-1)-1; // s va da -1 a 1
        sfere[i].position.set(2*x, 0, 5*s);

    }

}
