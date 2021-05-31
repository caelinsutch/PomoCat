export enum HomeScreenMode {
  Pomodoro = "pomodoro",
  ShortBreak = "shortBreak",
  LongBreak = "longBreak",
}

export const homeScreenModeOptions = [
  {
    label: "Pomodoro",
    value: HomeScreenMode.Pomodoro,
  },
  {
    label: "Short Break",
    value: HomeScreenMode.ShortBreak,
  },
  {
    label: "Long Break",
    value: HomeScreenMode.LongBreak,
  },
];
