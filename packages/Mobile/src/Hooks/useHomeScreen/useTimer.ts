import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  TimerType,
  usePauseTimerMutation,
  useStartTimerMutation,
  useStopTimerMutation,
} from "../../GraphQL/types";
import useHomeScreenData, { UseHomeScreenData } from "./useHomeScreenData";
import useSetTimerType from "./useSetTimerType";
import useInterval from "../useInterval";

export const StartTimerMutation = gql`
  mutation StartTimer($type: TimerType) {
    startTimer(type: $type) {
      user {
        id
        timer {
          endTime
        }
      }
    }
  }
`;

export const PauseTimerMutation = gql`
  mutation PauseTimer {
    pauseTimer {
      user {
        id
        timer {
          endTime
        }
      }
    }
  }
`;

export const StopTimerMutation = gql`
  mutation StopTimer {
    stopTimer {
      user {
        id
        timer {
          endTime
        }
      }
    }
  }
`;

type UseTimer = {
  stopTimer: () => Promise<void>;
  handleTimerTypeChange: (newType: TimerType) => Promise<void>;
  data: UseHomeScreenData["data"];
  timerType?: TimerType;
  timeLeft: string;
  timerRunning: boolean;
  handleButtonClick: () => void;
  refetch: () => void;
};

const useTimer = (): UseTimer => {
  const { data, refetch } = useHomeScreenData();

  const [startTimerOperation] = useStartTimerMutation();
  const [pauseTimerOperation] = usePauseTimerMutation();
  const [stopTimerOperation] = useStopTimerMutation();
  const { setTimerType } = useSetTimerType();

  const [localTimerType, setLocalTimerType] = useState<TimerType>();
  const [timeLeft, setTimeLeft] = useState("00:00");
  const [timerRunning, setTimerRunning] = useState(false);

  const formatSeconds = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const setTimeLeftSeconds = (totalSeconds: number) => {
    setTimeLeft(formatSeconds(totalSeconds));
  };

  const updateTimerLeft = () => {
    if (data?.user?.timer?.endTime) {
      const endTime = data?.user?.timer?.endTime;

      setTimeLeftSeconds(dayjs(dayjs(endTime)).diff(dayjs(), "seconds"));
    }
  };

  const getAmount = () => (timerRunning ? 1000 : null);

  const { start, stop } = useInterval(updateTimerLeft, getAmount());

  const handleTimerTypeChange = async (newType: TimerType) => {
    if (timeLeft === "00:00") {
      setLocalTimerType(newType);
      await setTimerType(newType);
      await refetch();
    }
  };

  const startTimer = async () => {
    await startTimerOperation({
      variables: {
        type: localTimerType,
      },
    });
    start();
    await refetch();
  };

  const pauseTimer = async () => {
    await pauseTimerOperation();
    await refetch();
  };

  const stopTimer = async () => {
    await stopTimerOperation();
    setTimerRunning(false);
    setTimeLeft("00:00");
    stop();
    await refetch();
  };

  const handleButtonClick = async () => {
    if (timerRunning) {
      setTimerRunning(false);
      stop();
      await pauseTimer();
    } else {
      setTimerRunning(true);
      await startTimer();
    }
  };

  useEffect(() => {
    if (data?.user?.timer) {
      const {
        user: { timer },
      } = data;
      if (timer?.type && !localTimerType) {
        setLocalTimerType(timer.type);
      }
      if (!timer?.type && !localTimerType) {
        setLocalTimerType(TimerType.Pomodoro);
      }
      if (timer?.endTime) {
        setTimeLeftSeconds(dayjs(timer.endTime).diff(dayjs(), "seconds"));
        setTimerRunning(true);
        start();
      }
      if (
        timeLeft === "00:00" &&
        timer.endTime &&
        dayjs(timer.endTime).diff(dayjs(), "s") < 10
      ) {
        stopTimer();
      }
    }
  }, [data]);

  return {
    stopTimer,
    data,
    handleTimerTypeChange,
    timerType: localTimerType,
    timeLeft,
    timerRunning,
    handleButtonClick,
    refetch,
  };
};

export default useTimer;
