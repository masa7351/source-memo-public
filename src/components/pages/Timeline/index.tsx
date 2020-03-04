import React from 'react';
import TweetTimeline from '../../organisms/TweetTimeline';
import { useTimeline } from './use';
const Timeline: React.FC = () => {
  const { tweets, userId } = useTimeline();

  return (
    <div className="container">
      <TweetTimeline tweets={tweets} userId={userId} />
    </div>
  );
};

export default Timeline;
