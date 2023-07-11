import * as THREE from 'three';
import { Car } from './Car';
import { Obstacle } from './Obstacle';
import { AudioHandler } from './Audio';
import { HUD } from './HUD';
import { GameOver } from './GameOver';
import { Trees, Rails } from './Decor';
import { Credits } from './credits';

export class Game {
    // General flow values
    speedZ = 60;
    speedRatio = 1.35;
    carSize = 2;
    wayWidth = 5;

    // Gaming values
    gameWon = false;
    running = true;
    healthPts = 3;
    timeToWin = 100; // Time in seconds

    // Obstacle values
    obstacles = [];
    obstacleChance = 0.2;
    obstacleChanceGrowRate = 1.15;
    maxObstacleSpeedRatio = 0.01;
    collisionGracePeriod = 1.5;
    lastCollision = false;

    constructor(scene, camera, gameWrapper) {
        this.scene = scene;
        this.decor = {};
        this.audio = new AudioHandler(camera);
        this.car = new Car(this.carSize, this.audio);
        this._initScene(scene, camera);

        this.camera = camera;
        this.wrapper = gameWrapper;
        this.HUD = new HUD(this.healthPts);

        this.audio.startGame();
    }

    _generateObstacles() {
        if (this.gameWon)
            return;
        const doesGenerate = Math.random() < (this.obstacleChance * (1 + this.time / 90));
        if (doesGenerate) {
            this.obstacleChance = 0.0001;
            this._createObstacle();
        }
        else {
            this.obstacleChance *= this.obstacleChanceGrowRate;
        }
    }

    _createObstacle() {
        const obstacleInstance = new Obstacle(this.wayWidth, this.speedZ, (this.time / 10000) + this.maxObstacleSpeedRatio);
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
            this._updateBackground();
            this._checkCollisions();
            this._generateObstacles();
            this._updateObstaclesPosition();
            this._checkWin();
        }
    }

    _updateGrid() {
        // Move grid to simulate movement
        this.grid.material.uniforms.time.value = this.time * this.speedRatio;
        this.decor.rails.moveDecor(this.time);
        this.decor.trees.moveDecor(this.time);
    }

    _updateBackground() {
        this.backgroundSprite.position.y += (this.time / 2000);
    }

    _checkCollisions() {
        if (this.gameWon !== true &&
            (this.lastCollision === false ||
                this.time - this.lastCollision > this.collisionGracePeriod)) {
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
        this.audio.loseGame();
        this.HUD.timeStop();
        this.car.AnimationGameOver();
        setTimeout(() => { this._fadeOutCamera() }, 2000);
        setTimeout(() => { this._deleteInstance() }, 7000);
    }
    _gameWon() {
        this.gameWon = true;
        this.audio.winGame();
        this.obstacles.forEach(obstacle => {
            obstacle.removeFromParent();
        })
        this._panCameraAway();
        this._fadeOutCamera();
        setTimeout(() => {
            this.HUD.timeStop();
            this._deleteInstance();
        }, 5000);
    }

    _fadeOutCamera() {
        this.wrapper.style.opacity = 0;
    }

    _panCameraAway() {
        this.car.body.position.z -= 0.01
        const startTime = this.time;
        const awayInterval = setInterval(() => {
            this.car.body.position.z *= 1.05;
            if (this.time > (startTime + 5))
                clearInterval(awayInterval);
        }, 0.1)
    }

    _freeMemoryAll() {
        this.car.freeMemory();
        for (const decor in this.decor) {
            this.decor[decor].freeMemory();
        }
        this.obstacles.forEach(obstacle => {
            obstacle.freeMemory();
        })
        this.plane.material.dispose();
        this.plane.geometry.dispose();
        this.grid.material.dispose();
        this.grid.geometry.dispose();
        this.backgroundSprite.material.map.dispose();
        this.backgroundSprite.material.dispose();
        this.backgroundSprite.geometry.dispose();
    }
    _deleteInstance() {
        this._freeMemoryAll();
        this.wrapper.replaceChildren();
        this.stop = true;
        if (this.gameWon) {
            // Display win screen
            new Credits();
        }
        else {
            // Display lose screen
            new GameOver();
        }
    }

    _initScene(scene, camera) {
        this._createGrid(scene);
        this._createDecor(scene);

        const material = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('../assets/background.png'),
            color: 0xffffff
        });
        this.backgroundSprite = new THREE.Sprite(material);
        this.backgroundSprite.scale.set(500, 281);
        this.backgroundSprite.position.z = -150;
        this.backgroundSprite.position.y = -30;
        scene.add(this.backgroundSprite);


        scene.add(this.car.body);
        this.car.body.position.y = 1;
        camera.rotateX(-5 * Math.PI / 180);
        camera.position.set(0, 4, 6);
    }

    _createDecor(scene) {
        this.decor.rails = new Rails(scene);
        this.decor.trees = new Trees(scene);
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
        this.plane = new THREE.Mesh(geometry, material);
        this.plane.position.y = -0.1;
        this.plane.rotateX(Math.PI / 180 * 90);
        scene.add(this.plane);

        this.time = 0;
        this.clock = new THREE.Clock();
    }
}