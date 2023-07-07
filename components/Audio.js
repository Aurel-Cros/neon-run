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

	// CAR RUNNING

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
	
	}

	// CAR TURNING

	tourneGame() {
		const startAudio = new Audio("/assets/audio/car-turn.mp3");
		startAudio.play();
	}


	// WIN GAME

	winGame() {
		const startAudio = new Audio("assets/audio/Win-Sound.mp3");
		startAudio.play();
	}

	//GAMEOVER

	gameOver() {
		const startAudio = new Audio("assets/audio/game-over.mp3");
		startAudio.play();
	}
}