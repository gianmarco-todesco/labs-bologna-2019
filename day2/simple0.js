var canvas, engine, scene, camera;


function inizia() {
    canvas = document.getElementById('c');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);

    // telecamera virtuale
    camera = new BABYLON.ArcRotateCamera('cam',
        0.3,1.2,5,
        new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas,true);

    // luci

    var light1 = new BABYLON.PointLight(
        'light1',
        new BABYLON.Vector3(0,1,0), scene);
    light1.parent = camera;

    creaModello();

    // fai partire il loop di rendering
    engine.runRenderLoop(function() { scene.render(); });
}

function creaCubo(x,y,z) {
    var cube = BABYLON.MeshBuilder.CreateBox('cubo', {size:0.9}, scene);
    cube.position.set(x,y,z);
    var material = new BABYLON.StandardMaterial("materiale cubo", scene);
    material.diffuseColor.set(0.8,0.5,0.1);
    material.specularColor.set(0.1,0.1,0.1);
    cube.material = material;
    return cube;
}
function creaModello() {
    creaCubo( 0, 0, 0);
    creaCubo(-1, 0, 0);
    creaCubo( 1, 0, 0);
    creaCubo( 0, 1, 0);
    creaCubo( 0,-1, 0);
    creaCubo( 0, 0,-1);
    creaCubo( 0, 0, 1);
}
