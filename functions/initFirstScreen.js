import { startGame } from './startGame';
export const initFirstScreen = () => {
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
    startButton.dispatchEvent(new Event('click'));
}