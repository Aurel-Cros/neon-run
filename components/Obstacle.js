import * as THREE from 'three';

export class Obstacle {
    constructor(wayWidth, speedZ, obstacleSpeedRatio) {
        this.speedZ = speedZ;
        this.movementSpeed = Math.random() * obstacleSpeedRatio + obstacleSpeedRatio; // The ratio serves both as max value and min value

        this._loadSprites();
        this._createObstacle(wayWidth);

        return this.bundle;
    }
    _loadSprites() {
        this.sprites = {
            left1: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left1.png"),
            left2: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left2.png"),
            left3: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left3.png"),
            left4: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left4.png"),
            left5: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left5.png"),
            left6: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left6.png"),
            left7: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_left7.png"),

            right1: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right1.png"),
            right2: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right2.png"),
            right3: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right3.png"),
            right4: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right4.png"),
            right5: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right5.png"),
            right6: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right6.png"),
            right7: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_right7.png"),

            center1: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front1.png"),
            center2: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front2.png"),
            center3: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front3.png"),
            center4: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front4.png"),
            center5: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front5.png"),
            center6: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front6.png"),
            center7: new THREE.TextureLoader().load("/assets/Obstacle/obstacle_front7.png"),
        }
    }

    _createObstacle(wayWidth) {
        const material = new THREE.SpriteMaterial();
        const sprite = new THREE.Sprite(material);
        const randomId = this._selectRandom();
        sprite.material.map = this.sprites[randomId.id];
        sprite.scale.set(3, 3);

        const hitBox = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xaa5566,
                transparent: true,
                opacity: 0,
            })
        );

        this.bundle = new THREE.Group();


        this.bundle.updatePosition = () => {
            this.bundle.position.z += this.speedZ * this.movementSpeed
        }
        this.bundle.position.x = (randomId.way == 'left' ? -1 : (randomId.way == 'center' ? 0 : 1)) * (wayWidth * 1.2);
        this.bundle.position.y = 1;
        this.bundle.position.z = -200;

        this.bundle.add(hitBox, sprite);
    }

    _selectRandom() {
        const randomWayNumber = (Math.ceil(Math.random() * 3) || 1) - 1;
        const randomWay = randomWayNumber == 2 ? 'right' : (randomWayNumber == 1 ? 'center' : 'left');
        const randomObstNumber = Math.round(Math.random() * (Object.keys(this.sprites).length / 3)) || 1;
        const randomObst = randomWay + randomObstNumber;
        return { id: randomObst, way: randomWay };
    }
}