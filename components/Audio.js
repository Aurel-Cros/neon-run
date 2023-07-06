import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	500
);

camera.position.set(3, 5, 3);
camera.lookAt(0, 0, 0);

//RENDERDER

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.innerHeight);
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// //LIGHT

// const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // no shadows
// scene.add(ambient);

// const dirLight = new THREE.DirectionalLight(0xffffff, 0.3, 50); // shadows
// dirLight.getWorldPosition.set(1, 2, -1);
// scene.add(dirLight);
// dirLight.castShadow = true;

//CUBE1

// const cube1 = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshPhongMaterial({ color: 0xff0000 })
// );

// cube1.position.set(3, 0, 0);
// cube1.castShadow = true;
// cube1.receiveShadow = true;

// // cube1 bouding box

// let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
// cube1BB.setFromObject(cube1);

// //-------------------------------------//

// const cube2 = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshPhongMaterial({ color: 0xff0000 })
// );

// cube2.position.set(-3, 0, 0);
// cube2.castShadow = true;
// cube2.receiveShadow = true;

// // cube1 bouding box

// let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
// cube2BB.setFromObject(cube1);

// //----BALL  -----//

// const ball1 = new THREE.Mesh(
//     new THREE.SphereGeometry(1),
//     new THREE.MeshPhongMaterial({ color: 0xf1493})
// );

// ball1.position.set(0, 0, 0);
// ball1.castShadow = true;
// ball1.receiveShadow = true;

// //ball bouding sphere
// let ball1BB = new THREE.Sphere(ball1.getWorldPosition, 1);
// console.log(ball1BB);

// //GROUND

// const plane1 = new THREE.Mesh(
//     new THREE.PlaneGeometry(100, 100),
//     new THREE.MeshStandardMaterial({ color: "darkgreen"})
// );

// plane1.position.set(0, -0.5, 0);
// plane1.rotateX(-Math.PI / 2);
// plane1.receiveShadow = true;

// scene.add(cube1, cube2, ball1, plane1);

// AUDIO

const listener = new THREE.AudioListener();
camera.add(listener);

const backGroundSound = new THREE.Audio(listener);

// //Load all sound files
const audioLoader2 = new THREE.AudioLoader();

audioLoader2.load(
	`Audio/robo-cop-synthwave-100bpm-117s-12714.mp3`,
	function (buffer) {
		backGroundSound.setBuffer(buffer); //set source to sound object's buffer
		backGroundSound.setLoop(true); // sound will loop when done
		backGroundSound.setVolume(0.5); // volume between 0 -1 //
		backGroundSound.play(); //start sound
	}
);

//BOUTON START
let play1 = document.getElementById("play");
function startGame() {
	let startAudio = new Audio("Audio/car-engine-start-44357.mp3");

	startAudio.play();
}
play1.addEventListener("click", startGame);

//BOUTON CRASH

let crash = document.getElementById("crash");
function crashGame() {
	let startAudio2 = new Audio("Audio/mixkit-car-explosion-debris-1562.mp3");

	startAudio2.play();
}
crash.addEventListener("click", crashGame);

//BOUTON VOITURE QUI ROULE

let roule = document.getElementById("roule");
function rouleGame() {
	let startAudio3 = new Audio(
		"Audio/VEHCar_Voiture sur route (ID 1286)_LS.mp3"
	);

	startAudio3.play();
}
roule.addEventListener("click", rouleGame);

//TOURNE

let tourne = document.getElementById("tourne");
function tourneGame() {
	let startAudio4 = new Audio("Audio/Tourne.mp3");

	startAudio4.play();
}
tourne.addEventListener("click", tourneGame);
