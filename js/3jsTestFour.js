//create our variables to be used later
var container, scene, camera, renderer;
var sphere, text, geometry, color, size, particles, parameters, materials = [];
var guiControls, datGUI;
var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

//call functions to be defined below. 	
init(); //defines the scene and renderer, appends renderer to the body, and sets camera position
animate();

function init (){
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(WIDTH, HEIGHT); //aspect ratio for full screen
	renderer.setClearColor(0xB4B4B4, 1) //sets the background
	renderer.shadowMapEnabled = true; //enables shadows
	renderer.shadowMapSoft = true; //smooths shadow shape
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild(renderer.domElement);

//sets starting camera position
	camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 20000); 
	camera.position.set(150,65,120);
	scene.add(camera);

	var light = new THREE.PointLight(0xffffff); //creates light with hex color
	light.position.set(100, 200, 50); //sets lights position
	scene.add(light);

for(var i = 0; i <90; i+=3){ //loops to make 20 white rectangles
	var whiteKeyGeometry = new THREE.BoxGeometry(2,2,10); //contains all the points(vertices) and fill(faces) of the cube
	var whiteKeyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff}); //(material and color in hex, lambert can cast shadows.)
	var whiteKey = new THREE.Mesh( whiteKeyGeometry, whiteKeyMaterial);
	whiteKey.castShadow = true;
	whiteKey.position.x = i;

	scene.add(whiteKey)
}

for(var j = 0; j < 87; j+=3){ //loops to make 19 black smaller rectangles
	var blackKeyGeometry = new THREE.BoxGeometry(1,2,8); //contains all the points(vertices) and fill(faces) of the cube
	var blackKeyMaterial = new THREE.MeshPhongMaterial({ color: 0x000000}); //(material and color in hex, lambert can cast shadows.)
	var blackKey = new THREE.Mesh( blackKeyGeometry, blackKeyMaterial);
	blackKey.castShadow = true;
	blackKey.position.x = j +1;
	blackKey.position.y = 4;          
	blackKey.position.z = -4;
	scene.add(blackKey)
}

//creates disco ball
var sphereGeometry = new THREE.SphereGeometry(8, 32, 32); //radius, width segments, height segments
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCCF8FF, wireframe: true});//makes sphere a wire frame and gives if color
		sphere = new THREE.Mesh( sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.castShadow = true;
sphere.position.y = 55;
sphere.position.x = 50;

//creates disco ball string
var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000});
var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(//controls line building using conneting line segments
			new THREE.Vector3(10, 0, 0),
			new THREE.Vector3(0, 180, 0),
			new THREE.Vector3(10, 0, 0)
	);
var line = new THREE.Line( lineGeometry, lineMaterial);
line.position.y = 50;
//line.position.z = -10;
line.position.x = 41;
scene.add(line);

//create the floor/plane
var planeGeometry = new THREE.PlaneGeometry (630,600,300); //same as the cube, but creates a plane
var planeMaterial = new THREE.MeshLambertMaterial({color: 0x707070});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -.5*Math.PI; //sets the angle that the plane sits at. Uses wonky math to determine rotation (of X only here), instead of using degrees. It uses uler radiants, basing everything off of PI. -.5 * PI is basically one quarter, or 90 deg.
plane.receiveShadow = true; //allows objects that cast shadows to cast their shadows on the plane.
plane.position.y = -50;

var grid = new THREE.GridHelper(299,18);  //adds squares to the plane via the grid
grid.setColors('color', 0x000000);  //creates grid
grid.position.y = -49;

scene.add(grid);  //adds grid to the scene

scene.add( plane );

//3D text
var textGeometry = new THREE.TextGeometry('gSchool Rocks!', {size:10, height:10} );
var textMaterial = new THREE.MeshLambertMaterial({color: 0xff9000});
text = new THREE.Mesh( textGeometry, textMaterial);

text.position.x = -100;
text.position.z = -100;
text.position.y = 2;
text.rotation.x = -.8;
text.rotation.z = 0;
scene.add( text )

//particles!

geometry = new THREE.Geometry();

				for ( i = 0; i < 1000; i ++ ) {

					var vertex = new THREE.Vector3();
					vertex.x = Math.random() * 2000 - 1000;
					vertex.y = Math.random() * 2000 - 1000;
					vertex.z = Math.random() * 2000 - 1000;

					geometry.vertices.push( vertex );

				}

			parameters = [
					[ [1, 1, 0.5], 5 ],
					[ [0.95, 1, 0.5], 4 ],
					[ [0.90, 1, 0.5], 3 ],
					[ [0.85, 1, 0.5], 2 ],
					[ [0.80, 1, 0.5], 1 ]
				];

				for ( i = 0; i < parameters.length; i ++ ) {

					color = parameters[i][0];
					size  = parameters[i][1];

					materials[i] = new THREE.PointCloudMaterial( { size: size } );

					particles = new THREE.PointCloud( geometry, materials[i] );

					particles.rotation.x = Math.random() * 6;
					particles.rotation.y = Math.random() * 6;
					particles.rotation.z = Math.random() * 6;

					scene.add( particles );
				}

//scene.fog=new THREE.Fog( 0xffffff, 0.001, 1100 ); //adds a fog, takes parameters (color, near render distance, far render distance)


//adds in dat-gui for disco ball spin speed
guiControls = new function(){
	this.rotationY = 1
	this.rotationX = .01;
}
datGUI = new dat.GUI();
datGUI.add(guiControls, 'rotationY', 0, 1);
datGUI.add(guiControls, 'rotationX', 0, 1);


//adds in the orbit controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);

//changes viewport on resize if user adjusts browser once graphics have loaded
	window.addEventListener('resize', function(){ 
		var WIDTH = window.innerWidth,
				HEIGHT = window.innerHeight;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix(); //updates our scene with the above functions parameters on 'resize'
	});
}

function animate(){
	var time = Date.now() * 0.00005;
	requestAnimationFrame(animate);
	sphere.rotation.y += guiControls.rotationY
	text.rotation.x += guiControls.rotationX
	//animation and color control for the particles! ripped and tweaked from  http://threejs.org/examples/webgl_particles_random.html
	for ( i = 0; i < scene.children.length; i ++ ) {
		var object = scene.children[ i ];
			if ( object instanceof THREE.PointCloud ) {
				object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
			}
	}

	for ( i = 0; i < materials.length; i ++ ) {
		color = parameters[i][0];
		h = ( 360 * ( color[0] + time ) % 360 ) / 360;
		materials[i].color.setHSL( h, color[1], color[2] );
	}

	renderer.render(scene, camera);
	controls.update();
}