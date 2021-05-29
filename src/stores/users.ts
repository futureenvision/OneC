import { OneCStore } from "../onec";

export interface IUser {
  id: string;
  name: string;
  email: string;
  isEdit: boolean;
}
export class UsersStore extends OneCStore {
  users: Array<IUser> = [
    {
      id: "1",
      name: "john",
      email: "john@gmail.com",
      isEdit: false,
    },
    {
      id: "2",
      name: "peter",
      email: "peter@gmail.com",
      isEdit: false,
    },
    {
      id: "3",
      name: "mary",
      email: "mary@gmail.com",
      isEdit: false,
    },
  ];

  constructor() {
    super();
  }
}
