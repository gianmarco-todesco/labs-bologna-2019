
//
// createGrid()
//
// crea un LineSystem con i tre assi e 
// una griglia che rappresenta
// il piano xz
//
function createGrid(scene) {   
    var Color4 = BABYLON.Color4;
    var Vector3 = BABYLON.Vector3;
     
    var m = 50;
    var r = 5;
    var pts = [];
    var colors = [];
    var c1 = new Color4(0.7,0.7,0.7,0.5);
    var c2 = new Color4(0.5,0.5,0.5,0.25);
    var cRed   = new Color4(0.8,0.1,0.1);
    var cGreen = new Color4(0.1,0.8,0.1);
    var cBlue  = new Color4(0.1,0.1,0.8);
    
    var color = c1;
    function line(x0,y0,z0, x1,y1,z1) { 
        pts.push([new Vector3(x0,y0,z0), new Vector3(x1,y1,z1)]); 
        colors.push([color,color]); 
    }
    
    for(var i=0;i<=m;i++) {
        if(i*2==m) continue;
        color = (i%5)==0 ? c1 : c2;
        var x = -r+2*r*i/m;        
        line(x,0,-r, x,0,r);
        line(-r,0,x, r,0,x);
    }
    
    var r1 = r + 1;
    var a1 = 0.2;
    var a2 = 0.5;
    
    // x axis
    color = cRed;
    line(-r1,0,0, r1,0,0); 
    line(r1,0,0, r1-a2,0,a1);
    line(r1,0,0, r1-a2,0,-a1);
        
    // z axis
    color = cBlue;
    line(0,0,-r1, 0,0,r1); 
    line(0,0,r1, a1,0,r1-a2);
    line(0,0,r1,-a1,0,r1-a2);
    
    // y axis
    color = cGreen;
    line(0,-r1,0, 0,r1,0); 
    line(0,r1,0, a1,r1-a2,0);
    line(0,r1,0,-a1,r1-a2,0);
    line(0,r1,0, 0,r1-a2,a1);
    line(0,r1,0, 0,r1-a2,-a1);
    
    ppts = pts;
    ccolors = colors;
    lines = BABYLON.MeshBuilder.CreateLineSystem(
        "lines", {
                lines: pts,
                colors: colors,
                
        }, 
        scene);
    return lines;    
}

