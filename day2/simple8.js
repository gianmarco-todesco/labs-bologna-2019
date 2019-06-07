var canvas,engine,scene,camera,light,ground;
var toruses;
var m = 7;
var sphere;

// inizializzazione
window.addEventListener("DOMContentLoaded", function() {
	
	// canvas, engine, scene
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

	// creo gli anelli
    toruses = [];
    for(var i=0;i<m;i++) {
        var phi = Math.PI*2*i/m;
		
		// materiale
        var mat = new BABYLON.StandardMaterial("m",scene);
        mat.diffuseColor.copyFromFloats(
            0.5+0.5*Math.cos(phi),
            0.5,
            0.5+0.5*Math.sin(phi)            
        );
		
		// primo anello
        torus = BABYLON.MeshBuilder.CreateTorus("t", {
            diameter:2.0,
            thickness:0.3,
            tessellation : 70,
        }, scene);
        torus.material = mat;
        toruses.push(torus);    

		// secondo anello
        torus = BABYLON.MeshBuilder.CreateTorus("t", {
            diameter:1.4,
            thickness:0.3,
            tessellation : 70,
        }, scene);
        torus.material = mat;
        toruses.push(torus);    
    }

	// creo la sfera
    sphere = BABYLON.MeshBuilder.CreateSphere('s', {diameter:0.7}, scene);
    sphere.material = new BABYLON.StandardMaterial('ms', scene);
    sphere.material.diffuseColor.copyFromFloats(0.6,0.6,0.6);
    
	// faccio partire il tutto
    scene.registerBeforeRender(animate);
    engine.runRenderLoop(function() { scene.render(); });
    window.addEventListener('resize', function() { engine.resize(); });
    
});

var rr = 3;

// animazione
function animate() {
	
	// ruoto e posiziono gli anelli
    var m = toruses.length;
    var r = rr;
    var psi = performance.now()*0.001;
    for(var i=0;i<m;i++) {
        
        var phi = Math.PI*4*Math.floor(i/2)/m;
        var torus = toruses[i];
        torus.rotationQuaternion = new BABYLON.Quaternion();
        torus.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);    
		
		// rotazione attorno all'asse verticale
        var sgn = (i%2)*2-1;
        torus.rotate(BABYLON.Axis.Y, 3*sgn*(psi - phi) - phi, BABYLON.Space.WORLD);    
        
		// posizionamento (statico) dell'anello
        torus.position.set(r*Math.cos(phi),0, r*Math.sin(phi)
        );    
    }

	// movimento sfera
    sphere.position.set(r*Math.cos(psi),0,r*Math.sin(psi) );
}
