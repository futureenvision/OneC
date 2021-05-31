import { OneComponent } from "../../onec";
export class RootComponent extends OneComponent {
  $template = {
    "c-header": {},
    // "c-cards": {},
    div: {
      img: {
        _src: "assets/onec.svg",
        _width: "500",
        _height: "500",
      },
    },
  };

  constructor() {
    super();
  }
}
