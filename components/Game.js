import * as THREE from 'three';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
export class Game {

    speedZ = 30;
    constructor(scene, camera) {
        // Init variables
        // Set 3D scene
        // bind event callbacks
        this._initScene(scene, camera);
        this._initListeners()
    }

    _initListeners() {
        document.addEventListener('keydown', this._keydown.bind(this));
        document.addEventListener('keyup', this._keyup.bind(this));
    }

    update() {
        this.time += this.clock.getDelta();
        this._updateGrid();
        this._checkCollisions();
        this._updateHUD();
    }

    _updateGrid() {
        // Move grid to simulate movement
        this.grid.material.uniforms.time.value = this.time;
    }
    _checkCollisions() {
        // Check if player hit an obstacle / a bonus...
    }
    _updateHUD() {
        // 
    }

    _keydown(event) {
        // Move car
    }
    _keyup() {
        // Stop moving car
    }

    _gameOver() {

    }
    _gameWon() {

    }

    _initScene(scene, camera) {
        this._createCar();
        this._createGrid(scene);
        this._createSunLight(scene);

        scene.add(this.car);
        this.car.position.y = 1;
        camera.rotateX(-5 * Math.PI / 180);
        camera.position.set(0, 4, 6);
    }
    _createSunLight(scene) {
        const directionalLight = new THREE.DirectionalLight(0xffbb55, 0.5);
        scene.add(directionalLight);
    }
    _createGrid(scene) {

        let divisions = 30;
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
    _createCar() {
        const texture = new THREE.TextureLoader().load("/assets/car/car_left.png");
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(3, 3);
        const carBody = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 3, 2),
            new THREE.MeshBasicMaterial({ color: 0x049ef4, transparent: true, opacity: 0 })
        );

        carBody.rotateX(90 * Math.PI / 180);
        carBody.rotateY(90 * Math.PI / 180);
        carBody.position.y = 0;
        carBody.position.z = 0;

        this.car = new THREE.Group();
        this.car.add(carBody, sprite);
    }
}