// Imports
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// start the scene
import * as THREE from 'three';

var height = 100;
const eyeAt = 15; // 15cm below one's height level
const eyeTo = -1; // look a bit down, these many cm

const scene = new THREE.Scene();
const sceneCabinets = new THREE.Scene();

scene.backgroundBlurriness = 0.3
scene.background = new THREE.Color(0xffffe0);
scene.position.y = 0.5; // lift the whole studio up within the view

let sceneOrigBgColor = scene.background;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.2, (height - eyeAt) / 100, 4.8);
var cameraMoveToZ = camera.position.z;
var cameraDoMoveToZ = false;

var cameraMoveToX = camera.position.x;
var cameraDoMoveToX = false;

var panelHeight = 70; // control panel outside of the render zone
if (window.innerWidth < 500) {
	panelHeight = 100;
}

// lights
let lights = [];
let lightsOn = true;
const container = document.getElementById('container');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight - panelHeight);
renderer.setClearColor(0xd0d0d0, 1);
//renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
console.log('renderer>>', renderer.domElement);
container.appendChild(renderer.domElement);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(camera.position.x, (height - eyeAt + eyeTo) / 100, 0);
controls.update();

var cameraLookToY = controls.target.y;
var cameraDoLookToY = false;



// GLTF
// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
let objs = [];
let sides = [];
sides['left'] = [];
sides['right'] = [];
sides['mid'] = [];
sides['sofa'] = [];

let activeLeft = "";
let activeMid = "";
let activeRight = "";
let activeSofa = "";

function loadModels() {

	// demo items
	loadGLTFitem('left', 'Steelv3', -0.750, +0.00, -0.000, true);
	loadGLTFitem('left', 'Wood2v3', -1.500, +0.00, -0.000, false);

	// real stuff
	loadGLTFitem('left', '500-A-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '500-B-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '500-C-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '500-h400-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '500-h500-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '500-h600-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '600-A-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '600-B-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '600-C-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '600-h400-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '600-h500-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '600-h600-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-A-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-B-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-D-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-E-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-h400-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-h500-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-h600-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '800-С-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-A-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-B-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-C-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-D-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-E-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-h400-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-h500-L', -1.500, +0.00, +0.300, false);
	loadGLTFitem('left', '900-h600-L', -1.500, +0.00, +0.300, false);


	loadGLTFitem('mid', '500-A-M', +0.000, +0.00, +0.300, true);
	loadGLTFitem('mid', '500-B-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '500-C-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '500-h400-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '500-h500-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '500-h600-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '600-A-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '600-B-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '600-C-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '600-h400-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '600-h500-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '600-h600-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-A-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-B-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-D-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-E-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-h400-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-h500-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-h600-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '800-С-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-A-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-B-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-C-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-D-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-E-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-h400-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-h500-M', +0.000, +0.00, +0.300, false);
	loadGLTFitem('mid', '900-h600-M', +0.000, +0.00, +0.300, false);


	loadGLTFitem('right', '500-A-R', +0.500, +0.00, +0.300, true);
	loadGLTFitem('right', '500-B-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '500-C-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '500-h400-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '500-h500-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '500-h600-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '600-A-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '600-B-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '600-C-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '600-h400-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '600-h500-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '600-h600-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-A-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-B-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-D-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-E-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-h400-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-h500-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-h600-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '800-С-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-A-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-B-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-C-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-D-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-E-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-h400-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-h500-R', +1.500, +0.00, +0.300, false);
	loadGLTFitem('right', '900-h600-R', +1.500, +0.00, +0.300, false);

	loadGLTFitem('sofa', 'sofa2', -2.5, 0, 0.55, true);

	document.getElementById('wdleft').disabled = false;
	document.getElementById('wdmid').disabled = false;
	document.getElementById('wdright').disabled = false;
}
loadModels();

function loadGLTFitem(side, objName, px, py, pz, shown) {
	sides[side][objName] = objName;

	let fileName = 'models/v8/' + objName + '.gltf';
	loader.load(
		fileName, // resource URL	
		function (gltf) { // called when the resource is loaded
			let obj = gltf.scene;
			obj.castShadow = true;
			obj.receiveShadow = true;
			obj.position.x = px;
			obj.position.y = py;
			obj.position.z = pz;
			obj.visible = shown

			let opt = document.createElement('option');
			opt.value = objName
			opt.text = objName
			opt.selected = false
			if (objName == "sofa2") {
				obj.rotation.y = 0.5;
			}

			if (shown) {
				opt.selected = true;

				if (side == "left") {
					activeLeft = objName;
				}
				if (side == "mid") {
					activeMid = objName;
				}
				if (side == "right") {
					activeRight = objName;
				}
				if (side == "sofa") {
					activeSofa = objName;
					obj.visible = false; // hide sofas so far
				}
			}

			if (side == "left" || side == "right" || side == "mid") {
				let wdSide = document.getElementById('wd' + side);
				wdSide.add(opt, null)
			}


			/*
			console.log("---");
			console.log(dumpObject(obj).join('\n'));
			
			for (let i in obj) {
				console.log(i, obj[i]);
			}
			console.log("===");
			*/
			scene.add(obj);
			objs[objName] = obj;
			gltf.animations; gltf.scene; gltf.scenes; gltf.cameras; gltf.asset;

		},
		function (xhr) { // called while loading is progressing
			if (xhr.total == 0) {
				return // nothing to calc yet
			}
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) { // called when loading has errors
			console.warn('An error happened for ' + fileName);
			console.error(error);
		}
	);
}


// debug
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
	const localPrefix = isLast ? '└─' : '├─';
	lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
	const newPrefix = prefix + (isLast ? '  ' : '│ ');
	const lastNdx = obj.children.length - 1;
	obj.children.forEach((child, ndx) => {
		const isLast = ndx === lastNdx;
		dumpObject(child, lines, isLast, newPrefix);
	});
	return lines;
}


// gui controls
function makeXYZGUI(gui, vector3, name, onChangeFn) {
	const folder = gui.addFolder(name);
	folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
	folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
	folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
	folder.open();
}



// ==========
class ColorGUIHelper {
	constructor(object, prop) {
		this.object = object;
		this.prop = prop;
	}
	get value() {
		return `#${this.object[this.prop].getHexString()}`;
	}
	set value(hexString) {
		this.object[this.prop].set(hexString);
	}
}


// main light
{
	const light = new THREE.PointLight(0xFFFFFF, 7);
	light.position.set(4.3, 5.55, 10.66);
	scene.add(light);
	light.originalIntensity = light.intensity;
	lights.push(light);
}

// back light
{
	const color = 0xFFFFFF;
	const intensity = 0.33;
	const light = new THREE.PointLight(color, intensity);
	light.position.set(-0.58, 1.64, -1.3);
	scene.add(light);
	light.originalIntensity = light.intensity;
	lights.push(light);
}

// btm light
{
	const light = new THREE.PointLight(0xFFFFFF, 7);
	light.position.set(-1.06, -2, 1.4);
	scene.add(light);
	light.originalIntensity = light.intensity;
	lights.push(light);
}


// side light
{
	const light = new THREE.PointLight(0xFFFFFF, 7);
	light.position.set(-1.06, 0.15, 1.4);
	scene.add(light);
	light.originalIntensity = light.intensity;
	lights.push(light);


	// side light's controls
	/*
	const helper = new THREE.PointLightHelper(light);
	scene.add(helper);

	function updateLight() {
	  helper.update();
	}
    
	const gui = new GUI();
	gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
	gui.add(light, 'intensity', 0, 2, 0.01);
	gui.add(light, 'distance', 0, 40).onChange(updateLight);

	makeXYZGUI(gui, light.position, 'position');    
	*/
}

console.log("LIGHTS", lights.length);


// mouse light (to be used when the other lights are off)
const mouseLight = new THREE.PointLight(0xFFFFFF, 0.5);
mouseLight.position.set(-0.5, -2, 2.0);
mouseLight.visible = false;
scene.add(mouseLight);


// minmax
let camMinX = controls.target.x - 0.2
let camMaxX = controls.target.x + 0.2
let camSpeed = 0.002
let camDirection = 1
let camMove = 0

// animate (the rendering)
function animate() {
	requestAnimationFrame(animate);
	funStuff();
	renderer.render(scene, camera);
}
animate();

// activity!
function funStuff() {
	//objs["P_R_O_1000_2400"].position.x -= 0.01; // @@@	

	if (cameraMoveToZ != camera.position.z) {
		walkZ()
	}

	if (cameraMoveToX != camera.position.x) {
		walkX()
	}

	if (cameraLookToY != controls.target.y) {
		lookY()
	}

	if (camMove) {
		controls.target.x += camSpeed * camDirection
		if (controls.target.x >= camMaxX) {
			camDirection = -1
		}
		if (controls.target.x <= camMinX) {
			camDirection = 1
		}
		controls.update();
	}
}

function walkZ() {
	if (!cameraDoMoveToZ) {
		return;
	}

	let camMoveZ = 0.01;
	if (camera.position.z < cameraMoveToZ) {
		let newZ = camera.position.z + camMoveZ;
		if (newZ >= cameraMoveToZ) {
			newZ = cameraMoveToZ;
			cameraDoMoveToZ = false;
		}
		camera.position.z = newZ;
	}
	else if (camera.position.z > cameraMoveToZ) {
		let newZ = camera.position.z - camMoveZ;
		if (newZ <= cameraMoveToZ) {
			newZ = cameraMoveToZ;
			cameraDoMoveToZ = false;
		}
		camera.position.z = newZ;
	}

}

function walkX() {
	if (!cameraDoMoveToX) {
		return;
	}

	let camMoveX = 0.01;
	if (camera.position.x < cameraMoveToX) {
		let newX = camera.position.x + camMoveX;
		if (newX >= cameraMoveToX) {
			newX = cameraMoveToX;
			cameraDoMoveToX = false;
		}
		camera.position.x = newX;
		controls.target.x = camera.position.x;
	}
	else if (camera.position.x > cameraMoveToX) {
		let newX = camera.position.x - camMoveX;
		if (newX <= cameraMoveToX) {
			newX = cameraMoveToX;
			cameraDoMoveToX = false;
		}
		camera.position.x = newX;
		controls.target.x = camera.position.x;
	}

}

function lookY() {
	if (!cameraDoLookToY) {
		return;
	}

	let camLookY = 0.01;
	if (controls.target.y < cameraLookToY) {
		let newY = controls.target.y + camLookY;
		if (newY >= cameraLookToY) {
			newY = cameraLookToY;
			cameraDoLookToY = false;
		}
		controls.target.y = newY;
		controls.update();
	}
	else if (controls.target.y > cameraLookToY) {
		let newY = controls.target.y - camLookY;
		if (newY <= cameraLookToY) {
			newY = cameraLookToY;
			cameraDoLookToY = false;
		}
		controls.target.y = newY;
		controls.update();
	}

}



// events: change the left one
document.addEventListener("chgleft", (e) => {
	let v = document.getElementById('wdleft').value;
	console.log("CHGLEFT", v);
	for (let o in sides['left']) {
		if (o != v) {
			objs[o].visible = false
		}
	}

	objs[v].position.x = objs[activeLeft].position.x;
	objs[v].position.z = objs[activeLeft].position.z;
	objs[v].rotation.y = objs[activeLeft].rotation.y;

	console.log("SWITCH", objs[v].position.x, objs[activeLeft].position.x);

	objs[v].visible = true
	activeLeft = v;
},
	false
);

// events: change the mid one
document.addEventListener("chgmid", (e) => {
	let v = document.getElementById('wdmid').value;
	console.log("CHGMID", v);
	for (let o in sides['mid']) {
		if (o != v) {
			objs[o].visible = false
		}
	}

	objs[v].position.x = objs[activeMid].position.x;
	objs[v].position.z = objs[activeMid].position.z;
	objs[v].rotation.y = objs[activeMid].rotation.y;

	console.log("SWITCH", objs[v].position.x, objs[activeMid].position.x);

	objs[v].visible = true
	activeMid = v;
},
	false
);

// events: change the right one
document.addEventListener("chgright", (e) => {
	let v = document.getElementById('wdright').value;
	console.log("CHGRIGHT", v);
	for (let o in sides['right']) {
		if (o != v) {
			objs[o].visible = false
		}
	}

	objs[v].position.x = objs[activeRight].position.x;
	objs[v].position.z = objs[activeRight].position.z;
	objs[v].rotation.y = objs[activeRight].rotation.y;

	objs[v].visible = true
	activeRight = v;
},
	false
);

// events: move/stop
document.addEventListener("chgmove", (e) => {
	let v = document.getElementById('wdmove').value;
	console.log("CHGMOVE", v);
	if (v == 'stop') {
		camMove = 0;
	} else {
		camMove = 1;
	}
},
	false
);

// events: height
document.addEventListener("chgheight", (e) => {
	let v = document.getElementById('wdheight').value;
	console.log("CHGHEIGHT", v);

	height = v

	camera.position.y = (height - eyeAt) / 100;
	controls.target.y = (height - eyeAt + eyeTo) / 100;
	controls.update();

},
	false
);

// events: closer
document.addEventListener("chgcloser", (e) => {
	console.log("CLOSER");
	cameraMoveToZ = camera.position.z * 0.9;
	cameraDoMoveToZ = true;
},
	false
);

// events: farther
document.addEventListener("chgfarther", (e) => {
	console.log("FARTHER");
	cameraMoveToZ = camera.position.z * 1.1;
	cameraDoMoveToZ = true;
},
	false
);

// events: stepleft
document.addEventListener("chgstepleft", (e) => {
	console.log("STEP LEFT");
	cameraMoveToX = camera.position.x - 0.3;
	cameraDoMoveToX = true;
},
	false
);

// events: stepright
document.addEventListener("chgstepright", (e) => {
	console.log("STEP RIGHT");
	cameraMoveToX = camera.position.x + 0.3;
	cameraDoMoveToX = true;
},
	false
);

// events: lookup
document.addEventListener("chglookup", (e) => {
	console.log("LOOK UP");
	cameraLookToY = controls.target.y + 0.1;
	cameraDoLookToY = true;
},
	false
);

// events: lookup
document.addEventListener("chglookdown", (e) => {
	console.log("LOOK DOWN");
	cameraLookToY = controls.target.y - 0.1;
	cameraDoLookToY = true;
},
	false
);

// events: paint
document.addEventListener("chgpaint", (e) => {
	console.log("PAINT THE WALL");
	wallMaterial++;
	if (wallMaterial >= wallMaterials.length) {
		wallMaterial = 0
	}
	walls[0].material = wallMaterials[wallMaterial]
},
	false
);

// events: floor
document.addEventListener("chgfloor", (e) => {
	console.log("CHANGE THE FLOOR");
	floorMaterial++;
	if (floorMaterial >= floorMaterials.length) {
		floorMaterial = 0
	}
	walls[1].material = floorMaterials[floorMaterial] // walls[1] == floor for now
},
	false
);

// events: light
document.addEventListener("chglight", (e) => {
	console.log("LIGHTS");

	let cnt = 0;
	for (let light of lights) {
		cnt++;
		if (lightsOn) {
			if (cnt == 33) {
				light.intensity = 0.03;
			} else {
				light.intensity = 0;
			}
		} else {
			light.intensity = light.originalIntensity;
		}
	}

	for (let wall of walls) {
		wall.visible = !wall.visible;
	}

	if (lightsOn) {
		scene.background = new THREE.Color(0x000000);
		mouseLight.visible = true;
	} else {
		scene.background = sceneOrigBgColor;
		mouseLight.visible = false;
	}


	lightsOn = !lightsOn
},
	false
);

// events: camera
document.addEventListener("chgcam", (e) => {
	console.log("CAMERA", camera);
},
	false
);

// events: rotate left
document.addEventListener("chgrotateleft", (e) => {
	console.log("ROTATE LEFT", objs);
	objs[activeLeft].rotation.y += 0.1;
},
	false
);

// events: rotate mid
document.addEventListener("chgrotatemid", (e) => {
	console.log("ROTATE MID");
	objs[activeMid].rotation.y += 0.1;
},
	false
);

// events: rotate right
document.addEventListener("chgrotateright", (e) => {
	console.log("ROTATE RIGHT");
	objs[activeRight].rotation.y += 0.1;
},
	false
);

// events: show sofa
document.addEventListener("chgshowsofa", (e) => {
	console.log("SHOW SOFA");
	objs[activeSofa].visible = !objs[activeSofa].visible;
},
	false
);






// the walls
let wallMaterials = [];
let wallMaterial = 0;

let floorMaterials = [];
let floorMaterial = 0;

//back wall
let walls = [];
{
	//const wallColor = 0xb0c0b8
	const wallColor = 0xb8b8b8

	const wallWidth = 15;
	const wallHeight = 2.6;
	const wallDepth = 0.1;
	const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);

	const imgloader = new THREE.TextureLoader();

	const material = new THREE.MeshBasicMaterial({
		color: wallColor,
		map: imgloader.load('models/images/pik-market.png'),
	});

	wallMaterials.push(material);

	const wall = new THREE.Mesh(wallGeometry, material);
	wall.position.x = 0
	wall.position.y = wallHeight / 2
	wall.position.z = -0.1

	walls.push(wall);
	scene.add(wall);

	console.log("WALL", wall);
}




// more wall materials


{
	const imgloader = new THREE.TextureLoader();
	const material = new THREE.MeshBasicMaterial({
		color: 0xb8b8b8,
		map: imgloader.load('models/images/stone2.jpg'),
	});
	wallMaterials.push(material);
}


{
	const imgloader = new THREE.TextureLoader();
	const material = new THREE.MeshBasicMaterial({
		color: 0xb8b8b8,
		map: imgloader.load('models/images/dark1.jpg'),
	});
	wallMaterials.push(material);
}

{
	const imgloader = new THREE.TextureLoader();
	const material = new THREE.MeshBasicMaterial({
		color: 0xb8b8b8,
		map: imgloader.load('models/images/brick4.jpg'),
	});
	wallMaterials.push(material);
}



//wallMaterials.push(new THREE.MeshBasicMaterial({color: 0xb0b0b0}));
//wallMaterials.push(new THREE.MeshBasicMaterial({color: 0xb0c0b8}));






//floor
{
	const wallColor = 0xa0a8b0

	const wallWidth = 15;
	const wallHeight = 0.1;
	const wallDepth = 2;
	const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);

	const imgloader = new THREE.TextureLoader();
	const material = new THREE.MeshBasicMaterial({
		color: 0xb8b8b8,
		map: imgloader.load('models/images/floor2r.jpg'), // 1, 2r, 3, 4r
	});

	floorMaterials.push(material);

	const wall = new THREE.Mesh(wallGeometry, material);
	wall.position.x = 0
	wall.position.y = 0 - wallHeight / 2;
	wall.position.z = wallDepth / 2 - 0.16;

	walls.push(wall);
	scene.add(wall);
}


// more floor materials

{
	const imgloader = new THREE.TextureLoader();
	const material = new THREE.MeshBasicMaterial({
		color: 0xb8b8b8,
		map: imgloader.load('models/images/floor1.jpg'), // 1, 2r, 3, 4r
	});
	floorMaterials.push(material);
}

{
	const imgloader = new THREE.TextureLoader();
	const material = new THREE.MeshBasicMaterial({
		color: 0xb8b8b8,
		map: imgloader.load('models/images/floor4r.jpg'), // 1, 2r, 3, 4r
	});
	floorMaterials.push(material);
}

{
	const imgloader = new THREE.TextureLoader();
	const material = new THREE.MeshBasicMaterial({
		color: 0xb8b8b8,
		map: imgloader.load('models/images/floor3.jpg'), // 1, 2r, 3, 4r
	});
	floorMaterials.push(material);
}

{
	const material = new THREE.MeshBasicMaterial({ color: 0xa0a8b0 });
	floorMaterials.push(material);
}



// movement controls
let moveByMouse = 0

function mouseclicker(evt) {
	if (moveByMouse > 0) {
		console.log("Stop moving by mouse");
		moveByMouse = 0;
	}
}


function keypresser(evt) {
	console.log("KEY", evt);
	if (evt.key == 'l' || evt.key == 'L') {
		console.log("Key (Rotate left)", moveByMouse);
		if (moveByMouse == 1) {
			moveByMouse = 0;
		} else {
			moveByMouse = 1;
		}
	}
	if (evt.key == 'm' || evt.key == 'M' || evt.key == 'c' || evt.key == 'C') {
		console.log("Key (Rotate mid)", moveByMouse);
		if (moveByMouse == 3) {
			moveByMouse = 0;
		} else {
			moveByMouse = 3;
		}
	}
	if (evt.key == 'r' || evt.key == 'R') {
		console.log("Key (Rotate right)", moveByMouse);
		if (moveByMouse == 2) {
			moveByMouse = 0;
		} else {
			moveByMouse = 2;
		}
	}
	if (evt.key == 's' || evt.key == 'S') { // `
		console.log("Key (Rotate sofa)", moveByMouse);
		if (moveByMouse == 3) {
			moveByMouse = 0;
		} else {
			moveByMouse = 3;
		}
	}
}


function mousemover(evt) {
	if (!lightsOn) {
		let xPrc = evt.clientX / window.innerWidth;
		let yPrc = evt.clientY / window.innerHeight;

		// x
		let minLightX = -4;
		let maxLightX = 4;
		let distX = maxLightX - minLightX;
		let x = minLightX + xPrc * distX;

		mouseLight.position.x = x;

		// y
		let minLightY = -1;
		let maxLightY = 4;
		let distY = maxLightY - minLightY;
		let y = maxLightY - yPrc * distY;

		mouseLight.position.y = y;
	}

	if (moveByMouse > 0) {

		let xPrc = evt.clientX / window.innerWidth;
		let minLightX = -5;
		let maxLightX = 5;
		let distX = maxLightX - minLightX;
		let x = minLightX + xPrc * distX;

		let yPrc = evt.clientY / window.innerHeight;
		let minLightY = 0;
		let maxLightY = 2;
		let distY = maxLightY - minLightY;
		let y = yPrc * distY;

		let o = activeLeft;
		if (moveByMouse == 2) {
			o = activeRight;
		}
		if (moveByMouse == 3) {
			o = activeMid;
		}
		if (moveByMouse == 4) {
			o = activeSofa;
		}
		console.log(o);
		objs[o].position.x = x; //@@@
		objs[o].position.z = y; //@@@			
	}
}
document.addEventListener('mousemove', mousemover);

document.addEventListener('click', mouseclicker);
document.addEventListener('keypress', keypresser);


