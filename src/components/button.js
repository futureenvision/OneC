import { Component } from "../onec.js";

export class Button extends Component {
  headerText = "Hello ";
  template = {
    p: {
      _text: () => this.headerText,
    },
    button: {
      _text: "Hello",
      $click: () => this.sayHello(),
    },
  };

  _style = "p{ color : red }";

  constructor() {
    super();
  }

  sayHello() {
    this.headerText += " World";
  }
}