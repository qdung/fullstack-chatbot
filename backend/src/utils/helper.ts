import crypto from "crypto";

export const generateSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};
