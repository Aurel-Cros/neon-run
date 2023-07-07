import * as THREE from "three";

export class AudioHandler {

	constructor(camera) {

		const listener = new THREE.AudioListener();
		this.backGroundSound = new THREE.Audio(listener);
		this.engineSound = new THREE.Audio(listener);
		this.audioLoader = new THREE.AudioLoader();

		camera.add(listener);

		this._initBackgroundMusic();
		this._initCarRunning();
	}

	_initBackgroundMusic() {
		this.audioLoader.load(
			`../assets/audio/background-music.mp3`,
			(buffer) => {
				this.backGroundSound.setBuffer(buffer); //set source to sound object's buffer
				this.backGroundSound.setLoop(true); // sound will loop when done
				this.backGroundSound.setVolume(0.3); // volume between 0 -1 //
				this.backGroundSound.play(); //start sound
			}
		);
	}

	// START
	startGame() {
		const startAudio = new Audio("../assets/audio/car-engine-start.mp3");
		startAudio.volume = 1;
		startAudio.play();
	}

	// CRASH
	carCrash() {
		const crashAudio = new Audio("../assets/audio/car-crash.mp3");
		crashAudio.volume = 0.25;
		crashAudio.play();
	}

	// CAR RUNNING

	_initCarRunning() {
		this.audioLoader.load(
			`/assets/audio/car-running.mp3`,
			(buffer) => {
				this.engineSound.setBuffer(buffer); //set source to sound object's buffer
				this.engineSound.setLoop(true); // sound will loop when done
				this.engineSound.setVolume(0.5); // volume between 0 -1 //
				this.engineSound.play(); //start sound
			}
		);

	}

	// CAR TURNING

	carTurn() {
		const turnAudio = new Audio("../assets/audio/car-turn.mp3");
		turnAudio.volume = 0.25;
		turnAudio.play();
	}


	// WIN GAME

	winGame() {
		const winAudio = new Audio("../assets/audio/Win-Sound.mp3");
		winAudio.volume = 1;
		winAudio.play();
	}

	//GAMEOVER

	loseGame() {
		const loseAudio = new Audio("../assets/audio/game-over.mp3");
		loseAudio.volume = 1;
		loseAudio.play();
		this.engineSound.stop();
		this.backGroundSound.stop();
	}
}