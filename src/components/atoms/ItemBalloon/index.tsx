import React, { useRef } from 'react';
import { PositionRef } from '../../../types';
import Overlay from '../Overlay';
import styled from 'styled-components';
import { Color, Radius } from '../../../styles';

interface ItemBalloonProps extends React.Props<{}> {
  position: PositionRef;
  onClose: () => void;
  onShowEdit: () => void;
  onDelete: () => void;
}

const ItemBalloon: React.FC<ItemBalloonProps> = ({
  position,
  onClose,
  onShowEdit,
  onDelete
}) => {
  const balloonEl = useRef<HTMLDivElement>(null);

  const handleClickOverlay = (e: React.MouseEvent) => {
    // 画面外をタップしたときに閉じる
    // https://ichiki.netlify.com/blog/20191218_react_click_out/
    if (balloonEl.current && !balloonEl.current.contains(e.target)) {
      onClose();
    }
  };

  const clickEditHandler = () => {
    onShowEdit();
    onClose();
  };

  const clickDeleteHandler = () => {
    onDelete();
  };

  return (
    <Overlay zIndex={1} onClose={handleClickOverlay}>
      <StyledBallon
        id="item-balloon"
        ref={balloonEl}
        top={position.y}
        left={position.x - 100}
      >
        <StyledMenu>
          <li>
            <StyledItem onClick={clickEditHandler}>編集</StyledItem>
          </li>
          <li>
            <StyledItem onClick={clickDeleteHandler}>削除</StyledItem>
          </li>
        </StyledMenu>
      </StyledBallon>
    </Overlay>
  );
};

export default ItemBalloon;

const StyledBallon = styled.div`
  position: fixed;
  width: 150px;
  height: 100px;
  background: #fff;
  border-radius: ${Radius.DEFAULT};
  left: ${props => props.left}px;
  top: ${props => props.top}px;
`;

const StyledMenu = styled.ul`
  list-style: none;
  overflow: hidden;
  border-radius: ${Radius.DEFAULT};
`;

const StyledItem = styled.div`
  display: block;
  padding: 0 1rem;
  line-height: 50px;
  color: ${Color.TEXT};
  background: #fff;
  cursor: pointer;

  &:hover {
    color: ${Color.TEXT};
    background: #f2f2f2;
  }
`;
