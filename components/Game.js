import * as THREE from 'three';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
import { Car } from './Car';
import { Obstacle } from './Obstacle';
import { AudioHandler } from './Audio';

export class Game {

    speedZ = 60;
    obstacles = [];
    wayWidth = 5;
    obstacleChance = 0.1;
    obstacleChanceGrowRate = 1.15;
    maxObstacleSpeedRatio = 0.01;
    carSize = 2;
    collisionGracePeriod = 2.5;
    lastCollision = false;

    constructor(scene, camera) {
        // Init variables
        // Set 3D scene
        // bind event callbacks
        this.scene = scene;
        this.audio = new AudioHandler(camera);
        this.car = new Car(this.carSize, this.audio);
        this._initScene(scene, camera);
    }

    _generateObstacles() {
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
        this.time += this.clock.getDelta();
        this._updateGrid();
        this._checkCollisions();
        this._updateHUD();
        this._generateObstacles();
        this._updateObstaclesPosition();
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
                    console.log("BOOM COLLISION");
                    this.lastCollision = this.time;
                    this.car.AnimationCrash();
                    this.audio.carCrash();
                }
            })
        }
    }

    _updateHUD() {
        // 
    }

    _gameOver() {
        this.AudioHandler.loseGame();
    }
    _gameWon() {
        this.AudioHandler.winGame();
    }

    _initScene(scene, camera) {
        this._createGrid(scene);

        const material = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('/assets/background.png'),
            color: 0xbbbccc
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
        this.grid = new THREE.GridHelper(gridLimit * 2, divisions, 0xcc22ee, 0xdd00ff);

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
          vColor = vec3(1.0, 0.0, 1.0);
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
          gl_FragColor = vec4(vColor, 1.); // r, g, b channels + alpha (transparency)
        }
      `,
            vertexColors: THREE.VertexColors
        });

        scene.add(this.grid);
        this.time = 0;
        this.clock = new THREE.Clock();
    }
}