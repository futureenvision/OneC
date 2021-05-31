import { usersStore } from "../../stores";
import style from "./cards-component.css";
import { IUser } from "../../stores/users";
import { OneComponent, ReactiveLst } from "../../onec";

export class CardsComponent extends OneComponent {
  // variables
  private users: Array<IUser> = [];

  // component definition
  $style = style;
  $template = {
    div: {
      _class: "main-area",
      _cn: ReactiveLst((elements) => {
        for (const user of this.users) {
          elements.push({
            "c-card": {
              _name: user.name,
              _email: user.email,
            },
          });
        }
      }),
    },
  };

  constructor() {
    super();
    usersStore.bind((data) => {
      this.users = data.users;
    });
  }
}
