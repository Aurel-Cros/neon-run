import * as THREE from 'three';
import { Car } from './Car';
import { Obstacle } from './Obstacle';
import { AudioHandler } from './Audio';
import { HUD } from './HUD';

export class Game {
    // General flow values
    speedZ = 60;
    carSize = 2;
    wayWidth = 5;

    // Gaming values
    gameWon = false;
    running = true;
    healthPts = 3;
    timeToWin = 180; // Time in seconds

    // Obstacle values
    obstacles = [];
    obstacleChance = 0.1;
    obstacleChanceGrowRate = 1.15;
    maxObstacleSpeedRatio = 0.01;
    collisionGracePeriod = 2.5;
    lastCollision = false;

    constructor(scene, camera, gameWrapper) {
        // Init variables
        // Set 3D scene
        // bind event callbacks
        this.scene = scene;
        this.camera = camera;
        this.wrapper = gameWrapper;
        this.audio = new AudioHandler(camera);
        this.car = new Car(this.carSize, this.audio);
        this._initScene(scene, camera);
        this.HUD = new HUD(this.healthPts);

        this.audio.startGame();
    }

    _generateObstacles() {
        if (this.gameWon)
            return;
        const doesGenerate = Math.random() < this.obstacleChance;
        if (doesGenerate) {
            this.obstacleChance = 0.0001;
            this._createObstacle();
        }
        else {
            this.obstacleChance *= this.obstacleChanceGrowRate;
        }
    }

    _createObstacle() {
        const obstacleInstance = new Obstacle(this.wayWidth, this.speedZ, this.maxObstacleSpeedRatio);
        this.obstacles.push(obstacleInstance);

        this.scene.add(obstacleInstance)
    }

    _updateObstaclesPosition() {
        this.obstacles.forEach(obstacle => {
            obstacle.updatePosition();
        })
    }

    update() {
        if (this.running) {
            const tick = (this.clock.getDelta() * Math.min((this.time * 3.33), 1))
            this.time += tick || 0.0001;
            this._updateGrid();
            this._checkCollisions();
            this._generateObstacles();
            this._updateObstaclesPosition();
            this._checkWin();
        }
    }

    _updateGrid() {
        // Move grid to simulate movement
        this.grid.material.uniforms.time.value = this.time;
    }

    _checkCollisions() {
        if (this.lastCollision === false ||
            this.time - this.lastCollision > this.collisionGracePeriod) {
            const width = this.carSize;
            // Check if player hit an obstacle / a bonus...
            this.obstacles.forEach(obstacle => {
                if (
                    Math.abs(obstacle.position.x - this.car.body.position.x) < width &&
                    Math.abs(obstacle.position.z - this.car.body.position.z) < width
                ) {
                    // COLLISION
                    this._onCollision(obstacle);
                }
            })
        }
    }
    _onCollision(obstacle) {
        console.log("BOOM COLLISION");
        obstacle.removeFromParent();
        this.healthPts -= 1;
        this.HUD.loseLife();
        if (this.healthPts) {
            this.lastCollision = this.time;
            this.car.AnimationCrash();
            this.audio.carCrash();
        }
        else
            this._gameLost();
    }

    _checkWin() {
        if (this.time >= this.timeToWin && !this.gameWon) {
            this._gameWon();
        }
    }

    _gameLost() {
        this.running = false;
        console.log("You loooose !");
        this.audio.loseGame();
        this.HUD.timeStop();
        this.car.AnimationGameOver();
        setTimeout(() => { this._fadeOutCamera() }, 2000);
        setTimeout(() => { this._deleteInstance() }, 7000);
    }
    _gameWon() {
        this.gameWon = true;
        console.log("You win !");
        this.audio.winGame();
        this.obstacles.forEach(obstacle => {
            obstacle.removeFromParent();
        })
        this.obstacles = [];
        this.HUD.timeStop();
        this._panCameraAway();
        this._fadeOutCamera();
        setTimeout(() => { this._deleteInstance() }, 5000);
    }
    _fadeOutCamera() {
        this.wrapper.style.opacity = 0;
    }

    _panCameraAway() {
        this.car.body.position.z -= 0.01
        const startTime = this.time;
        const awayInterval = setInterval(() => {
            this.car.body.position.z *= 1.05;
            console.log(this.time, startTime, this.time > (startTime + 5));
            if (this.time > (startTime + 5))
                clearInterval(awayInterval);
        }, 0.1)
    }
    _deleteInstance() {
        this.wrapper.replaceChildren();
        this.stop = true;
    }

    _initScene(scene, camera) {
        this._createGrid(scene);

        const material = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('/assets/background.png'),
            color: 0xffffff
        });
        const backgroundSprite = new THREE.Sprite(material);
        backgroundSprite.scale.set(500, 281);
        backgroundSprite.position.z = -150;
        backgroundSprite.position.y = 0;

        scene.add(backgroundSprite);

        scene.add(this.car.body);
        this.car.body.position.y = 1;
        camera.rotateX(-5 * Math.PI / 180);
        camera.position.set(0, 4, 6);
    }

    _createGrid(scene) {

        let divisions = 90;
        let gridLimit = 200;
        this.grid = new THREE.GridHelper(gridLimit * 2, divisions);

        const moveableZ = [];
        for (let i = 0; i <= divisions; i++) {
            moveableZ.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
        }
        this.grid.geometry.setAttribute('moveableZ', new THREE.BufferAttribute(new Uint8Array(moveableZ), 1));

        this.grid.material = new THREE.ShaderMaterial({
            uniforms: {
                speedZ: {
                    value: this.speedZ
                },
                gridLimits: {
                    value: new THREE.Vector2(-gridLimit, gridLimit)
                },
                time: {
                    value: 0
                }
            },
            vertexShader: `
        uniform float time;
        uniform vec2 gridLimits;
        uniform float speedZ;
        
        attribute float moveableZ;
        
        varying vec3 vColor;
      
        void main() {
          vColor = vec3(0.5, 0.0, 0.5);
          float limLen = gridLimits.y - gridLimits.x;
          vec3 pos = position;
          if (floor(moveableZ + 0.5) > 0.5) { // if a point has "moveableZ" attribute = 1 
            float zDist = speedZ * time;
            float curZPos = mod((pos.z + zDist) - gridLimits.x, limLen) + gridLimits.x;
            pos.z = curZPos;
          }
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
      
        void main() {
          gl_FragColor = vec4(vColor, 0); // r, g, b channels + alpha (transparency)
        }
      `,
            vertexColors: THREE.VertexColors
        });

        scene.add(this.grid);

        const geometry = new THREE.PlaneGeometry(500, 250);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.y = -1;
        plane.position.z = -20;
        plane.rotateX(80.11);
        scene.add(plane);

        this.time = 0;
        this.clock = new THREE.Clock();
    }
}