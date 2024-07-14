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

    res.json({ roast: gptResponse, userAvatar: promptData.avatar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
