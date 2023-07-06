import * as THREE from 'three';

export class Obstacle {
    constructor() {
        this._loadSprites();
        this._createObstacle();
    }
    _loadSprites() {
        this.sprites = {
            left1: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left1.png"),
            left2: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left2.png"),
            left3: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left3.png"),
            left4: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left4.png"),
            left5: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left5.png"),
            left6: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left6.png"),

            right1: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right1.png"),
            right2: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right2.png"),
            right3: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right3.png"),
            right4: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right4.png"),
            right5: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right5.png"),
            right6: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right6.png"),

            center1: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front1.png")
        }
    }

    _createObstacle() {
        const material = new THREE.SpriteMaterial({ map: this.sprites[this._selectRandom()] });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(3, 3);

        const hitBox = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xaa5566,
                transparent: true,
                opacity: 0.5,
            })
        );

        hitBox.rotateX((90 * Math.PI) / 180);
        hitBox.rotateY((90 * Math.PI) / 180);

        this.bundle = new THREE.Group();
        this.bundle.add(hitBox, sprite);
    }

    _selectRandom() {
        const randomWayNumber = Math.round(Math.random() * 2);
        const randomWay = randomWayNumber == 2 ? 'right' : (randomWayNumber == 1 ? 'center' : 'left');
        const randomObstNumber = Math.round(Math.random() * 6);

        const randomObst = randomWay + randomObstNumber;
        return randomObst;
    }
}