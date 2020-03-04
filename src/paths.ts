// Cloud Firestore paths

export const users = 'users' as const;
export const tweets = 'tweets' as const;

/**
 * User path
 * @param userId userId
 * @return /users/{user_id}
 */
export const user = (userId: string) => [users, userId].join('/');

/**
 * User tweets path
 * @param userId userId
 * @return /users/{user_id}/tweets
 */
export const userTweets = (userId: string) => [user(userId), tweets].join('/');

/**
 * User a tweet path
 * @param userId userId
 * @param tweetId tweetId
 * @return /users/{user_id}/tweets/{tweet_id}
 */
export const userTweet = (userId: string, tweetId: string) =>
  [userTweets(userId), tweetId].join('/');
