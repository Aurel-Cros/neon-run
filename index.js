import * as THREE from 'three';
import { Game } from './components/Game';
const gameWrapper = document.querySelector(".game-wrapper");
const loadingMenu = document.querySelector('.loading-menu');
const startButton = document.querySelector('.start-button');

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
        requestAnimationFrame(animate);

        gameInstance.update();
        renderer.render(scene, camera);
    }
    animate();
}

startButton.addEventListener('click', function () {
    loadingMenu.remove();
    startGame();

});

// retryButton.addEventListener('click', function () {
//     document.body.replaceChildren();
//     startGame();
// });

// // vers la div game over
// function displayGameOver() {
//     document.body.replaceChildren(gameOver);
// }

// quitButton.addEventListener('click', function () {
//     document.body.replaceChildren(loadingMenu);
// });