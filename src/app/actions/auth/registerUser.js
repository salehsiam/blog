"use server";
import bcrypt from "bcrypt";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const { name, email, password } = payload;
  try {
    const userCollection = dbConnect(collectionNameObj.userCollection);

    const existingUser = await userCollection.findOne({ email: payload.email });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userCollection.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("registerUser error:", error);
    throw new Error("Internal server error");
  }
};
