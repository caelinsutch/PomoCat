import { ObjectID } from "mongodb";
import { MutationResolvers } from "../../DAO";
import { checkAuth } from "../../Helpers";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const changeTimerType: MutationResolvers["changeTimerType"] = async (
  _,
  { type },
  context
) => {
  checkAuth(context);
  const userCollection = await getUserCollection();

  const {
    user: { timer, id },
  } = context;

  if (timer.endTime) {
    throw new Error("Cannot change timer type while timer is running!");
  }

  const res = await userCollection.findOneAndUpdate(
    {
      _id: ObjectID.createFromHexString(id),
    },
    {
      $set: {
        timer: {
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
};

export default changeTimerType;
