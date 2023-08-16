import mongoose, { connect } from "mongoose";

const connectToMongoose = async () => {
  console.log("connecting to database...");
  await connect(""); // TODO: Must be an environment variable, so can be commited
  console.log("connected!");
};

export { connectToMongoose };
