import { ObjectID } from "mongodb";
import { MutationResolvers } from "../../DAO";
import { ContextType } from "../../context";
import { getUserCollection } from "../user.helpers";
import { checkAuth } from "../../Helpers";

const stopTimer: MutationResolvers<ContextType>["stopTimer"] = async (
  _,
  a,
  context
) => {
  checkAuth(context);
  const userCollection = await getUserCollection();
  await userCollection.findOneAndUpdate(
    {
      _id: ObjectID.createFromHexString(context.user.id),
    },
    {
      $set: {
        timer: {
          endTime: null,
          type: null,
          pausedTimeLeftMs: null,
          isPaused: null,
        },
      },
    },
    {
      upsert: true,
    }
  );
  return true;
};

export default stopTimer;
