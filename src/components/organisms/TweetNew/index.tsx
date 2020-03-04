import React from 'react';
import DropzoneInput from '../../molecules/DropzoneInput';
import ImagePreview from '../../molecules/ImagePreview';
import { useTweetNew } from './use';
import { useCloseModal } from '../../../logics/uses/useCloseModal';
import PositiveButton from '../../atoms/PositiveButton';
import Overlay from '../../atoms/Overlay';
import InputTextArea from '../../atoms/InputTextArea';
import InputText from '../../atoms/InputText';
import OverlayCloseButton from '../../atoms/OverlayCloseButton';
import styled from 'styled-components';

type TweetNewProps = {
  onClose: () => void;
};

const TweetNew: React.FC<TweetNewProps> = ({ onClose }) => {
  const {
    title,
    keyword,
    content,
    blobsPath,
    uploadedImagesPath,
    changeTitle,
    changeContent,
    changeKeyword,
    uploadImages,
    addTweet
  } = useTweetNew(onClose);

  const { elementRef, closeModal } = useCloseModal(onClose);

  return (
    <Overlay zIndex={1} onClose={closeModal}>
      <StyledForm id="dashboard-form" ref={elementRef}>
        <OverlayCloseButton onClose={onClose} />
        <h1>登録</h1>
        <InputText
          type="text"
          id="title"
          title="Title"
          value={title}
          onChange={changeTitle}
        />
        <InputTextArea
          id="content"
          title="Content"
          value={content}
          rows={30}
          onChange={changeContent}
        />
        <InputText
          type="text"
          id="keyword"
          title="Keyword"
          value={keyword}
          onChange={changeKeyword}
        />
        <ImagePreview
          blobsPath={blobsPath}
          uploadedImagesPath={uploadedImagesPath}
        />
        <DropzoneInput uploadImages={uploadImages} />
        <PositiveButton onClick={addTweet}>送信</PositiveButton>
      </StyledForm>
    </Overlay>
  );
};

export default TweetNew;

// Styles

const StyledForm = styled.form`
  position: relative;
  background: var(--background-color);
  font-size: 1rem;
  margin: 3rem;
  padding: 1rem;
`;
