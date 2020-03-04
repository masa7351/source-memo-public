import React from 'react';
import { Tweet } from '../../../types';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../../logics/utils/code-block';
import styled from 'styled-components';
import { Radius } from '../../../styles';

type TweetItemProps = {
  tweet: Tweet;
  userId: string;
  isMine?: boolean;
  onOpenEditingBubble?: (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => void;
};

const TweetItem: React.FC<TweetItemProps> = ({
  tweet,
  userId,
  isMine = false,
  onOpenEditingBubble = () => {}
}) => {
  return (
    <StyledItem className="item">
      <div>
        <StyledTitle>{tweet.title}</StyledTitle>
      </div>
      {tweet.keyword && tweet.keyword.length !== 0 && (
        <StyledKeywordMenu className="keywords">
          {tweet.keyword.split(',').map(keyword => (
            <StyledKeywordItem key={keyword}>{keyword}</StyledKeywordItem>
          ))}
        </StyledKeywordMenu>
      )}
      <div
        className={tweet.keyword && tweet.keyword.length !== 0 ? 'm-top-1' : ''}
      >
        <StyledItemActions>
          {isMine && (
            <StyledEditMenu
              className="b-arrow"
              onClick={e => onOpenEditingBubble(e, tweet.id)}
            />
          )}
        </StyledItemActions>
        <ReactMarkdown
          className="markdown"
          source={tweet.content.decodeLineBreak()}
          escapeHtml={false}
          renderers={{ code: CodeBlock }}
        />
      </div>
    </StyledItem>
  );
};

export default React.memo(TweetItem);

// Styles

const StyledItem = styled.li`
  position: relative;
  border: 1px #aaa solid;
  margin: 1rem 0;
  background: #fff;
  padding: 1rem;
`;

const StyledTitle = styled.h1`
  padding-bottom: 1rem !important;
`;

const StyledKeywordMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
`;

const StyledKeywordItem = styled.li`
  padding: 0.25rem;
  margin-right: 1rem;
  border-radius: ${Radius.DEFAULT};
  color: #666;
  background-color: #eee;
`;

const StyledEditMenu = styled.div`
  display: block;
  width: 10px;
  height: 10px;
  border-right: 2px #000 solid;
  border-bottom: 2px #000 solid;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  cursor: pointer;
`;

const StyledItemActions = styled.div`
  display: flex;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
