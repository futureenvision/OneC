import style from "./button-component.css";
import { OneComponent } from "../../onec";

export class ButtonComponent extends OneComponent {
  // variable
  private _txt: string = "";
  private _type: string = "primary";
  private _width: string = "min-content";

  // component definition
  $style = style;
  $template = {
    button: {
      _class: () => this._type,
      _style: {
        width: () => this._width,
      },
      _text: () => this._txt,
    },
  };

  constructor() {
    super();
  }
}
