import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet } from '../../../logics/actions/tweetActions';
import { RootState } from '../../../logics/reducers/rootReducer';
import '../../../logics/utils/string.extension';
import { useUploadImage } from '../../../logics/uses/useUploadImages';

export const useTweetNew = (onClose: () => void) => {
  const dispatch = useDispatch();

  const uid = useSelector<RootState, string>(
    state => (state.auth.user && state.auth.user.userId) || ''
  );

  const { uploadedImagesPath, blobsPath, uploadImages } = useUploadImage();

  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState('');

  const addTweet = () => {
    dispatch(createTweet(uid, title, content, keyword));
    onClose();
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return {
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
  };
};
