var canvas,engine,scene,camera,light,ground;
var spheres = [];

// inizializzazione
window.addEventListener("DOMContentLoaded", function() {
	
	// creo canvas, engine e scene
    canvas = document.getElementById('c');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(0.3,0.3,0.3);

	// camera
    camera = new BABYLON.ArcRotateCamera('cam',0,0.3,10, 
        new BABYLON.Vector3(0,0,0), scene);
    camera.wheelPrecision = 50;
    camera.attachControl(canvas,true);

	// luce
    light = new BABYLON.PointLight('light1', new BABYLON.Vector3(1,20,-10), scene);
    light.parent = camera;

	// griglia (vedi plslib.js)
    createGrid(scene);

	// creo le sfere (e le metto nell'array spheres[])
    var m = 13;
    var r = 4;
    for(var i=0;i<m;i++) {
        var phi = 2*Math.PI*i/m;
		
		// creo la sfera i-esima
		var sphere = BABYLON.MeshBuilder.CreateSphere("s",
            {diameter:1},
            scene);

		// assegno un colore
        var mat = sphere.material = new BABYLON.StandardMaterial("m",scene);
        mat.diffuseColor = new BABYLON.Color3(
            0.5 + 0.5*Math.cos(phi),
            0.5 + 0.5*Math.sin(phi),
            0.5 + 0.5*Math.sin(2*phi)
        );
		
		// posizione
        sphere.position.set(r*Math.cos(phi), 0, r*Math.sin(phi) );
		
		// aggiungo a spheres[]
        spheres.push(sphere);    
    }
    

    scene.registerBeforeRender(animate);
    engine.runRenderLoop(function() { scene.render(); });
    window.addEventListener('resize', function() { engine.resize(); });
    
});


// animazione
function animate() {
    var t = performance.now()*0.006;
    var m = spheres.length;
    for(var i=0;i<m;i++) {
        var sphere = spheres[i];
        var v = 0.5 + 0.5*Math.sin(t + i/m*Math.PI*2);
        var sc = 1.0 + v*v;
        sphere.scaling.set(sc,sc,sc);
    }
}
