import React from 'react';
import { useDispatch } from 'react-redux';
import {
  updateTweet,
  setCurrentTweet
} from '../../../logics/actions/tweetActions';
import { Tweet } from '../../../types';
import '../../../logics/utils/string.extension';
import { useUploadImage } from '../../../logics/uses/useUploadImages';

export const useTweetEdit = (current: Tweet, onClose: () => void) => {
  const dispatch = useDispatch();
  const title = current.title;
  const content = current.content.decodeLineBreak();
  const keyword = current.keyword;
  const { uploadedImagesPath, blobsPath, uploadImages } = useUploadImage();

  const editTweet = () => {
    const newTweet = {
      ...current,
      title: title,
      content: content,
      keyword: keyword
    };
    dispatch(updateTweet(newTweet));
    onClose();
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const newCurrent = {
      ...current,
      title: title
    };
    dispatch(setCurrentTweet(newCurrent));
  };

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    const newCurrent = {
      ...current,
      keyword: keyword
    };
    dispatch(setCurrentTweet(newCurrent));
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    const newCurrent = {
      ...current,
      content: content
    };
    dispatch(setCurrentTweet(newCurrent));
  };

  return {
    title,
    content,
    keyword,
    blobsPath,
    uploadedImagesPath,
    changeTitle,
    changeContent,
    changeKeyword,
    uploadImages,
    editTweet
  };
};
