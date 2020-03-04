import React, { Fragment } from 'react';
import useWindowDimensions from '../../../logics/utils/useWindowDimensions';
import { Tweet } from '../../../types';
import '../../../logics/utils/string.extension';
import TweetItem from '../../molecules/TweetItem';
import InputEntrance from '../../atoms/InputEntrance';
import styled from 'styled-components';

type TweetTimelineProps = {
  tweets: Tweet[];
  userId: string;
  onShowInput?: () => void;
  onShowItemBalloon?: (id: string, x: number, y: number) => void;
};

const TweetTimeline: React.FC<TweetTimelineProps> = ({
  tweets,
  userId,
  onShowInput = () => {},
  onShowItemBalloon = () => {}
}) => {
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();

  const openEditingBubbleHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    if (height == null) {
      return;
    }

    // 画面の下部からの距離
    const positionYFromBottom = height - event.clientY;
    if (positionYFromBottom < 300) {
      onShowItemBalloon(id, event.clientX, event.clientY - 130);
    } else {
      onShowItemBalloon(id, event.clientX, event.clientY + 30);
    }
  };

  return (
    <Fragment>
      <StyledTimeline id="dashboard-timeline">
        {userId && (
          <InputEntrance
            text="こちらから記事を投稿できます。"
            onClick={onShowInput}
          />
        )}
        {tweets && tweets.length !== 0 && (
          <StyledMenu>
            {tweets &&
              tweets.map(tweet => (
                <TweetItem
                  key={tweet.id}
                  tweet={tweet}
                  userId={userId}
                  isMine={userId === tweet.userId}
                  onOpenEditingBubble={e =>
                    openEditingBubbleHandler(e, tweet.id)
                  }
                />
              ))}
          </StyledMenu>
        )}
      </StyledTimeline>
    </Fragment>
  );
};

export default TweetTimeline;

// Styles

const StyledTimeline = styled.div`
  margin: 0 1rem;
`;

const StyledMenu = styled.ul`
  list-style: none;
  margin: 1rem 0;
`;
