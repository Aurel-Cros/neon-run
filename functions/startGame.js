import * as THREE from 'three';
import { Game } from '../components/Game';

export const startGame = () => {
    const gameWrapper = document.querySelector(".game-wrapper");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer(
        {
            antialias: true
        }
    );
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setSize(1200, 900);

    gameWrapper.appendChild(renderer.domElement);

    const gameInstance = new Game(scene, camera, gameWrapper);

    function animate() {
        if (gameInstance.stop)
            return;
        requestAnimationFrame(animate);

        gameInstance.update();
        renderer.render(scene, camera);
    }
    animate();
}