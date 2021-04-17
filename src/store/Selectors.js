import { selector } from "recoil";
import { loggedInUserState, ownerGaragesState } from "."

const getLoggedInUserState = selector({
  key: "getLoggedInUserState",
  get: ({ get }) => {
    return get(loggedInUserState);
  }
});

const getOwnerGaragesState = selector({
  key: "getOwnerGarageState",
  get: ({ get }) => {
    return get(ownerGaragesState);
  }
});

export { getLoggedInUserState, getOwnerGaragesState }