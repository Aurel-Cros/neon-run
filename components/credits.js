class Credits {
  constructor() {
    this.position = -730;
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
        "Najima Guermoudi",
        "Evan Maljoku",
        "Fabien Rousset",
        "Salomé Vauchier",
      ],
    };

    const groups = [designers, developers];

    const credits = document.createElement("div");
    credits.id = "credits";
    document.querySelector("body").appendChild(credits);

    const mainTitle = document.createElement("h1");
    mainTitle.innerHTML = "Credits";
    credits.appendChild(mainTitle);

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
      credits.appendChild(wrapper);
    }
  }
  _rollCredits() {
    setInterval(() => {
      if (this.position < 730) {
        this.position += 1;
        document.querySelector("#credits").style.bottom = `${this.position}px`;
      } else {
        clearInterval();
      }
    }, 10);
  }
}
