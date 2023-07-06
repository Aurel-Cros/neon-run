class HUD {
  constructor() {
    this.time_min = 0;
    this.time_sec = 0;
    this.time_ms = 0;
    this._createHUD();
  }
  _createHUD() {
    const hud = document.createElement("div");
    hud.id = "hud";
    document.querySelector("body").appendChild(hud);

    const heartsWrapper = document.createElement("div");
    heartsWrapper.id = "heartsWrapper";
    for (let i = 0; i < 3; i++) {
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

  timeStart() {
    setInterval(() => {
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
    clearInterval();
  }

  loseLife() {
    setTimeout(() => {
      document.querySelector(".heart:last-child").classList.add("lost");
    }, 400);
  }
}