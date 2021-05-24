import { ContextType } from "../context";

const checkAuth = (context: ContextType) => {
  if (!context?.user) throw new Error("Must be logged in!");
};

export default checkAuth;
