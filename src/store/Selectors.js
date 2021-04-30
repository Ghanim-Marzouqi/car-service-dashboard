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

const getGarageIdsState = selector({
  key: "getGarageIdsState",
  get: ({ get }) => {
    const garages = get(ownerGaragesState);
    const garageIds = garages.map(g => g.id);
    return garageIds;
  }
})

export { getLoggedInUserState, getOwnerGaragesState, getGarageIdsState }