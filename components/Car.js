import * as THREE from "three";

export class Car {
	// Flag permet de limiter l'animation de virage et de ne pas la bourriner
	isTurning = false;

	constructor(carSize) {
		//Méthod appellé à l'instenciation
		this._createCar(carSize);
		this._initListeners();
	}

	_initListeners() {
		document.addEventListener("keydown", (event) => {
			if (this.isTurning) return;

			if (event.code === "ArrowLeft") {
				if (this.body.position.x > -1) {
					this.isTurning = true;
					this._animationTurn(-1);
				}
			} else if (event.code === "ArrowRight") {
				if (this.body.position.x < 1) {
					this.isTurning = true;
					this._animationTurn(1);
				}
			}
		});
	}

	_createCar(carSize) {
		const texture = new THREE.TextureLoader().load(
			"/assets/car/car_left.png"
		);
		const material = new THREE.SpriteMaterial({ map: texture });
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(3, 3);
		const carBody = new THREE.Mesh(
			new THREE.BoxGeometry(carSize, 0.5, carSize),
			new THREE.MeshBasicMaterial({
				color: 0x049ef4,
				transparent: true,
				opacity: 0.5,
			})
		);

		carBody.position.y = 0;
		carBody.position.z = 0;
		// body correspond a la voiture
		this.body = new THREE.Group();
		this.body.add(carBody, sprite);
	}

	_turnLeftAndRight() {
		// Vérification possibilité tourner à gauche et si possible tourne gauche
	}

	_animationTurn(facteurDirection) {
		//Reccupère la position de la voiture, et en fonction de sa postion déclanche le changement de sprite centre -> gauche
		const dureeAnimation = 125;
		const dureeEtape = 10;
		let comteur = 0;
		const interval = setInterval(() => {
			if (comteur >= dureeAnimation) {
				this.isTurning = false;
				clearInterval(interval);
				//spriteLeft
				return;
			}
			comteur += dureeEtape;
			this.body.position.x +=
				(5 / (dureeAnimation / dureeEtape)) * facteurDirection;
		}, dureeEtape);
	}
}
