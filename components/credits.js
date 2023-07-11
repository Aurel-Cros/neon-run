import { startGame } from "../functions/startGame";

export class Credits {
  constructor() {
    this.position = 0;
    this._makeCredits();
    this._rollCredits();
  }

  _makeCredits() {
    const designers = {
      title: "Design",
      names: ["Olivia Fujak", "Stéphane Sevillano"],
    };
    const developers = {
      title: "Development",
      names: [
        "Aurélien Cros",
        "Evan Maljoku",
        "Salomé Vauchier",
        "Fabien Rousset",
        "Najima Guermoudi"
      ],
    };

    const groups = [designers, developers];

    this.credits = document.createElement("div");
    this.credits.id = "credits";
    this.credits.style.bottom = "0px";
    document.body.appendChild(this.credits);

    const mainTitle = document.createElement("h1");
    mainTitle.innerHTML = "Credits";
    this.credits.appendChild(mainTitle);

    for (let group of groups) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("wrapper");
      const title = document.createElement("h2");
      title.innerHTML = `${group.title}`;
      wrapper.appendChild(title);
      for (let person of group.names) {
        const el = document.createElement("p");
        el.innerHTML = `${person}`;
        wrapper.appendChild(el);
      }
      this.credits.appendChild(wrapper);
    }
  }
  _rollCredits() {
    const credits = setInterval(() => {
      if (this.position < 100) {
        this.position += 0.08;
        this.credits.style.bottom = `${this.position}%`;
        this.credits.style.transform = `translateY(${100 - this.position}%)`;
      } else {
        clearInterval(credits);
        this._displayPlayAgain();
      }
    }, 10);
  }

  _displayPlayAgain() {
    document.body.replaceChildren();

    const gameWrapper = document.createElement("div");
    gameWrapper.className = "game-wrapper";
    document.body.appendChild(gameWrapper);

    const gameOverWrapper = document.createElement("div");
    gameOverWrapper.id = "gameOverWrapper";

    const neonCityImage = document.createElement("img");
    neonCityImage.src = "../assets/background/background/introReadMe.png";
    neonCityImage.width = 985;
    neonCityImage.height = 554;

    const retryButton = document.createElement("button");
    retryButton.id = "retryButton";
    retryButton.className = "replay-btn";
    retryButton.textContent = "Play again";

    gameOverWrapper.append(neonCityImage, retryButton);
    gameWrapper.appendChild(gameOverWrapper);

    retryButton.addEventListener("click", () => {
      gameWrapper.replaceChildren();
      startGame();
    });
  }
}
