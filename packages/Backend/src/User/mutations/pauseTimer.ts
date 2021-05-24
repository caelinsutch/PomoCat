import dayjs from "dayjs";
import { ObjectID } from "mongodb";
import { MutationResolvers } from "../../DAO";
import { ContextType } from "../../context";
import { checkAuth } from "../../Helpers";
import { getUserCollection } from "../user.helpers";

const pauseTimer: MutationResolvers<ContextType>["pauseTimer"] = async (
  _,
  a,
  context
) => {
  checkAuth(context);
  const userCollection = await getUserCollection();

  const {
    user: { timer, id },
  } = context;

  // Check if running timer
  if (!timer.endTime) throw new Error("No running timer!");
  // Check if timer has already ended
  if (dayjs(timer.endTime).isBefore(dayjs()))
    throw new Error("Cannot pause timer that has ended");

  const pausedTimeLeftMs = dayjs(timer.endTime).diff(dayjs(), "ms");

  await userCollection.findOneAndUpdate(
    {
      _id: ObjectID.createFromHexString(id),
    },
    {
      $set: {
        timer: {
          isPaused: true,
          pausedTimeLeftMs,
        },
      },
    },
    {
      upsert: true,
    }
  );
  return true;
};

export default pauseTimer;
