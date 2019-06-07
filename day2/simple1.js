var canvas, engine, scene, camera;
var sole, terra, luna;


function inizia() {
    canvas = document.getElementById('c');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);

    // telecamera virtuale
    camera = new BABYLON.ArcRotateCamera('cam',
        0.3,1.2,5,
        new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas,true);
	camera.wheelPrecision=20;
	camera.radius = 7;
	camera.lowerRadiusLimit = 3;
	
    // luci

    var light1 = new BABYLON.PointLight(
        'light1',
        new BABYLON.Vector3(0,1,0), scene);
    light1.parent = camera;

    creaModello();

	// chiama 'animaScena' prima di visualizzare ogni fotogramma
	scene.registerBeforeRender(animaScena);
	
    // fai partire il loop di rendering
    engine.runRenderLoop(function() { scene.render(); });
}


function creaSfera(r, color) {
    var sfera = BABYLON.MeshBuilder.CreateSphere("sfera", {diameter:r*2}, scene);
    var material = new BABYLON.StandardMaterial("mat", scene);
    material.diffuseColor = color;
	material.specularColor.set(0.1,0.1,0.1);
    sfera.material = material;
    return sfera;
}


function creaModello() {
	sole = creaSfera(1, new BABYLON.Color3(0.8,0.8,0.02));
	terra = creaSfera(0.5, new BABYLON.Color3(0.02,0.8,0.4));
	luna = creaSfera(0.1, new BABYLON.Color3(0.4,0.4,0.4));

	terra.parent = sole;
	luna.parent = terra;
	
	terra.position.x = 2;
	luna.position.x = 0.7;
}

function animaScena() {
	var t = performance.now();
	var phi;
	var r;
	
	// luna attorno alla terra
	phi = t * 0.005;
	r = 0.7;
	luna.position.set(Math.cos(phi)*r, 0, Math.sin(phi)*r);
	
	// terra-luna attorno al sole
	phi = t * 0.001;
	r = 2;
	terra.position.set(Math.cos(phi)*r, 0, Math.sin(phi)*r);
}
