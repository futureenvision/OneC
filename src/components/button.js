import { Component, ReactiveArray, ReactiveObject } from "../onec.js";

export class Button extends Component {
  $template = {
    "c-label": {
      _txt: () => this.headerText,
    },
    div: {
      _style: {
        padding: "1em",
        "margin-bottom": "1em",
        "font-family": "Helvetica",
        "background-color": "#E7E9EB",
      },
      _cn: [
        {
          p: {
            _text: () => this.headerText,
            _style: {
              color: () => this.headerColor,
            },
          },
        },
        {
          "c-label": {},
        },
      ],
    },
    _cn: ReactiveArray(() => {
      const children = [
        {
          button: {
            _text: "Click Me",
            _style: {
              color: "white",
              border: "none",
              padding: " 0.5em 0.8em",
              "font-family": "Helvetica",
              "background-color": "#BA3B46",
              "margin-bottom": "4em",
              "margin-right": "1em",
            },
            $click: () => this.sayHello(),
          },
        },
        {
          button: {
            _text: "Change Color",
            _style: {
              color: "white",
              border: "none",
              padding: " 0.5em 0.8em",
              "font-family": "Helvetica",
              "background-color": "#BA3B46",
              "margin-bottom": "4em",
              "margin-right": "1em",
            },
            $click: () => this.changeColor(),
          },
        },
        ReactiveObject(() => {
          if (this.headerNum % 2 !== 0) {
            return {
              button: {
                _text: "Odd",
                _style: {
                  color: "white",
                  border: "none",
                  padding: " 0.5em 0.8em",
                  "font-family": "Helvetica",
                  "background-color": "#BA3B46",
                  "margin-bottom": "4em",
                  "margin-right": "1em",
                },
                $click: () => this.add(),
              },
            };
          }
        }),
        {
          p: {
            _cn: ReactiveArray(() => {
              return [
                {
                  _text: "Child of Child",
                },
              ];
            }),
          },
        },
      ];
      if (this.headerNum % 2 === 0) {
        children.push({
          button: {
            _text: "Even",
            _style: {
              color: "white",
              border: "none",
              padding: " 0.5em 0.8em",
              "font-family": "Helvetica",
              "background-color": "#BA3B46",
              "margin-bottom": "4em",
              "margin-right": "1em",
            },
            $click: () => this.add(),
          },
        });
      }
      return children;
    }),
  };

  headerText = "Hello";
  headerColor = "black";
  headerNum = 0;

  constructor() {
    super();
  }

  add() {
    this.headerNum++;
  }

  sayHello() {
    this.headerText += " World";
  }

  changeColor() {
    this.headerColor = "#BA3B46";
  }
}
