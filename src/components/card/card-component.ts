import style from "./card-component.css";
import { Bind, ITemplate, OneComponent, ReactiveObj } from "../../onec";

export class CardComponent extends OneComponent {
  // component variables
  private _name: string = "";
  private _email: string = "";
  private _isEdit: boolean = false;

  // component definition
  $style = style;
  $template = {
    div: {
      _class: "card",
      _cn: [
        ReactiveObj((element) => {
          element.set({
            img: {
              _class: "card_image",
              _src: "https://images.pexels.com/photos/7955413/pexels-photo-7955413.jpeg?cs=srgb&dl=pexels-oleg-prachuk-7955413.jpg&fm=jpg",
            },
          });
        }),
        { p: { _class: "label", _text: "Name" } },
        ReactiveObj((element) => {
          if (this._isEdit) {
            element.set({
              input: {
                _value: Bind(this._name, (value) => (this._name = value)),
              },
            });
          } else {
            element.set({
              div: {
                _class: "label_text",
                _text: () => this._name,
              },
            });
          }
        }),
        { p: { _class: "label", _text: "Email" } },
        ReactiveObj((element) => {
          if (this._isEdit) {
            element.set({
              input: {
                _value: Bind(this._email, (value) => (this._email = value)),
              },
            });
          } else {
            element.set({
              div: {
                _class: "label_text",
                _text: () => this._email,
              },
            });
          }
        }),
        { div: { _style: { height: "1em" } } },
        {
          "c-button": {
            _txt: () => (this._isEdit ? "Show" : "Edit"),
            _width: "100%",
            $click: () => {
              this._isEdit = !this._isEdit;
            },
          },
        },
      ],
    },
  };

  constructor() {
    super();
  }
}
