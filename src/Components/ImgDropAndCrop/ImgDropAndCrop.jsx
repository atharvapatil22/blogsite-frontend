import React from "react";
import Dropzone from "react-dropzone";
import "./ImgDropAndCrop.css";

function ImgDropAndCrop() {
  const handleOnDrop = (files, rejectedFiles) => {
    // Handle Rejected Files
    if (rejectedFiles && rejectedFiles.length > 0) {
      if (rejectedFiles[0].errors[0].code === "file-too-large")
        alert("Image Size too large! Please upload file under 3MB.");
      else if (rejectedFiles[0].errors[0].code === "too-many-files") {
        alert("You can only upload 1 file");
      } else {
        alert(rejectedFiles[0].errors[0].code);
      }
      return;
    }

    // Handle Accepted Files
    if (files && files.length > 0) {
      const fileName = files[0].name;
      const fileType = fileName.split(".")[1];

      if (fileType != "jpg" && fileType != "jpeg" && fileType != "png") {
        console.log("image rejected for extension:", fileType);
        alert("Only jpg, jpeg and png files are allowed!");
        return;
      }

      console.log("accepted:", files);
    }
  };

  return (
    <div>
      <h1> ImgDropAndCrop</h1>
      <Dropzone onDrop={handleOnDrop} maxSize={3000000} multiple={false}>
        {({ getRootProps, getInputProps }) => {
          return (
            <div className="wrapper" {...getRootProps()}>
              <p>Drop some files here</p>
              <input accept="image/*" {...getInputProps()} />
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
}

export default ImgDropAndCrop;
