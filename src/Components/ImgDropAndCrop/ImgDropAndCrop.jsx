import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "./ImgDropAndCrop.css";

function ImgDropAndCrop({ afterImageLoaded }) {
  const [imgSrc, setImgSrc] = useState(null);

  const handleOnDrop = (files, rejectedFiles) => {
    // Handle Rejected Files
    if (rejectedFiles && rejectedFiles.length > 0) {
      if (rejectedFiles[0].errors[0].code === "too-many-files")
        alert("You can only upload 1 file");
      else if (rejectedFiles[0].errors[0].code === "file-too-large")
        alert("Image Size too large! Please upload file under 3MB.");
      else {
        alert(rejectedFiles[0].errors[0].code);
      }
      return;
    }

    // Handle Accepted Files
    if (files && files.length > 0) {
      const currentFile = files[0];
      const fileName = currentFile.name;
      const fileType = fileName.split(".")[1];

      if (fileType != "jpg" && fileType != "jpeg" && fileType != "png") {
        console.log("image rejected for extension:", fileType);
        alert("Only jpg, jpeg and png files are allowed!");
        return;
      }
      console.log("accepted:", files);

      // Process Image after vrification:
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          // console.log("image loaded:", reader.result);
          setImgSrc(reader.result);
          afterImageLoaded(reader.result);
        },
        false
      );
      reader.readAsDataURL(currentFile);
    }
  };

  return (
    <div className="drop-zone-container">
      <Dropzone onDrop={handleOnDrop} maxSize={3000000} multiple={false}>
        {({ getRootProps, getInputProps }) => {
          return (
            <div className="wrapper" {...getRootProps()}>
              <p>+ Choose from device </p>
              <input accept="image/*" {...getInputProps()} />
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
}

export default ImgDropAndCrop;