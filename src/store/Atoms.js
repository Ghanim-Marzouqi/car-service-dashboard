import { atom } from "recoil";

const loggedInUserState = atom({
  key: "loggedUserState",
  default: {
    id: 0,
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    user_type: "",
    region_id: "",
    willayat_id: ""
  }
});

const ownerGaragesState = atom({
  key: "ownerGarageState",
  default: []
});

export { loggedInUserState, ownerGaragesState }