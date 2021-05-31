import { useEffect, useState } from "react";
import { updateLocalState } from "../Utils";

type UseUpdateLocalState = {
  stateUpdated: boolean;
};

const useUpdateLocalState = (): UseUpdateLocalState => {
  const [stateUpdated, setStateUpdated] = useState(false);

  useEffect(() => {
    updateLocalState().then(() => setStateUpdated(true));
  }, []);

  return { stateUpdated };
};

export default useUpdateLocalState;
