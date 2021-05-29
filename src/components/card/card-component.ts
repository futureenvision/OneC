import { ITemplate, OneComponent } from "../../onec";
let css = require("./card-component.css").default;

export class CardComponent extends OneComponent {
  // component variables
  private _name: string = "";

  // component definition
  $style = css.toString();
  $template: ITemplate = {
    div: {
      _text: () => "Hello World " + this._name
    },
  };

  constructor() {
    super();
  }
}
