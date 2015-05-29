var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //camera(fieldOfView, aspectRatio=width/height, nearClipping, farClipping)

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);//select renderer, WebGL is one option(most modern?). the params for setSize are the size of our renderer, often best for width and height of window. Also common to do window.innerWidth/2 and window.innerHeight/2

renderer.setClearColor(0x000000); //sets background / world color
renderer.shadowMapEnabled = true; //enables shadows
renderer.shadowMapSoft = true; //smooths shadow shape

var axis = new THREE.AxisHelper(10);   //adds a grid to the world 
var color = new THREE.Color("rgb(255,0,0)"); //changes grid color

var grid = new THREE.GridHelper(50,5);   
grid.setColors(color, 0x000000);  //creates grid

scene.add(grid);  //adds grid to the scene



var cubeGeometry = new THREE.BoxGeometry(2,2,10); //contains all the points(vertices) and fill(faces) of the cube
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff}); //(material and color in hex, lambert can cast shadows.)
var cube = new THREE.Mesh( cubeGeometry, cubeMaterial); //forms the geometry and the material over the mesh

var planeGeometry = new THREE.PlaneGeometry (80,80,80); //same as the cube, but creates a plane
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xff3300});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -.5*Math.PI; //sets the angle that the plane sits at. Uses wonky math to determine rotation (of X only here), instead of using degrees. It uses uler radiants, basing everything off of PI. -.5 * PI is basically one quarter, or 90 deg.
plane.receiveShadow = true; //allows objects that cast shadows to cast their shadows on the plane.

scene.add( plane );
scene.add ( cube );

plane.position.y = 0;

cube.position.x = 5;
cube.position.y = 10;
cube.position.z = 5;

// cube.position.x = ( Math.random() - 0.5 ) * 10;
// cube.position.y = ( Math.random() - 0.5 ) * 10;
// cube.position.z = ( Math.random() - 0.5 ) * 10;


//Trying to loop multiple squares

//var cubeGeometry = new THREE.BoxGeometry(10,10,10); //contains all the points(vertices) and fill(faces) of the cube
//var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00}); //(material and color in hex, lambert can cast shadows.)

//for (var i = 0; i < 100; i++){
//var cube = new THREE.Mesh( cubeGeometry, cubeMaterial); //forms the geometry and the material over the mesh
// cube.position.x = ( Math.random() - 0.5 ) * 10;
// cube.position.y = ( Math.random() - 0.5 ) * 10;
// cube.position.z = ( Math.random() - 0.5 ) * 10;
// cube.updateMatrx();
// cube.matrixAutoUpdate = false;
//scene.add( cube );
//cube.castShadow = true; //allows the cube to cast shadows
//}


// textGeometry = new THREE.TextGeometry('Dom is Beast', {size: 2, height:1});
// textMaterial = new THREE.MeshPhongMaterial ({color: 0xff9000});
// text = new THREE.Mesh ( textGeometry, textMaterial);

// scene.add( text );

// text.position.x= 6;
// text.position.y= 4;
// text.position.z= 2.5;
// text.castShadow = true;


var spotLight = new THREE.SpotLight(0xffffff); //creates a spotlight that casts white color
spotLight.castShadow = true;  //allows objects hit by the light to cast shadows (i think)
spotLight.position.set (0,40,80);

scene.add(spotLight);


//camera controls
camera.position.z = 50; //default camera position would be inside our new object.
camera.position.x = 40;
camera.position.y = 40;
camera.position.z = 40;

camera.lookAt(scene.position);

//orbit controls
// controls = new THREE.OrbitControls (camera, renderer.domElement);
// controls.addEventListener('change', render);

//getting dat-GUI to change properties of animation
var guiControls = new function(){
	this.rotationX = 0.01
	this.rotationY = 0.01
	this.rotationZ = 0.01
	this.positionX = 0
	this.positionY = 0
	this.positionZ = 0
}

var datGUI = new dat.GUI();
datGUI .add(guiControls, 'rotationX', 0, 1);
datGUI .add(guiControls, 'rotationY', 0, 1);
datGUI .add(guiControls, 'rotationZ', 0, 1);
datGUI .add(guiControls, 'rotationZ', 0, 1);
datGUI .add(guiControls, 'positionX', -0.05, 0.05);
datGUI .add(guiControls, 'positionY', -0.05, 0.05);
datGUI .add(guiControls, 'positionZ', -0.05, 0.05);

//render all of the above

function render(){  //the above isn't rendered until we call the render function, which creates a render loop. This is an animation function.
	requestAnimationFrame(render);
	cube.rotation.x += guiControls.rotationX // rotation added in to the render function. Anything that you want to move or change while the game/app is running has to go through the render loop. You can call other functions from here, so that you don't end up with a render function that's hundreds of lines.
	cube.rotation.y += guiControls.rotationY
	cube.rotation.z += guiControls.rotationZ
	cube.position.x += guiControls.positionX
	cube.position.y += guiControls.positionY
	cube.position.z += guiControls.positionZ
	renderer.render(scene, camera);
}



document.body.appendChild( renderer.domElement);//addhs the renderer to our body/canvas.


render(); //the render loop causes the renderer(in this case, WebGL) to draw the scene 60 times per second.