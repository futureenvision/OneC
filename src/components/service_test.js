import { Component, Store, Bind, ReactiveList, ReactiveObj } from "../onec.js";
import css from "../index.css";

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
  $style = css.toString();

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
