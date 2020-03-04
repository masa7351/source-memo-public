import React from 'react';
import TweetNew from '../../organisms/TweetNew';
import TweetEdit from '../../organisms/TweetEdit';
import ItemBalloon from '../../atoms/ItemBalloon';
import TweetTimeline from '../../organisms/TweetTimeline';
import { useDashboard } from './use';
import { useCloseModal } from '../../../logics/uses/useCloseModal';
import Overlay from '../../atoms/Overlay';
import ConfirmModal from '../../molecules/ConfirmModal';

const DashBoard: React.FC = () => {
  const {
    tweets,
    currentTweet,
    userId,
    isVisibleInput,
    isVisibleItemBalloon,
    clickPosition,
    showInputModal,
    showEditModal,
    deleteTweet,
    closeInputModal,
    showItemBalloon,
    closeItemBalloon,
    isVisibleDeleteConfirm,
    showDeleteConfirm,
    closeDeleteConfirm
  } = useDashboard();

  const { elementRef, closeModal } = useCloseModal(closeDeleteConfirm);

  return (
    <div className="container">
      {isVisibleInput &&
        (currentTweet != null ? (
          <TweetEdit current={currentTweet} onClose={closeInputModal} />
        ) : (
          <TweetNew onClose={closeInputModal} />
        ))}

      {isVisibleItemBalloon && (
        <ItemBalloon
          position={clickPosition}
          onClose={closeItemBalloon}
          onShowEdit={showEditModal}
          onDelete={showDeleteConfirm}
        />
      )}

      {isVisibleDeleteConfirm && (
        <Overlay zIndex={2} onClose={closeModal}>
          <ConfirmModal
            message={'削除しますがよろしいですか。'}
            elRef={elementRef}
            onClick={deleteTweet}
          />
        </Overlay>
      )}

      <TweetTimeline
        tweets={tweets}
        userId={userId}
        onShowInput={showInputModal}
        onShowItemBalloon={showItemBalloon}
      />
    </div>
  );
};

export default DashBoard;
