import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subscribeTweets } from '../../../logics/actions/tweetActions';
import { Tweet } from '../../../types';
import { RootState } from '../../../logics/reducers/rootReducer';

export const useTimeline = () => {
  const dispatch = useDispatch();
  const tweets = useSelector<RootState, Tweet[]>(
    state => state.tweet.tweets || []
  );

  const userId = useSelector<RootState, string>(
    state => state.auth.user?.userId || ''
  );

  useEffect(() => {
    // unsubscribe
    // https://stackoverflow.com/questions/55863547/how-to-unsubscribe-from-collection-changes-in-firestore
    let unsubscribe = () => {};
    dispatch(
      subscribeTweets(func => {
        unsubscribe = func;
      })
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return {
    tweets,
    userId
  };
};
