import React,  { useEffect, useCallback } from "react";

import { useDropzone, FileRejection, DropEvent } from "react-dropzone";

import { Container, ImageBackground } from "./styles";
import { useImageBackground } from "elements";

const ImageDrop: React.FC = () => {

  const [src, setSrc] = useImageBackground()

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src)
    }
  }, [src])

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => {
   if(acceptedFiles.length > 0) {
     const [ file ] = acceptedFiles;
     const url = URL.createObjectURL(file)
     setSrc(url)
   }
  }, [setSrc])

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
    src.length > 0 
      ? <ImageBackground src={src} /> 
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
