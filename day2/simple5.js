var canvas,engine,scene,camera,light,ground;
var torus;

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
    // camera.upperBetaLimit = 1.3
    camera.wheelPrecision = 50;
    camera.attachControl(canvas,true);

	// luce
    light = new BABYLON.PointLight('light1', new BABYLON.Vector3(1,20,-10), scene);
    light.parent = camera;

	// griglia
    createGrid(scene);

	// creo gli anelli intrecciati
    var m = 13;
    var r = 1;
    for(var i=0;i<m;i++) {
        var phi = 2*Math.PI*i/m;
		
		// creo l'anello
        torus = BABYLON.MeshBuilder.CreateTorus("t", {
            diameter:4.0,
            thickness:0.2,
            tessellation : 70,
        }, scene);
		
		// assegno il colore
        var mat = torus.material = new BABYLON.StandardMaterial("m",scene);
        mat.diffuseColor = new BABYLON.Color3(
            0.5 + 0.5*Math.cos(phi),
            0.5 + 0.5*Math.sin(phi),
            0.5 + 0.5*Math.sin(2*phi)
        );
		
		// rotazione
        torus.rotate(BABYLON.Axis.X, Math.PI/2-0.5, BABYLON.Space.WORLD);
        torus.rotate(BABYLON.Axis.Y, 0.0 - phi, BABYLON.Space.WORLD);
		
		// posizionamento
        torus.position.set(
            r*Math.cos(phi),
            0,
            r*Math.sin(phi)
        );    
    }
    

    engine.runRenderLoop(function() { scene.render(); });
    window.addEventListener('resize', function() { engine.resize(); });
    
});

