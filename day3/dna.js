var canvas,engine,scene,camera,light,ground;
var cilindri = [];

// inizializzazione
window.addEventListener("DOMContentLoaded", function() {

	// canvas, engine, scene
    canvas = document.getElementById('c');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(0.3,0.3,0.3);

	// camera
    camera = new BABYLON.ArcRotateCamera('cam',0.3,0.8,10,
        new BABYLON.Vector3(0,0,0), scene);
    camera.wheelPrecision = 50;
    camera.attachControl(canvas,true);

	// light
    light = new BABYLON.PointLight('light1', new BABYLON.Vector3(1,20,-10), scene);
    light.parent = camera;

	// grid (vedi plslib.js)
    createGrid(scene);

    // materiale sfera
    var matSfera = new BABYLON.StandardMaterial("m",scene);
    matSfera.diffuseColor.set(0.2,0.8,0.5);

    // materiale cilindro
    var matCilindro = new BABYLON.StandardMaterial("m",scene);
    matCilindro.diffuseColor.set(0.6,0.6,0.6);

    // parametri modello
    var raggioSfera = 0.15;
    var raggioCilindro = 0.05;
    var lunghezzaCilindro = 1;
    var distanzaCilindri = 0.3;
    var m = 50;

    // creo il modello
    for(var i=0; i<m; i++) {

        // cilindro
        var cilindro = BABYLON.MeshBuilder.CreateCylinder("c",
            {diameter: raggioCilindro*2, height: lunghezzaCilindro},
            scene);
        cilindro.material = matCilindro;
        cilindro.rotation.z = Math.PI/2;
        cilindri.push(cilindro);

        // prima sfera
        var sfera = BABYLON.MeshBuilder.CreateSphere("t", 
            {diameter:raggioSfera*2}, 
            scene);
        sfera.material = matSfera;
        sfera.parent = cilindro;
        sfera.position.y = lunghezzaCilindro/2;

        // seconda sfera
        var sfera = BABYLON.MeshBuilder.CreateSphere("t", 
            {diameter:raggioSfera*2}, 
            scene);
        sfera.material = matSfera;
        sfera.parent = cilindro;
        sfera.position.y = -lunghezzaCilindro/2;

        // posiziono il cilindro i-esimo lungo l'asse verticale
        cilindro.position.y = (i - (m-1)/2) * distanzaCilindri;
    }


    scene.registerBeforeRender(animate);
    engine.runRenderLoop(function() { scene.render(); });
    window.addEventListener('resize', function() { engine.resize(); });

});


// animazione
function animate() {
    // tempo (in secondi) dall'inizio dell'animazione
	var t = performance.now()*0.001;

    // angolo di rotazione del cilindro più in alto
    var psi = 4*Math.PI * Math.cos(t);

    // ruoto i cilindri
    for(var i=0; i<cilindri.length; i++) {
        var cilindro = cilindri[i];
        // l'angolo di rotazione del cilindro i-esimo dipende da i e da psi:
        // varia linearmente da 0 per il cilindro più in basso e psi per quello 
        // più in alto
        cilindro.rotation.y = i * psi / (cilindri.length-1);
    }

}
