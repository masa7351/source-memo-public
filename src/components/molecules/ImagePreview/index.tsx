import React from 'react';
import { copyToClipboard } from '../../../logics/utils/copyToClipboard';

interface ImagePreviewProps extends React.Props<{}> {
  blobsPath: string[];
  uploadedImagesPath: string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  blobsPath,
  uploadedImagesPath
}) => {
  const copyHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    text: string
  ) => {
    e.preventDefault();
    const imgText = `<img src="${text}" width="300px">`;
    copyToClipboard(imgText);
  };
  return (
    <div>
      {blobsPath.map(blobUrl => (
        <img
          key={blobUrl}
          alt=""
          className="opacity50"
          src={blobUrl}
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      ))}
      {uploadedImagesPath.map(imagePath => (
        <button key={imagePath} onClick={e => copyHandler(e, imagePath)}>
          <img
            alt=""
            src={imagePath}
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </button>
      ))}
    </div>
  );
};

export default React.memo(ImagePreview);
