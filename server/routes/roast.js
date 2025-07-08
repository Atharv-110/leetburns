import express from "express";
import {
  fetchGraphQLData,
  useableData,
  generateRoastData,
} from "../utils/utility.js";
import {
  userProfileQuery,
  userRatingQuery,
  problemsSolvedQuery,
  userBadgesQuery,
  userCalendarQuery,
} from "../queries/userGraphqlQueries.js";
import users from "../models/users.js";
import { getUserStats } from "../utils/userUtils.js";

export const router = express.Router();

// roast route
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const { year } = req.query;

  try {
    const [profileData, ratingData, solvedData, badgesData, calendarData] =
      await Promise.all([
        fetchGraphQLData(userProfileQuery, { username }),
        fetchGraphQLData(userRatingQuery, { username }),
        fetchGraphQLData(problemsSolvedQuery, { username }),
        fetchGraphQLData(userBadgesQuery, { username }),
        fetchGraphQLData(userCalendarQuery, { username, year }),
      ]);
    const combinedData = {
      profile: profileData,
      rating: ratingData,
      solved: solvedData,
      badges: badgesData,
      calendar: calendarData,
    };

    const promptData = useableData(combinedData);
    const gptResponse = await generateRoastData(promptData);

    console.log("> Updating DB with roast request for user:", username);
    await users.updateOne(
      { username },
      {
        $inc: { requests: 1 },
        $setOnInsert: { username },
      },
      { upsert: true }
    );

    const userStats = await getUserStats();

    res
      .status(200)
      .json({ roast: gptResponse, userAvatar: promptData.avatar, userStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
