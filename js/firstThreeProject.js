var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //camera(fieldOfView, aspectRatio=width/height, nearClipping, farClipping)

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);//select renderer, WebGL is one option(most modern?). the params for setSize are the size of our renderer, often best for width and height of window. Also common to do window.innerWidth/2 and window.innerHeight/2
document.body.appendChild( renderer.domElement);//adds the renderer to our body/canvas.

var geometry = new THREE.BoxGeometry(1,1,1); //contains all the points(vertices) and fill(faces) of the cube
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00}); //(material and color in hex)
var cube = new THREE.Mesh( geometry, material); //forms the geometry and the material over the mesh
scene.add( cube );

camera.position.z = 5; //default camera position would be inside our new object.

function render(){  //the above isn't rendered until we call the render function, which creates a render loop.
	requestAnimationFrame(render);
	cube.rotation.x += .03; // rotation added in to the render function. Anything that you want to move or change while the game/app is running has to go through the render loop. You can call other functions from here, so that you don't end up with a render function that's hundreds of lines.
	cube.rotation.y += .03;
	renderer.render(scene, camera);
}
render(); //the render loop causes the renderer(in this case, WebGL) to draw the scene 60 times per second.