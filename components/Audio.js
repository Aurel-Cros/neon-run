import * as THREE from "three";

export class AudioHandler {

	constructor(camera) {

		const listener = new THREE.AudioListener();
		this.backGroundSound = new THREE.Audio(listener);
		this.audioLoader = new THREE.AudioLoader();

		camera.add(listener);

		this._initBackgroundMusic();
	}

	_initBackgroundMusic() {
		this.audioLoader.load(
			`/assets/audio/background-music.mp3`,
			function (buffer) {
				backGroundSound.setBuffer(buffer); //set source to sound object's buffer
				backGroundSound.setLoop(true); // sound will loop when done
				backGroundSound.setVolume(0.5); // volume between 0 -1 //
				backGroundSound.play(); //start sound
			}
		);
	}

	// START
	startGame() {
		const startAudio = new Audio("/assets/audio/car-engine-start.mp3");
		startAudio.play();
	}

	// CRASH
	crashGame() {
		const startAudio = new Audio("/assets/audio/car-crash.mp3");
		startAudio.play();
	}

	//BOUTON VOITURE QUI ROULE

	rouleGame() {
		this.audioLoader.load(
			`/assets/audio/car-running.mp3`,
			function (buffer) {
				backGroundSound.setBuffer(buffer); //set source to sound object's buffer
				backGroundSound.setLoop(true); // sound will loop when done
				backGroundSound.setVolume(0.5); // volume between 0 -1 //
				backGroundSound.play(); //start sound
			}
		);
		// let startAudio3 = new Audio(
		// 	"Audio/VEHCar_Voiture sur route (ID 1286)_LS.mp3"
		// );
		// startAudio3.play();
	}

	//TOURNE

	tourneGame() {
		let startAudio = new Audio("/assets/audio/car-turn.mp3");
		startAudio.play();
	}
}