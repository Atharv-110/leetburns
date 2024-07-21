import { v4 as uuidv4 } from "uuid";

export const uuidMiddleware = (req, res, next) => {
  let userUuid = req.cookies.uuid;
  if (!userUuid) {
    userUuid = uuidv4();
    console.log("uuid not found");
    res.cookie("uuid", userUuid, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
    });
  }
  req.userUuid = userUuid;
  next();
};
