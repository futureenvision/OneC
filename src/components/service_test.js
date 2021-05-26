import { Component, Store, Bind, ReactiveList, ReactiveObj } from "../onec.js";

class UserDataStore extends Store {
  users = [
    {
      id: 1,
      name: "john",
      email: "john@gmail.com",
      isEdit: false,
    },
    {
      id: 2,
      name: "peter",
      email: "peter@gmail.com",
      isEdit: false,
    },
    {
      id: 3,
      name: "mary",
      email: "mary@gmail.com",
      isEdit: false,
    },
  ];

  constructor() {
    super();
  }
}

const userDataStore = new UserDataStore();

export class ServiceTest extends Component {
  // variables
  users = [];
  isEdit = false;
  message = "Hello";

  // component definition
  $style = `
  html, body{
    box-sizing: border-box;
  }

  *{
    font-family: "Helvetica";
    font-size: 11pt;
  }

  .card {
    background: #fff;
    border-radius: 3px;
    display: inline-block;
    height: fit-content;
    margin: 1rem;
    position: relative;
    width: 290px;
    overflow: hidden;
    padding: 1em;
  }

  .card-1 {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
  
  .card-1:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    cursor: pointer;
  }

  .label {
    color: #648DE5;
    font-weight: 600;
  }

  .label_text {
    color: black;
    font-weight: 400;
    padding: 0.2em;
  }

  .card_button {
    border: none;
    color: white;
    background: #648DE5;
    padding: 0.5em 0.9em;
    border-radius: 0.25em;
    margin-top: 2em;
  }

  input {
    background: inherit;
    border: 1px solid #c6cbd6;
    border-radius: 0.25em;
    margin: 0;
    padding: 0.2em;
    line-height: 1.25em;
    width: calc(100% - 1em);
  }

  input:focus {
    border: 1px solid #333;
    outline: none;
  }

  .card_image{
    width: 100%;
    height: 10em;
    object-fit: cover;
    border-radius: 0.25em;
    box-shadow: -1px -1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  }
  `;

  $template = {
    div: {
      _class: "main-area",
      _cn: ReactiveList((elements) => {
        for (let user of this.users) {
          elements.push({
            div: {
              _class: "card card-1",
              _cn: [
                {
                  img: {
                    _class: "card_image",
                    _src: "https://images.pexels.com/photos/7955413/pexels-photo-7955413.jpeg?cs=srgb&dl=pexels-oleg-prachuk-7955413.jpg&fm=jpg",
                  },
                },
                { p: { _class: "label", _text: "Name" } },
                ReactiveObj((element) => {
                  if (user.isEdit) {
                    element.set({
                      input: {
                        _value: Bind(user.name, (value) => (user.name = value)),
                      },
                    });
                  } else {
                    element.set({
                      div: {
                        _class: "label_text",
                        _text: user.name,
                      },
                    });
                  }
                }),
                { p: { _class: "label", _text: "Email" } },
                ReactiveObj((element) => {
                  if (user.isEdit) {
                    element.set({
                      input: {
                        _value: Bind(
                          user.email,
                          (value) => (user.email = value)
                        ),
                      },
                    });
                  } else {
                    element.set({
                      div: {
                        _class: "label_text",
                        _text: user.email,
                      },
                    });
                  }
                }),
                {
                  button: {
                    _class: "card_button",
                    _text: () => (user.isEdit ? "Show" : "Edit"),
                    $click: () => {
                      user.isEdit = !user.isEdit;
                    },
                  },
                },
              ],
            },
          });
        }
      }),
    },
  };

  constructor() {
    super();
    userDataStore.bind((data) => {
      this.users = data.users;
    });
  }
}
