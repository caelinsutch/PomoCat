import { ObjectID } from "mongodb";
import { MutationResolvers, UserMvc } from "../../DAO";
import { checkAuth } from "../../Helpers";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const completeTask: MutationResolvers["completeTask"] = async (
  _,
  { name, createdAt },
  context
) => {
  checkAuth(context);
  const userCollection = await getUserCollection();

  const previous: UserMvc = context.user;

  const newTasks = previous.tasks.filter(
    (a) => a.name !== name && a.createdAt !== createdAt
  );

  const res = await userCollection.findOneAndUpdate(
    {
      _id: ObjectID.createFromHexString(previous.id),
    },
    {
      $set: {
        tasks: newTasks,
      },
    },
    {
      returnOriginal: false,
      upsert: true,
    }
  );
  const user = getUserMvcFromDbObject(res.value);

  return { user };
};

export default completeTask;
