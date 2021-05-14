import { UserMvc, UserMvcDbObject } from "../DAO";
import dbPromise from "../dbPromise";

const getUserMvcFromDbObject = (userMvcDbObject: UserMvcDbObject): UserMvc => {
  if (userMvcDbObject === null || userMvcDbObject === undefined) {
    return null;
  }
  const { _id, ...object } = userMvcDbObject;
  return {
    id: _id.toHexString(),
    ...object,
  } as UserMvc;
};

const getUserCollection = async () => {
  const db = await dbPromise;
  return db.collection<UserMvcDbObject>("User");
};

export { getUserMvcFromDbObject, getUserCollection };
