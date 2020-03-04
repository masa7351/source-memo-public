import React, { useCallback } from 'react';
import { useDropzone, DropzoneRootProps } from 'react-dropzone';
import { BlobPreview } from '../../../types';
import styled from 'styled-components';
import { Color } from '../../../styles';

type DropzoneInputProps = {
  uploadImages: (images: File[], blobs: BlobPreview[]) => void;
};

const DropzoneInput: React.FC<DropzoneInputProps> = ({ uploadImages }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      const blobs = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      uploadImages(acceptedFiles, blobs);
    },
    [uploadImages]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: 'image/*'
  });

  return (
    <DropZoneArea isDragActive={isDragActive} dropZoneProps={getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </DropZoneArea>
  );
};

export default DropzoneInput;

// Components

type DropZoneAreaProps = {
  isDragActive: boolean;
  dropZoneProps?: DropzoneRootProps;
};

const DropZoneArea: React.FC<DropZoneAreaProps> = ({
  isDragActive,
  dropZoneProps,
  children
}) => {
  return isDragActive ? (
    <StyledDropZoneActive {...dropZoneProps}>{children}</StyledDropZoneActive>
  ) : (
    <StyledDropZone {...dropZoneProps}>{children}</StyledDropZone>
  );
};

// Styled

const StyledDropZone = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border: 1px ${Color.BORDER} dashed;
`;

const StyledDropZoneActive = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border: 2px green dashed;
`;
