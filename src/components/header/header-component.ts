import { OneComponent } from "../../onec";
const css = require("./header-component.css").default;

export class HeaderComponent extends OneComponent {
  // component definition
  $style = css.toString();
  $template = {
    div: {
      _class: "header",
      _cn: [
        {
          div: {
            _class: "header-text",
            _text: "onec.js",
          },
        },
      ],
    },
  };

  constructor() {
    super();
  }
}
