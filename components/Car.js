import * as THREE from "three";

export class Car {
	// Flag permet de limiter l'animation de virage et de ne pas la bourriner
	isTurning = false;
	animationSpeed = 125;

	constructor(carSize, audioHandler) {
		this.audioHandler = audioHandler;

		this._loadTextures();
		this._createCar(carSize);
		this._initIdleAnimation();
		this._initListeners();
	}
	_clearIdle() {
		clearInterval(this.currentIdle);
	}
	_loadTextures() {
		this.textures = {
			front1: new THREE.TextureLoader().load("/assets/car/car_front1.png"),
			front2: new THREE.TextureLoader().load("/assets/car/car_front2.png"),

			left1: new THREE.TextureLoader().load("/assets/car/car_left1.png"),
			left2: new THREE.TextureLoader().load("/assets/car/car_left2.png"),
			left3: new THREE.TextureLoader().load("/assets/car/car_left3.png"),
			left4: new THREE.TextureLoader().load("/assets/car/car_left4.png"),
			left5: new THREE.TextureLoader().load("/assets/car/car_left5.png"),
			left6: new THREE.TextureLoader().load("/assets/car/car_left6.png"),

			right1: new THREE.TextureLoader().load("/assets/car/car_right1.png"),
			right2: new THREE.TextureLoader().load("/assets/car/car_right2.png"),
			right3: new THREE.TextureLoader().load("/assets/car/car_right3.png"),
			right4: new THREE.TextureLoader().load("/assets/car/car_right4.png"),
			right5: new THREE.TextureLoader().load("/assets/car/car_right5.png"),
			right6: new THREE.TextureLoader().load("/assets/car/car_right6.png"),

			crash1: new THREE.TextureLoader().load("/assets/car/Crash1.png"),
			crash2: new THREE.TextureLoader().load("/assets/car/Crash2.png"),
			crash3: new THREE.TextureLoader().load("/assets/car/Crash3.png"),
			crash4: new THREE.TextureLoader().load("/assets/car/Crash4.png"),
			crash5: new THREE.TextureLoader().load("/assets/car/Crash5.png"),
			crash6: new THREE.TextureLoader().load("/assets/car/Crash6.png"),
			crash7: new THREE.TextureLoader().load("/assets/car/Crash7.png"),
			crash8: new THREE.TextureLoader().load("/assets/car/Crash8.png"),
			crash9: new THREE.TextureLoader().load("/assets/car/Crash9.png"),
			crash10: new THREE.TextureLoader().load("/assets/car/Crash10.png"),

			gameOver: new THREE.TextureLoader().load("/assets/car/GameOver.png"),
			gameOver1: new THREE.TextureLoader().load("/assets/car/GameOver1.png"),
			gameOver3: new THREE.TextureLoader().load("/assets/car/GameOver3.png"),
			gameOver4: new THREE.TextureLoader().load("/assets/car/GameOver4.png"),
			gameOver5: new THREE.TextureLoader().load("/assets/car/GameOver5.png"),
			gameOver6: new THREE.TextureLoader().load("/assets/car/GameOver6.png"),
			gameOver7: new THREE.TextureLoader().load("/assets/car/GameOver7.png"),
			gameOver8: new THREE.TextureLoader().load("/assets/car/GameOver8.png"),
			gameOver9: new THREE.TextureLoader().load("/assets/car/GameOver9.png"),
			gameOver10: new THREE.TextureLoader().load("/assets/car/GameOver10.png"),
			gameOver11: new THREE.TextureLoader().load("/assets/car/GameOver11.png"),
			gameOver12: new THREE.TextureLoader().load("/assets/car/GameOver12.png"),
			gameOver13: new THREE.TextureLoader().load("/assets/car/GameOver13.png"),
			gameOver14: new THREE.TextureLoader().load("/assets/car/GameOver14.png"),
			gameOver15: new THREE.TextureLoader().load("/assets/car/GameOver15.png"),
			gameOver16: new THREE.TextureLoader().load("/assets/car/GameOver16.png"),

		};
	}

	_initIdleAnimation() {
		this._clearIdle();
		const idleFrames = [];
		setInterval(() => {
			if (this.body.position.x > 3) {
				idleFrames.push(this.textures.right5, this.textures.right6)
			}
			else if (this.body.position.x < -3) {
				idleFrames.push(this.textures.left5, this.textures.left6)
			}
			else {
				idleFrames.push(this.textures.front1, this.textures.front2)
			}
		}, 250);

		let currentIdleFrame = 0;
		this.currentIdle = setInterval(() => {
			this.sprite.material.map = idleFrames[currentIdleFrame];
			currentIdleFrame = (currentIdleFrame + 1) % 2;
		}, this.animationSpeed / 4);
	}

	AnimationGameOver() {
		//  animation déclanché par l'événement gameover

		this._clearIdle();
		this.isGameOver = true;

		// Animation lors d'un game over, game over quand point de vie tombe à 0

		const animationFrames = [
			this.textures.gameOver,
			this.textures.gameOver1,
			this.textures.gameOver3,
			this.textures.gameOver4,
			this.textures.gameOver5,
			this.textures.gameOver6,
			this.textures.gameOver7,
			this.textures.gameOver8,
			this.textures.gameOver9,
			this.textures.gameOver10,
			this.textures.gameOver11,
			this.textures.gameOver12,
			this.textures.gameOver13,
			this.textures.gameOver14,
			this.textures.gameOver15,
			this.textures.gameOver16,
			this.textures.gameOver,
		];

		let frameIndex = 0;

		const gameOverInterval = setInterval(() => {
			this.sprite.material.map = animationFrames[frameIndex];
			frameIndex += 1;
			if (frameIndex >= animationFrames.length) {
				clearInterval(gameOverInterval);
				this._clearIdle();
				this.isCrashing = false;
				return;
			}
		},
			this.animationSpeed
		);
	}

	AnimationCrash() {
		this._clearIdle();
		this.isCrashing = true;
		// animation lors d'une collision 
		const animationFrames = [
			this.textures.crash1,
			this.textures.crash2,
			this.textures.crash3,
			this.textures.crash4,
			this.textures.crash5,
			this.textures.crash6,
			this.textures.crash7,
			this.textures.crash8,
			this.textures.crash9,
			this.textures.crash10
		];

		let frameIndex = 0;

		const crashInterval = setInterval(() => {
			this.sprite.material.map = animationFrames[frameIndex];
			frameIndex += 1;
			if (frameIndex >= animationFrames.length) {
				clearInterval(crashInterval);
				this._initIdleAnimation();
				this.isCrashing = false;
				return;
			}
		},
			this.animationSpeed
		);
	}

	_AnimateCenterToLeft() {
		const animationFrames = [
			this.textures.left1,
			this.textures.left2,
			this.textures.left3,
			this.textures.left4,
			this.textures.left5,
			this.textures.left6,
		];

		let frameIndex = 0;

		const turnInterval = setInterval(() => {
			this.sprite.material.map = animationFrames[frameIndex];
			frameIndex += 1;
			if (frameIndex >= animationFrames.length) {
				clearInterval(turnInterval);
				this._initIdleAnimation();
				return;
			}
		}, this.animationSpeed / animationFrames.length);
	}

	_AnimateCenterToRight() {
		const animationFrames = [
			this.textures.right1,
			this.textures.right2,
			this.textures.right3,
			this.textures.right4,
			this.textures.right5,
			this.textures.right6,
		];

		let frameIndex = 0;

		const turnInterval = setInterval(() => {
			this.sprite.material.map = animationFrames[frameIndex];
			frameIndex += 1;
			if (frameIndex >= animationFrames.length) {
				clearInterval(turnInterval);
				this._initIdleAnimation();
				return;
			}
		}, this.animationSpeed / animationFrames.length);
	}

	_AnimateRightToCenter() {
		const animationFrames = [
			this.textures.right5,
			this.textures.right4,
			this.textures.right3,
			this.textures.right2,
			this.textures.right1,
		];

		let frameIndex = 0;

		const turnInterval = setInterval(() => {
			this.sprite.material.map = animationFrames[frameIndex];
			frameIndex += 1;
			if (frameIndex >= animationFrames.length) {
				clearInterval(turnInterval);
				this._initIdleAnimation();
				return;
			}
		}, this.animationSpeed / animationFrames.length);
	}

	_AnimateLeftToCenter() {
		const animationFrames = [
			this.textures.left5,
			this.textures.left4,
			this.textures.left3,
			this.textures.left2,
			this.textures.left1,
		];

		let frameIndex = 0;
		const frameTime = this.animationSpeed / animationFrames.length;
		const turnInterval = setInterval(() => {
			this.sprite.material.map = animationFrames[frameIndex];
			frameIndex += 1;
			if (frameIndex >= animationFrames.length) {
				clearInterval(turnInterval);
				this._initIdleAnimation();
				return;
			}
		}, frameTime);
	}

	_initListeners() {
		document.addEventListener("keydown", (event) => {
			if (this.isTurning || this.isGameOver) return;

			if (event.code === "ArrowLeft") {
				if (this.body.position.x > -1) {
					this.isTurning = true;
					this._animationTurn(-1);
					this.audioHandler.carTurn();
					if (this.isCrashing)
						return

					if (this.body.position.x > 1) {
						this._AnimateRightToCenter();
					} else {
						this._AnimateCenterToLeft();
					}
				}
			} else if (event.code === "ArrowRight") {
				if (this.body.position.x < 1) {
					this.isTurning = true;
					this._animationTurn(1);
					this.audioHandler.carTurn();

					if (this.isCrashing)
						return

					if (this.body.position.x < -1) {
						this._AnimateLeftToCenter();
					} else {
						this._AnimateCenterToRight();
					}
				}
			}
		});
	}

	_createCar(carSize) {
		const texture = this.textures.front1;
		const material = new THREE.SpriteMaterial({ map: texture });
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(3, 3);
		const carBody = new THREE.Mesh(
			new THREE.BoxGeometry(carSize, 0.5, carSize),
			new THREE.MeshBasicMaterial({
				color: 0x049ef4,
				transparent: true,
				opacity: 0,
			})
		);

		carBody.position.y = 0;
		carBody.position.z = 0;
		// body correspond a la voiture
		this.body = new THREE.Group();
		this.body.add(carBody, sprite);
		this.mesh = carBody;
		this.sprite = sprite;
	}
	freeMemory() {
		this.sprite.material.map.dispose();
		this.sprite.material.dispose();
		this.mesh.material.dispose();
		this.mesh.geometry.dispose();

		for (const texture in this.textures) {
			this.textures[texture].dispose();
		}
	}
	_animationTurn(facteurDirection) {
		this._clearIdle();
		//Reccupère la position de la voiture, et en fonction de sa postion déclanche le changement de sprite centre -> gauche
		const dureeAnimation = this.animationSpeed;
		const dureeEtape = 10;
		let compteur = 0;
		const interval = setInterval(() => {
			if (compteur >= dureeAnimation) {
				this.isTurning = false;
				clearInterval(interval);
				return;
			}
			compteur += dureeEtape;
			this.body.position.x += (5 / (dureeAnimation / dureeEtape)) * facteurDirection;
		}, dureeEtape);
	}
}
