import dayjs from "dayjs";
import { ObjectID } from "mongodb";
import { MutationResolvers, TimerType } from "../../DAO";
import { ContextType } from "../../context";
import { checkAuth } from "../../Helpers";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const startTimer: MutationResolvers<ContextType>["startTimer"] = async (
  _,
  { type: givenType },
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
    const res = await userCollection.findOneAndUpdate(
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
        returnDocument: "after",
      }
    );
    const user = getUserMvcFromDbObject(res.value);

    return { user };
  }

  if (!timer.endTime) {
    let type = givenType;

    if (!givenType) {
      type = timer.type;
    }

    let numMinutes: number;

    switch (type) {
      case TimerType.ShortBreak:
        numMinutes = settings.shortBreakLength;
        break;
      case TimerType.Pomodoro:
        numMinutes = settings.pomoLength;
        break;
      case TimerType.LongBreak:
        numMinutes = settings.longBreakLength;
        break;
      default:
        numMinutes = settings.pomoLength;
        break;
    }

    const endTime: string = dayjs().add(numMinutes, "m").toISOString();
    // Start a new timer
    const res = await userCollection.findOneAndUpdate(
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
        returnDocument: "after",
      }
    );
    const user = getUserMvcFromDbObject(res.value);

    return { user };
  }

  return undefined;
};

export default startTimer;
