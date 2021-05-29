import { OneCStore } from "../onec";

export class UsersStore extends OneCStore {
  users: Array<any> = [
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
