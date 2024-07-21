import { v4 as uuidv4 } from "uuid";

export const uuidMiddleware = (req, res, next) => {
  let userUuid = req.cookies.uuid;
  if (!userUuid) {
    userUuid = uuidv4();
    res.cookie("uuid", userUuid, {
      httpOnly: true,
      maxAge: 60 * 1000,
    });
  }
  req.userUuid = userUuid;
  next();
};
