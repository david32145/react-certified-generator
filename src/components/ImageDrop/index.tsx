import React,  { useCallback } from "react";

import { useDropzone } from "react-dropzone";

import { Container } from "./styles";

const ImageDrop: React.FC = () => {

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive, 
    isDragAccept, 
    isDragReject 
  } = useDropzone({ 
    onDrop,
    accept: [".png", ".jpg", ".jpeg"]
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
      <img src={require("assets/image-drop-icon.svg")} alt="Camera drop icon"/>
      <h2>Drop your background here, or click and select.</h2>
    </Container>
  );
};

export default ImageDrop;
