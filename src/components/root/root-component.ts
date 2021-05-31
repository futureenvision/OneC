import { OneComponent } from "../../onec";
export class RootComponent extends OneComponent {
  $template = {
    "c-header": {},
    // "c-cards": {},
    div: {
      _style: {
        display: "grid",
        height: "75%",
        "align-items": "center",
        "justify-content": "center",
      },
      img: {
        _src: "assets/onec.svg",
        _width: "400",
        _height: "400",
      },
    },
  };

  constructor() {
    super();
  }
}
