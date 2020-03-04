import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { BlobPreview } from '../../types';
import { setUploadingImages, uploadImages } from '../actions/tweetActions';
export const useUploadImage = () => {
  const dispatch = useDispatch();

  const uploadedImagesPath = useSelector<RootState, string[]>(
    state => state.tweet.uploadedImagesPath || []
  );
  const blobsPath = useSelector<RootState, string[]>(
    state => state.tweet.blobsPath || []
  );

  const [files, setFiles] = useState<BlobPreview[]>([]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleUploadImages = (images: File[], blobs: BlobPreview[]) => {
    setFiles(blobs);
    const paths = blobs.map(blob => blob.preview);
    dispatch(setUploadingImages(paths));
    dispatch(uploadImages(images));
  };

  return {
    uploadedImagesPath,
    blobsPath,
    uploadImages: handleUploadImages
  };
};
