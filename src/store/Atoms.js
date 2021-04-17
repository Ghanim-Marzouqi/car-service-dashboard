import { atom } from "recoil";

const loggedInUserState = atom({
  key: "loggedUserState",
  default: {
    name: "",
    email: "",
    phone: "",
    username: "",
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