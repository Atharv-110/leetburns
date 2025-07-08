import users from "../models/users.js";

export const getUserStats = async () => {
  const totalUsers = await users.countDocuments();

  const totalRequestsAgg = await users.aggregate([
    { $group: { _id: null, total: { $sum: "$requests" } } },
  ]);

  const totalRequests = totalRequestsAgg[0]?.total || 0;

  return { totalUsers, totalRequests };
};
