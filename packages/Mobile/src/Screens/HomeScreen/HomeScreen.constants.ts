import { TimerType } from "../../GraphQL/types";

export const homeScreenModeOptions = [
  {
    label: "Pomodoro",
    value: TimerType.Pomodoro,
  },
  {
    label: "Short Break",
    value: TimerType.ShortBreak,
  },
  {
    label: "Long Break",
    value: TimerType.LongBreak,
  },
];
