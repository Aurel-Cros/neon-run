import * as THREE from 'three';
import { Game } from './components/Game';
const initScreen = () => {
    const gameWrapper = document.createElement("div");
    gameWrapper.className = "game-wrapper";

    const loadingMenu = document.createElement("div");
    loadingMenu.className = "start-menu";

    const startButton = document.createElement("button"); startButton.className = "start-button";

    startButton.addEventListener('click', function () {
        loadingMenu.remove();
        startGame();
    });
    loadingMenu.appendChild(startButton);
    gameWrapper.appendChild(loadingMenu);
    document.body.appendChild(gameWrapper);
}

initScreen();

const gameWrapper = document.querySelector(".game-wrapper");

const startGame = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1200, 900);
    renderer.antialias = true;
    renderer.outputEncoding = THREE.SRGBColorSpace;

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