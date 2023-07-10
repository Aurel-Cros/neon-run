import * as THREE from 'three';
class Decor {
    constructor(scene) {
        this.scene = scene;
        this.allDecors = [];

        this.instancesNeeded = 0;

        // Sets the offset from center of screen
        this.xPosition = 0;
        // Sets the size of each element
        this.decorSize = [0, 0, 0];
        // Negative number - Sets the separation between two decor elements
        this.decorOffset = -0;
    }
    moveDecor(speed) {
        const moveValue = Math.min(speed, 1);

        const lastDecor = this.allDecors.findLast(a => a);
        const nextPositionZ = lastDecor.position.z + this.decorOffset;

        this.allDecors.forEach(decor => {
            if (decor.position.z > 0)
                decor.position.z = nextPositionZ;
            else
                decor.position.z += moveValue;
        })
    }

    _createDecor() {
        const decor = new THREE.Mesh(
            new THREE.BoxGeometry(...this.decorSize),
            new THREE.MeshBasicMaterial({ map: this.decorTexture, transparent: true })
        );

        decor.position.y = 1.1;
        return decor;
    }
}

export class Rails extends Decor {
    constructor(scene) {
        super(scene);
        this.previousPos = 0;
        this.instancesNeeded = 20;
        this.xPosition = 10.5;
        this.decorSize = [7.48, 1.66, 0]; // Sets the size of each element
        this.decorOffset = -6.9; // Sets

        this._loadTexture();
        this._initDraw();
    }
    _loadTexture() {
        this.decorTexture = new THREE.TextureLoader().load('../assets/rails/rail_bleu.png');
    }
    _initDraw() {
        for (let i = 0; i < (this.instancesNeeded * 2); i++) {

            const side = i >= this.instancesNeeded ? -1 : 1;

            const newDecor = this._createDecor();
            newDecor.position.x = this.xPosition * side;
            newDecor.position.z = (i % this.instancesNeeded) * this.decorOffset;
            newDecor.rotateY(Math.PI / 180 * 90);

            this.allDecors.push(newDecor);
            this.scene.add(newDecor);
        }
    }
}

export class Trees extends Decor {
    constructor(scene) {
        super(scene);
        this.instancesNeeded = 6;
        this.xPosition = 15;
        this.decorSize = [34, 50, 0]; // Sets the size of each element
        this.decorOffset = -30; // Sets the space between two elements

        this.lastTexture = 2;
        this._loadTexture();
        this._initDraw();
    }
    _loadTexture() {
        this.textures = [
            new THREE.TextureLoader().load('/assets/PalmTree/palmtree.png'),
            new THREE.TextureLoader().load('/assets/PalmTree/palmtree2.png'),
            new THREE.TextureLoader().load('/assets/PalmTree/palmtree3.png')
        ];
    }
    _initDraw() {
        for (let i = 0; i < (this.instancesNeeded * 2); i++) {

            const side = i >= this.instancesNeeded ? -1 : 1;

            const newDecor = this._createDecor();
            newDecor.position.x = this.xPosition * side;
            newDecor.position.z = (i % this.instancesNeeded) * this.decorOffset;

            this.allDecors.push(newDecor);
            this.scene.add(newDecor);
        }
    }

    _createDecor() {
        this.lastTexture = (this.lastTexture + 1) % 3;
        const texture = this.textures[this.lastTexture];
        const decor = new THREE.Mesh(
            new THREE.BoxGeometry(...this.decorSize),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true })
        );
        decor.position.y = 1.1;
        return decor;
    }
}