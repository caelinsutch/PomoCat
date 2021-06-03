import { useRecoilState } from "recoil";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userState } from "../Recoil";

const useAuthState = () => {
  const [user, setUser] = useRecoilState(userState);

  const initialize = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      setUser({
        token,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return user?.token;
};

export default useAuthState;
