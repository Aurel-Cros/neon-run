import { startGame } from "../functions/startGame";

export class GameOver {
  constructor() {
    this._makeOverlay();
    this._initListeners();
  }

  _makeOverlay() {
    document.body.replaceChildren();
    const gameWrapper = document.createElement("div");
    gameWrapper.className = "game-wrapper";
    document.body.appendChild(gameWrapper);

    const gameOverWrapper = document.createElement("div");
    gameOverWrapper.id = "gameOverWrapper";
    gameWrapper.appendChild(gameOverWrapper);

    const gameOverText = document.createElement("h1");
    gameOverText.id = "gameOverText";
    gameOverText.innerHTML = "GAME OVER";
    gameOverWrapper.appendChild(gameOverText);

    const gameOverTextShadow = document.createElement("p");
    gameOverTextShadow.id = "gameOverTextShadow";
    gameOverTextShadow.innerHTML = "GAME OVER";
    gameOverWrapper.appendChild(gameOverTextShadow);

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("buttonWrapper");
    gameOverWrapper.appendChild(buttonWrapper);

    const retryButton = document.createElement("button");
    retryButton.id = "retryButton";
    retryButton.innerHTML = "Retry";
    buttonWrapper.appendChild(retryButton);

    const quitButton = document.createElement("button");
    quitButton.id = "quitButton";
    quitButton.innerHTML = "Quit";
    buttonWrapper.appendChild(quitButton);
  }
  _initListeners() {
    const retryButton = document.getElementById("retryButton");
    retryButton.addEventListener("click", () => {
      document.querySelector(".game-wrapper").replaceChildren();
      startGame();
    });

    const quitButton = document.getElementById("quitButton");
    quitButton.addEventListener("click", () => { });
  }
}
