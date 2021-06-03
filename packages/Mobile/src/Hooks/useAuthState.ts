import { useRecoilValue } from "recoil";
import { userState } from "../Recoil";

const useAuthState = () => {
  const user = useRecoilValue(userState);

  return user?.token;
};

export default useAuthState;
