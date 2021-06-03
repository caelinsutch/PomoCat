import { atom } from "recoil";

type UserState = {
  token?: string;
};

const userState = atom<UserState>({
  key: "userState",
  default: {
    token: undefined,
  },
});

export { userState };
