import "bootstrap/dist/css/bootstrap.css";
/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />
import * as bootstrap from "bootstrap";
import strings from "./game/strings";

export default class Template {
  strings: DC.Strings;

  constructor() {
    this.strings = strings;
  }

  modalClose(id: string) {
    const modalEl = document.getElementById("modal-" + id);
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal !== null) {
      modal.dispose();
    }
  }

  createElementFromHTML(htmlString: string) {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstElementChild;
  }

  modal(
    id: string,
    title: string,
    content: any,
    cb?: () => void,
    size?: string
  ) {
    let html =
      '<div id="modal-' +
      id +
      '" class="modal" tabindex="-1"><div class="modal-dialog ' +
      size +
      '"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' +
      title +
      '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' +
      content +
      "</div></div></div></div>";

    document.body.insertAdjacentElement(
      "beforeend",
      this.createElementFromHTML(html)
    );

    const modal = new bootstrap.Modal(document.getElementById("modal-" + id), {
      keyboard: false,
    });

    modal.show();

    let rootElement = document.querySelector("body");
    rootElement.addEventListener(
      "hidden.bs.modal",
      (evt) => {
        let targetElement = evt.target as Element;
        while (targetElement != null) {
          if (targetElement.matches("#modal-" + id)) {
            this.modalClose(id);
            if (cb !== null && cb != undefined) {
              cb();
            }
          }
          targetElement = targetElement.parentElement;
        }
      },
      true
    );
  }

  fbInit() {
    let js,
      fjs = document.getElementsByTagName("script")[0];
    if (document.getElementById("facebook-jssdk")) return;
    js = document.createElement("script");
    js.id = "facebook-jssdk";
    js.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=199922540602335";
    fjs.parentNode.insertBefore(js, fjs);
  }

  encounterBlurb() {
    const main =
      strings.encounter["main"][
        Math.floor(Math.random() * strings.encounter["main"].length)
      ];
    const attack =
      strings.encounter["attack"][
        Math.floor(Math.random() * strings.encounter["attack"].length)
      ];
    const flee =
      strings.encounter["flee"][
        Math.floor(Math.random() * strings.encounter["flee"].length)
      ];

    return { main, attack, flee };
  }

  getEncounterOption(option: string) {
    option = option.toLowerCase() as string;

    return this.strings.encounter[
      option as keyof typeof this.strings.encounter
    ][
      Math.floor(
        Math.random() *
          this.strings.encounter[option as keyof typeof this.strings.encounter]
            .length
      )
    ];
  }

  shopBlurb(shop: string) {
    return this.strings.shops[shop as keyof typeof this.strings.shops][
      Math.floor(
        Math.random() *
          this.strings.shops[shop as keyof typeof this.strings.shops].length
      )
    ];
  }

  getText(path: string) {
    return path
      .replace(/\[([^[\]]*)]/g, ".$1.")
      .split(".")
      .filter((prop) => prop !== "")
      .reduce(
        (prev: any, next) => (prev instanceof Object ? prev[next] : undefined),
        strings
      );
  }

  format(str: string, values: string[]) {
    return str.replace(/%s/g, function () {
      return values.shift();
    });
  }

  awakenText(user: DC.User, player: DC.Player) {
    let text = "",
      stipend = false;

    if (user.firstRun) {
      text = strings.awaken.first;
    } else {
      text = strings.awaken.start;
      switch (player.region) {
        case "town":
          switch (player.place) {
            case "tavern":
              text += strings.awaken.place.tavern;

              switch (player.location) {
                case "floor":
                  text += strings.awaken.location.floor;
                  break;

                case "room":
                  text += strings.awaken.location.room;
                  break;

                case "suite":
                  text += strings.awaken.location.suite;
                  break;
              }
              break;

            case "outside":
              break;
          }
          break;

        case "fields":
          break;
      }

      if (player.rankString != "Peasant") {
        stipend = true;
      }

      if (stipend) {
        const base = 2048;
        const gain = Math.floor(base * player.rank * (player.level / 2));
        player.cashToday = player.cashToday + gain;
        player.cash = player.cash + gain;
        text += "<br><br>" + this.format(strings.awaken.stipend, ["" + gain]);
      }
    }

    return text;
  }

  generateBackstory() {
    const r =
        strings.creation.race[
          Math.floor(Math.random() * strings.creation.race.length)
        ],
      a =
        strings.creation.adj[
          Math.floor(Math.random() * strings.creation.adj.length)
        ],
      l =
        strings.creation.loc[
          Math.floor(Math.random() * strings.creation.loc.length)
        ],
      d =
        strings.creation.desc[
          Math.floor(Math.random() * strings.creation.desc.length)
        ];

    return "You are a " + a + " " + r + " from " + l + ", who " + d + ".";
  }
}
