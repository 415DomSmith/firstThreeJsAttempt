

//WEB AUDIO FUCKTHISSHIT

//variables
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source,
		sourceJS,
		songLength,
		analyser,
		myBuffer,
		audioData,
		boost,
		url = './James_Blake_Retrograde_Basista_Remix.mp3';
var inputData = [];
var val1,
		val2;
var textMaterial;


source = audioCtx.createBufferSource();
sourceJS = audioCtx.createScriptProcessor(512);

function getData() {
	console.log('working')
  request = new XMLHttpRequest();
  request.open('GET', 'James_Blake_Retrograde_Basista_Remix.mp3', true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
    		
        myBuffer = buffer;
        songLength = buffer.duration;
        source.buffer = myBuffer;
        source.connect(audioCtx.destination);

        analyser = audioCtx.createAnalyser();
        analyser.smoothingTimeConstant = 1;
        analyser.fftSize = 512 ;
        sourceJS.connect(audioCtx.destination);
        source.connect(analyser);
        analyser.connect(sourceJS);
        source.connect(audioCtx.destination);
        source.loop = true;
        
   		sourceJS.onaudioprocess = function(audioEvent) {		
				var inputBuffer = audioEvent.inputBuffer
				var outputBuffer = audioEvent.outputBuffer;
				//for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
				inputData = inputBuffer.getChannelData(inputBuffer);
				analyser.getByteFrequencyData(inputData);

				// for(var i = 0; i < inputData.length; i++){
				// 	boost += inputData[i];
				// }
				
		   val1 = inputData[100] * 10//Math.floor();
		   val2 = inputData[333] * 10
		   //frequencyData.push(val1);
		   //val2+= Math.floor(inputData[0]);
			//console.log(val1);
			};         
  },

   function(e){"Error with decoding audio data" + e.err});
		}

  request.send(); 
};

getData();
source.start(0);	

  



//THREE.JS SCENE


//create our variables to be used later

var container, scene, camera, renderer; //scene and renderer variable
var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;
var sphere, text, geometry, color, 
		size, particles,sphereMaterial, parameters,
		whiteKey, materials = []; //variable for objects in scene
var guiControls, datGUI; //variables for dat-gui


//init function does all the work, building the scene and adding all the pieces together


function init (){
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(WIDTH, HEIGHT); //aspect ratio for full screen
	renderer.setClearColor(0x000000, 1) //sets the background B4B4B4
	renderer.shadowMapEnabled = true; //enables shadows
	renderer.shadowMapSoft = true; //smooths shadow shape
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild(renderer.domElement);

//sets starting camera position
	camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 20000); 
	camera.position.set(150,10000,120);
	scene.add(camera);

	var light = new THREE.PointLight(0xffffff); //creates light with hex color
	light.position.set(0, 50, 30); //sets lights position
	scene.add(light);


// for (var ii = 0; ii< 30; i++){
// 	whiteKeyArr[ii]= 'whiteKey' + ii;
// }

// for(var i = 0; i < 90; i+= 3){ //loops to make 30 white rectangles
// 	whiteKeyArr[i]= 'whiteKey' + i;
// 	var whiteKeyGeometry = new THREE.BoxGeometry(2,2,10); //contains all the points(vertices) and fill(faces) of the cube
// 	var whiteKeyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff}); //(material and color in hex, lambert can cast shadows.)
// 	whiteKey = new THREE.Mesh( whiteKeyGeometry, whiteKeyMaterial);
// 	whiteKey.castShadow = true;
// 	whiteKey.position.x = i;


// 	scene.add(whiteKey)
// }

whiteKey = [];

var i = 0;
for(var x = 0; x < 90; x += 3) {
    var j = 0;
    whiteKey[i] = new Array();
    
        var whiteKeyGeometry = new THREE.BoxGeometry(2, 2, 10);

        var whiteKeyMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        ambient: 0x808080,
        specular: 0xffffff,
        shininess: 20,
        reflectivity: 5.5
        });
for(var y = 0; y < 90; y += 3) {
        whiteKey[i][j] = new THREE.Mesh(whiteKeyGeometry, whiteKeyMaterial);
        whiteKey[i][j].position.x = y;

        scene.add(whiteKey[i][j]);
        j++;
    }
    i++;
    
}





for(var k = 0; k < 87; k+=3){ //loops to make 29 black smaller rectangles
	var blackKeyGeometry = new THREE.BoxGeometry(1,2,8); //contains all the points(vertices) and fill(faces) of the cube
	var blackKeyMaterial = new THREE.MeshPhongMaterial({ color: 0x000000}); //(material and color in hex, lambert can cast shadows.)
	var blackKey = new THREE.Mesh( blackKeyGeometry, blackKeyMaterial);
	blackKey.castShadow = true;
	blackKey.position.x = k +1;
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
var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff});
var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(//controls line building using conneting line segments
			new THREE.Vector3(10, 0, 0),
			new THREE.Vector3(0, 180, 0),
			new THREE.Vector3(10, 0, 0)
	);
var line = new THREE.Line( lineGeometry, lineMaterial);
line.position.y = 60;
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

//scene.add(grid);  //adds grid to the scene

scene.add( plane );

//3D text
var textGeometry = new THREE.TextGeometry('gSchool Rocks!', {size:10, height:10} );
textMaterial = new THREE.MeshLambertMaterial({color: 0xff9000});
//textMaterial.color.setHSL( .2, .5, .3 );
text = new THREE.Mesh( textGeometry, textMaterial);

text.position.x = -100;
text.position.z = -100;
text.position.y = 2;
text.rotation.x = -.8;
text.rotation.z = 0;
scene.add( text )

//particles!

geometry = new THREE.Geometry();

	for ( i = 0; i < 700; i ++ ) {     //controls number of particles
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2000 - 1000;
		vertex.y = Math.random() * 2000 - 1000;
		vertex.z = Math.random() * 2000 - 1000;

		geometry.vertices.push( vertex );
	}

	parameters = [
		[ [1, 1, 0.5], 5 ],					//parameters holds HSL values for color in index[0][0], and size in index [0][1]
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

		particles.rotation.x = Math.random() * 6;    //determines rotation position
		particles.rotation.y = Math.random() * 6;
		particles.rotation.z = Math.random() * 6;   

		scene.add( particles );
	}

//fog
scene.fog=new THREE.Fog( 0xffffff, 0.001, 1100 ); //adds a fog, takes parameters (color, near render distance, far render distance)


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

//var counter = 0;
//animate function is what makes everything move, and it calls itself through the built in requestAnimationFrame function 60x a second
function animate(){
	var time = Date.now() * 0.00005;
	requestAnimationFrame(animate);
	sphere.rotation.y += guiControls.rotationY
	text.rotation.x += guiControls.rotationX
	//whiteKey.position.z = frequencyData.length + 1;

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

	//animation control for the keys!
		//if (counter === 10){
			
			if(val1 > 1.5){
				
				textMaterial.color.setHSL( val1 - 1, .5, .3 );
				//sphere.material.color.setHSL(val2 -1, .5, .3);	
			}
			if (val2 > 1.3){
				//console.log(val2);
				for(var x = 0; x < whiteKey.length; x++){
					for(var y = 0; y < whiteKey.length; y+=2){
						//for(var z = 0; y < whiteKey.length; z+=3){
							whiteKey[x][y].material.color.setHSL ( val1, .5, .3 );
							//whiteKey[x][z].material.color.setHSL ( val1, .5, .3 );
							//whiteKey[x][y].material.color.setHSL ( val1, .5, .3 );
							whiteKey[x][y].position.z += val2;
							whiteKey[x][y].position.y += - val2 + 1;

							if (whiteKey[x][y].position.z > 2) {
							whiteKey[x][y].position.z = 0;
							whiteKey[x][y].position.y = 0;
							}
						//}	
					}
				}
			}
				// whiteKey[x][x + 1].material.color.setHSL ( val1, .5, .3 );			
				
				
				//counter = 0;
			//}
			
			//frequencyData = [];
			
	//}

	//counter++;
	renderer.render(scene, camera);
	controls.update();
}

//call functions to be defined below. 	

init(); //defines the scene and renderer, appends renderer to the body, and sets camera position
animate();//calls the animate function, which calls itself 60 times a second
console.log(whiteKey);
//setTimeout( function() {

//} , 10000); //plays the music