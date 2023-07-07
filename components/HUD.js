export class HUD {
  constructor(amountOfLives) {
    this.lives = amountOfLives;
    this.time_min = 0;
    this.time_sec = 0;
    this.time_ms = 0;
    this._createHUD();
    this._timeStart();
  }
  _createHUD() {
    const hud = document.createElement("div");
    hud.id = "hud";
    document.querySelector(".game-wrapper").appendChild(hud);

    const heartsWrapper = document.createElement("div");
    heartsWrapper.id = "heartsWrapper";
    for (let i = 0; i < this.lives; i++) {
      let heart = document.createElement("div");
      heart.classList.add("heart");
      heartsWrapper.appendChild(heart);
    }
    hud.appendChild(heartsWrapper);

    const timer = document.createElement("p");
    timer.id = "timer";
    timer.innerHTML = `${this.time_min}' ${this.time_sec}'' ${this.time_ms}'''`;
    hud.appendChild(timer);
  }

  _timeStart() {
    this.timeInterval = setInterval(() => {
      if (this.time_ms < 10) {
        this.time_ms += 1;
      } else if (this.time_sec < 60) {
        this.time_sec += 1;
        this.time_ms = 0;
      } else {
        this.time_min += 1;
        this.time_sec = 0;
        this.time_ms = 0;
      }
      timer.innerHTML = `${this.time_min}' ${this.time_sec}'' ${this.time_ms}'''`;
    }, 100);
  }
  timeStop() {
    clearInterval(this.timeInterval);
  }

  loseLife() {
    setTimeout(() => {
      const hearts = Array.from(document.querySelectorAll(".heart"));
      const lastFullHeart = hearts.findLast((a) => (!a.classList.contains('lost')))
      lastFullHeart.classList.add("lost");
    }, 400);
  }
}