import * as THREE from 'three';
class Decor {
    constructor(scene) {
        this.scene = scene;
        this.allDecors = [];

        this.instancesNeeded = 20;

        // Sets the offset from center of screen
        this.xPosition = 0;
        // Sets the size of each element
        this.decorSize = [0, 0, 0];
        // Negative number - Sets the separation between two decor elements
        this.decorOffset = -0;

        this._loadTexture();
        this._initDraw();
    }
    _loadTexture() {
        this.decorTexture = new THREE.TextureLoader().load('../assets/rails/rail_mauve.png');
    }

    _initDraw() {
        for (let i = 0; i < this.instancesNeeded * 2; i++) {
            // Draw instructions depending on type of asset
        }
    }
    moveDecor(speed) {
        const moveValue = Math.min(speed, 1);
        this.allDecors.forEach(decor => {
            decor.position.z += moveValue;
        })
        this.previousPos += moveValue;

        const firstDecor = this.allDecors.find(() => true);
        if (firstDecor.position.z > Math.abs(this.decorOffset)) {
            this.allDecors.splice(0, 2).forEach(element => {
                element.removeFromParent();
                element.geometry.dispose();
                element.material.dispose();
            });
            this._createRow();
        }
    }

    _createDecor() {
        const decor = new THREE.Mesh(
            new THREE.BoxGeometry(...this.decorSize),
            new THREE.MeshBasicMaterial({ map: this.decorTexture, transparent: true })
        );

        decor.position.y = 1.1;
        return decor;
    }

    _createRow() {
        // Draw instructions depending on type of asset
    }
}

export class Rails extends Decor {
    constructor(scene) {
        super(scene);
        this.previousPos = 0;
        this.xPosition = 10.5;
        this.decorSize = [7.48, 1.66, 0]; // Sets the size of each element
        this.decorOffset = -6.9; // Sets
    }
    _loadTexture() {
        const orangeTexture = new THREE.TextureLoader().load('../assets/rails/rail_orange.png');
        const greyTexture = new THREE.TextureLoader().load('../assets/rails/rail_neutre.png');
        const blueTexture = new THREE.TextureLoader().load('../assets/rails/rail_bleu.png');
        const purpleTexture = new THREE.TextureLoader().load('../assets/rails/rail_mauve.png');

        this.decorTexture = orangeTexture;

        setInterval(() => {
            if (this.previousPos > 6000) {
                this.decorTexture.dispose();
                this.decorTexture = purpleTexture;
            }
            else if (this.previousPos > 4000) {
                this.decorTexture.dispose();
                this.decorTexture = blueTexture;
            }
            else if (this.previousPos > 2000) {
                this.decorTexture.dispose();
                this.decorTexture = greyTexture;
            }
        }, 5000)
    }
    _initDraw() {
        for (let i = 0; i < this.instancesNeeded * 2; i++) {

            const side = i >= this.instancesNeeded ? -1 : 1;

            const newDecor = this._createDecor();
            newDecor.position.x = this.xPosition * side;
            newDecor.position.z = (i % this.instancesNeeded) * this.decorOffset;
            newDecor.rotateY(Math.PI / 180 * 90);

            this.allDecors.push(newDecor);
            this.scene.add(newDecor);
        }
    }
    _createRow() {
        const lastDecor = this.allDecors.findLast(a => a);
        const nextPositionZ = lastDecor.position.z + this.decorOffset;

        const nextDecorLeft = this._createDecor();
        nextDecorLeft.position.x = -this.xPosition;
        nextDecorLeft.position.z = nextPositionZ;
        nextDecorLeft.rotateY(Math.PI / 180 * 90);

        const nextDecorRight = this._createDecor();
        nextDecorRight.position.x = this.xPosition;
        nextDecorRight.position.z = nextPositionZ;
        nextDecorRight.rotateY(Math.PI / 180 * 90);

        this.scene.add(nextDecorLeft, nextDecorRight);
        this.allDecors.push(nextDecorLeft, nextDecorRight);
    }
}

export class Trees extends Decor {
    constructor(scene) {
        super(scene);
        this.instancesNeeded = 3;
        this.xPosition = 25;
        this.decorSize = [34, 49.9, 0]; // Sets the size of each element
        this.decorOffset = -50; // Sets the space between two elements
    }
    _loadTexture() {
        const palmTreeTexture1 = new THREE.TextureLoader().load('../assets/PalmTree/palmtree.png');
        const palmTreeTexture2 = new THREE.TextureLoader().load('../assets/PalmTree/palmtree2.png');
        const palmTreeTexture3 = new THREE.TextureLoader().load('../assets/PalmTree/palmtree3.png');

        let counter = 0;
        setInterval(() => {
            switch (counter) {
                case 0:
                    this.decorTexture = palmTreeTexture1;
                    break;
                case 1:
                    this.decorTexture = palmTreeTexture2;
                    break;
                case 2:
                    this.decorTexture = palmTreeTexture3;
                    break;
            }
            counter = (counter + 1) % 3;
        }, 1 / 60)
    }
    _initDraw() {
        for (let i = 0; i < this.instancesNeeded * 2; i++) {

            const side = i >= this.instancesNeeded ? -1 : 1;

            const newDecor = this._createDecor();
            newDecor.position.x = this.xPosition * side;
            newDecor.position.z = (i % this.instancesNeeded) * this.decorOffset;

            this.allDecors.push(newDecor);
            this.scene.add(newDecor);
        }
    }
    _createRow() {
        const lastDecor = this.allDecors.findLast(a => a);
        const nextPositionZ = lastDecor.position.z + this.decorOffset;

        const nextDecorLeft = this._createDecor();
        nextDecorLeft.position.x = -this.xPosition;
        nextDecorLeft.position.z = nextPositionZ;

        const nextDecorRight = this._createDecor();
        nextDecorRight.position.x = this.xPosition;
        nextDecorRight.position.z = nextPositionZ;

        this.scene.add(nextDecorLeft, nextDecorRight);
        this.allDecors.push(nextDecorLeft, nextDecorRight);
    }

}