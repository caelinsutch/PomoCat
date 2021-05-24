import dayjs from "dayjs";
import { ObjectID } from "mongodb";
import { MutationResolvers, TimerType } from "../../DAO";
import { ContextType } from "../../context";
import { checkAuth } from "../../Helpers";
import { getUserCollection } from "../user.helpers";

const startTimer: MutationResolvers<ContextType>["startTimer"] = async (
  _,
  { type },
  context
) => {
  checkAuth(context);
  const userCollection = await getUserCollection();

  const {
    user: { timer, id, settings },
  } = context;

  if (timer.isPaused) {
    // Otherwise the timer is paused

    // Get new end time
    const newEndTime = dayjs().add(timer.pausedTimeLeftMs, "ms");
    // Resume the timer
    await userCollection.findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(id),
      },
      {
        $set: {
          timer: {
            isPaused: false,
            pausedTimeLeftMs: null,
            endTime: newEndTime.toISOString(),
          },
        },
      },
      {
        upsert: true,
      }
    );
    return true;
  }

  if (timer.endTime === null) {
    if (!type) throw new Error("Type needed to start new timer");

    let numMinutes: number;

    switch (type) {
      case TimerType.ShortBreak:
        numMinutes = settings.shortBreakLength;
        break;
      case TimerType.Pomodoro:
        numMinutes = settings.pomoLength;
        break;
      case TimerType.LongBreak:
        numMinutes = settings.pomoLength;
        break;
      default:
        numMinutes = settings.pomoLength;
        break;
    }

    const endTime: string = dayjs().add(numMinutes, "m").toISOString();
    // Start a new timer
    await userCollection.findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(id),
      },
      {
        $set: {
          timer: {
            isPaused: false,
            endTime,
            type,
          },
        },
      },
      {
        upsert: true,
      }
    );
    return true;
  }
  return false;
};

export default startTimer;
