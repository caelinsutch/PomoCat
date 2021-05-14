import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const allUsers = async () => {
  const userCollection = await getUserCollection();
  return userCollection.find().map(getUserMvcFromDbObject).toArray();
};

export default allUsers;
