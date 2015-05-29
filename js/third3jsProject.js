//set the scene and the renderer properties
var scene = new THREE.Scene(),
		camera = new THREE.PerspectiveCamera(75, 75, window.innerWidth / window.innerHeight, 0.1, 1000),
		renderer = new THREE.WebGLRenderer();
			renderer.setSize (window.innerWidth, window.innerHeight);
			renderer.setClearColor(0xffffff);

			document.body.appendChild( renderer.domElement);

// add a grid

var axis = new THREE.AxisHelper(10);
var Axiscolor = new THREE.Color("rgb(255,0,0)");

var grid = new THREE.GridHelper(50,5);
grid.setColors(Axiscolor, 0x000000);

scene.add(grid);

//add geomoetry

var recGeometry = new THREE.BoxGeometry(40,10,40),
		recMaterial = new THREE.MeshLambertMaterial({color: 0x000000}),
		rectangle = new THREE.Mesh(recGeometry, recMaterial);

		scene.add(rectangle);

		rectangle.position.x = 15;
		rectangle.position.y = 10;
		rectangle.position.z = 15;


//orbit controls
// controls = new THREE.OrbitControls (camera, renderer.domElement);
// controls.addEventListener('change', render);


//camera position
camera.position.x = 10;
camera.position.y = 30;
camera.position.z = 30;

camera.lookAt(scene.position);




function render(){
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}



render();