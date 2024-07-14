import dotenv from "dotenv";
import OpenAIApi from "openai";
import fetch from "node-fetch";
dotenv.config();

export const fetchGraphQLData = async (query, variables) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  try {
    const response = await fetch(process.env.LEETCODE_BASE_URL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const generateRoastData = async (useableData) => {
  const openai = new OpenAIApi({
    baseURL: process.env.OPENAI_API_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const {
    name,
    ranking,
    totalQues,
    totalSolvedQues,
    easySolvedQues,
    mediumSolvedQues,
    hardSolvedQues,
    badgeEarnedCount,
    badgeEarned,
    streak,
    activeDays,
  } = useableData;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a professional tech comedian and the best LeetCoder in the world. Your task is to roast a person based on their LeetCode stats in a funny way that could make them cry like a baby. The person's name is ${name}. Here are their stats: Global ranking: ${ranking}, Total problems solved: ${totalSolvedQues} out of ${totalQues}, Easy problems solved: ${easySolvedQues}, Medium problems solved: ${mediumSolvedQues}, Hard problems solved: ${hardSolvedQues}, Badges earned: ${badgeEarnedCount} (${badgeEarned}), Longest streak: ${streak} days, Total active days: ${activeDays}. Roast them with high-level jokes using simple English, without any fancy or difficult words. The roast should be only 160 words. Generate the response as a plain string without any formatting. The person could be of any gender.`,
      },
    ],
    model: "gpt-3.5-turbo-0125",
  });

  return completion.choices[0].message.content;
};

export const useableData = (combinedData) => {
  return {
    name: combinedData.profile.data.matchedUser.profile.realName,
    ranking: combinedData.profile.data.matchedUser.profile.ranking,
    avatar: combinedData.profile.data.matchedUser.profile.userAvatar,
    totalQues: combinedData.solved.data.allQuestionsCount[0].count,
    totalSolvedQues:
      combinedData.solved.data.matchedUser.submitStatsGlobal.acSubmissionNum[0]
        .count,
    easySolvedQues:
      combinedData.solved.data.matchedUser.submitStatsGlobal.acSubmissionNum[1]
        .count,
    mediumSolvedQues:
      combinedData.solved.data.matchedUser.submitStatsGlobal.acSubmissionNum[2]
        .count,
    hardSolvedQues:
      combinedData.solved.data.matchedUser.submitStatsGlobal.acSubmissionNum[3]
        .count,
    badgeEarnedCount: combinedData.badges.data.matchedUser.badges.length,
    badgeEarned: combinedData.badges.data.matchedUser.badges
      .map((badge) => badge.displayName)
      .join(", "),
    streak: combinedData.calendar.data.matchedUser.userCalendar.streak,
    activeDays:
      combinedData.calendar.data.matchedUser.userCalendar.totalActiveDays,
  };
};
