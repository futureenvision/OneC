import { Component } from "../onec.js";

export class Label extends Component {
  $style = "p{ color: blue }";
  $template = {
    b: {
      _cn: [
        {
          p: {
            _text: () => `Counter: ${this.counter} ${this._txt}`,
            _style: {
              color: "white",
              padding: "1em",
              "font-family": "Helvetica",
              "background-color": "#BA3B46",
            },
          },
        },
        {
          p: {
            _text: () => `User's FirstName: ${this.details.user.names.first}`,
            _style: {
              color: "white",
              padding: "1em",
              "font-family": "Helvetica",
              "background-color": "#BA3B46",
            },
          },
        },
      ],
    },
  };

  _txt = "hmm ";

  counter = 0;
  details = {
    user: {
      names: {
        first: "John",
      },
    },
  };

  constructor() {
    super();
  }

  OnInit() {
    setInterval(() => {
      this.counter++;
    }, 1000);
    
    setTimeout(() => {
      this.details.user.names.first = "Peter";
    }, 5000);
  }
}
