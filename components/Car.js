import * as THREE from "three";

export class Car {
	// Flag permet de limiter l'animation de virage et de ne pas la bourriner
	isTurning = false;
	animationSpeed = 125;

	constructor(carSize) {
		//Méthod appellé à l'instenciation
		this._loadTextures();
		this._createCar(carSize);
		this._initIdleAnimation();
		this._initListeners();
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
		};
	}

	_initIdleAnimation() {
		clearInterval(this.currentLeftIdle);
		clearInterval(this.currentRightIdle);
		this.currentIdleFrame = 1;
		this.currentIdle = setInterval(() => {
			if (this.currentIdleFrame == 1) {
				this.sprite.material.map = this.textures.front1;
				this.currentIdleFrame = 2;
			} else {
				this.sprite.material.map = this.textures.front2;
				this.currentIdleFrame = 1;
			}
		}, this.animationSpeed);
	}

	_initIdleLeftAnimation() {
		this.currentLeftIdleFrame = 1;
		this.currentLeftIdle = setInterval(() => {
			if (this.currentLeftIdleFrame == 1) {
				this.sprite.material.map = this.textures.left5;
				this.currentLeftIdleFrame = 2;
			} else {
				this.sprite.material.map = this.textures.left6;
				this.currentLeftIdleFrame = 1;
			}
		}, this.animationSpeed);
	}

	_initIdleRightAnimation() {
		this.currentRightIdleFrame = 1;
		this.currentRightIdle = setInterval(() => {
			if (this.currentRightIdleFrame == 1) {
				this.sprite.material.map = this.textures.right5;
				this.currentRightIdleFrame = 2;
			} else {
				this.sprite.material.map = this.textures.right6;
				this.currentRightIdleFrame = 1;
			}
		}, this.animationSpeed);
	}


	AnimationCrash() {
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
				return;
			}
		},
			this.animationSpeed / animationFrames.length * 10
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
				this._initIdleAnimation(turnInterval);
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

	_initListeners() {
		document.addEventListener("keydown", (event) => {
			if (this.isTurning) return;

			if (event.code === "ArrowLeft") {
				if (this.body.position.x > -1) {
					clearInterval(this.currentIdle);
					this.isTurning = true;
					this._animationTurn(-1);

					if (this.body.position.x > 1) {
						this._AnimateRightToCenter();
					} else {
						this._AnimateCenterToLeft();

						this._initIdleLeftAnimation();
					}
				}
			} else if (event.code === "ArrowRight") {
				if (this.body.position.x < 1) {
					clearInterval(this.currentIdle);
					this.isTurning = true;
					this._animationTurn(1);

					if (this.body.position.x < -1) {
						this._AnimateLeftToCenter();
					} else {
						this._AnimateCenterToRight();

						this._initIdleRightAnimation();
					}
				}
			}
		});
	}

	_createCar(carSize) {
		const texture = new THREE.TextureLoader().load(
			"/assets/car/car_front1.png"
		);
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
		this.sprite = sprite;
	}

	_animationTurn(facteurDirection) {
		//Reccupère la position de la voiture, et en fonction de sa postion déclanche le changement de sprite centre -> gauche
		const dureeAnimation = this.animationSpeed + 25;
		const dureeEtape = 10;
		let compteur = 0;
		const interval = setInterval(() => {
			if (compteur >= dureeAnimation) {
				this.isTurning = false;
				clearInterval(interval);
				return;
			}
			compteur += dureeEtape;
			this.body.position.x +=
				(5 / (dureeAnimation / dureeEtape)) * facteurDirection;
		}, dureeEtape);
	}
}
