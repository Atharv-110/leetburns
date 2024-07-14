export const userProfileQuery = `
    query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
            username
            profile {
                ranking
                userAvatar
                realName
            }
        }
    }
`;

export const userRatingQuery = `
    query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
                name
            }
        }
    }
`;

export const problemsSolvedQuery = `
    query userProblemsSolved($username: String!) {
        allQuestionsCount {
            difficulty
            count
        }
        matchedUser(username: $username) {
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
        }
    }
`;

export const userBadgesQuery = `
    query userBadges($username: String!) {
        matchedUser(username: $username) {
            badges {
                id
                name
                shortName
                displayName
                hoverText
                creationDate
                category
            }
        }
    }
`;

export const userCalendarQuery = `
    query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
            userCalendar(year: $year) {
                activeYears
                streak
                totalActiveDays
            }
        }
    }
`;
