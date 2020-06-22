import React,  { useEffect, useCallback, useState } from "react";

import { useDropzone, FileRejection, DropEvent } from "react-dropzone";

import { Container, ImageBackground } from "./styles";

const ImageDrop: React.FC = () => {

  const [ previewUrl, setPreviewUrl ] = useState<string>("")

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => {
   if(acceptedFiles.length > 0) {
     const [ file ] = acceptedFiles;
     const url = URL.createObjectURL(file)
     setPreviewUrl(url)
   }
  }, [])

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive, 
    isDragAccept, 
    isDragReject 
  } = useDropzone({ 
    onDrop,
    accept: ["image/png", "image/jpg", "image/jpeg"],
    multiple: false
  });

  return (
    previewUrl.length > 0 
      ? <ImageBackground src={previewUrl}/> 
      : (
        <Container 
          isDragActive={isDragActive} 
          isDragAccept={isDragAccept}
          isDragReject={isDragReject}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <img src={require("assets/image-drop-icon.svg")} alt="Camera drop icon"/>
          <h2>Drop your background here, or click and select.</h2>
        </Container>
      )
  );
};

export default ImageDrop;
