var canvas, engine, scene, camera;
var coppie = [];

function inizia() {
    canvas = document.getElementById('c');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);

    // telecamera virtuale
    camera = new BABYLON.ArcRotateCamera('cam',
        0.3,0.7,20,
        new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas,true);
	camera.wheelPrecision=20;
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
	// creo il materiale per tutti gli elementi
	var mat = new BABYLON.StandardMaterial("mat",scene);
	mat.diffuseColor.set(0.8,0.4,0.1);
	mat.specularColor.set(0.2,0.2,0.2);

	// creo le coppie di elementi
	var n = 30;
	for(var i=0; i<n; i++) {
		
		var coppia = new BABYLON.Mesh("b",scene);
		coppie.push(coppia);
		
		var elemento;		
		elemento = BABYLON.MeshBuilder.CreateSphere("a", {diameter : 0.5 }, scene);
		elemento.scaling.set(4,1,5);		
		elemento.material = mat;
		// aggangio l'elemento alla coppia
		elemento.parent = coppia;
		elemento.position.z = 1;
		coppia.primo = elemento;
		
		elemento = BABYLON.MeshBuilder.CreateSphere("a", {diameter : 0.5 }, scene);
		elemento.scaling.set(4,1,5);		
		elemento.material = mat;
		// aggangio l'elemento alla coppia
		elemento.parent = coppia;
		elemento.position.z = -1;		
		coppia.secondo = elemento;
		
	}
}

function animaScena() {
	var t = performance.now();
	var psi = t*0.0001;
	var gamma = t * 0.001;
	var n = coppie.length;
	for(var i=0;i<n;i++) {
		var coppia = coppie[i];
		var phi = Math.PI*2*i/n;
		coppia.rotationQuaternion = new BABYLON.Quaternion();
		coppia.rotate(BABYLON.Axis.X, phi*0.5 + psi, BABYLON.Space.WORLD);
		coppia.rotate(BABYLON.Axis.Y, -phi + Math.PI/2, BABYLON.Space.WORLD);
		coppia.position.set(5*Math.cos(phi), 0, 5*Math.sin(phi));
		
		var elemento;
		var y = Math.sin(gamma)*0.3;
		var z = Math.cos(gamma)*1.5;
		
		coppia.primo.position.set(0,y,z); 
		coppia.secondo.position.set(0,-y,-z); 
	}
}
