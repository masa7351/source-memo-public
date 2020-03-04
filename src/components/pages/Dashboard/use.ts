import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  subscribeMyTweets,
  setCurrentTweet,
  clearUploadedImages,
  deleteTweet
} from '../../../logics/actions/tweetActions';
import { PositionRef, Tweet } from '../../../types';
import { RootState } from '../../../logics/reducers/rootReducer';

export const useDashboard = () => {
  const dispatch = useDispatch();
  const tweets = useSelector<RootState, Tweet[]>(
    state => state.tweet.myTweets || []
  );
  const currentTweet = useSelector<RootState, Tweet | null>(
    state => state.tweet.current
  );
  const userId = useSelector<RootState, string>(
    state => state.auth.user?.userId || ''
  );

  const [isVisibleInput, setVisibleInput] = useState(false);
  const [isVisibleItemBalloon, setVisibleItemBalloon] = useState(false);

  // [!] クリックするたびに再描画されないようにuseStateではなくuseRefを使用している。
  const clickPosition = useRef<PositionRef>({
    x: 0,
    y: 0
  });
  const selectedTweetId = useRef<{
    id: string;
  }>({ id: '0' });
  const [isVisibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);

  useEffect(() => {
    if (userId) {
      let unsubscribe = () => {};
      dispatch(
        subscribeMyTweets(userId, func => {
          unsubscribe = func;
        })
      );
      return () => {
        unsubscribe();
      };
    }
  }, [dispatch, userId]);

  // Input Area

  const showInputModal = () => {
    setVisibleInput(true);
  };

  const showEditModal = () => {
    const tweet = tweets.filter(
      tweet => tweet.id === selectedTweetId.current.id
    )[0];
    if (tweet) {
      dispatch(setCurrentTweet(tweet));
      showInputModal();
    }
  };

  const closeInputModal = () => {
    setVisibleInput(false);
    dispatch(setCurrentTweet(null));
    dispatch(clearUploadedImages());
  };

  // Item Ballon

  const showItemBalloon = (id: string, x: number, y: number) => {
    clickPosition.current = {
      x,
      y
    };
    selectedTweetId.current = { id };
    setVisibleItemBalloon(true);
  };

  const closeItemBalloon = () => {
    setVisibleItemBalloon(false);
  };

  // Modal

  const showDeleteConfirm = () => {
    setVisibleDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    closeItemBalloon();
    setVisibleDeleteConfirm(false);
  };
  const onDeleteTweet = () => {
    dispatch(deleteTweet(selectedTweetId.current.id, userId));
    closeItemBalloon();
    setVisibleDeleteConfirm(false);
  };

  return {
    tweets,
    currentTweet,
    userId,
    isVisibleInput,
    isVisibleItemBalloon,
    clickPosition: clickPosition.current,
    showInputModal,
    showEditModal,
    deleteTweet: onDeleteTweet,
    closeInputModal,
    showItemBalloon,
    closeItemBalloon,
    isVisibleDeleteConfirm,
    showDeleteConfirm,
    closeDeleteConfirm
  };
};
