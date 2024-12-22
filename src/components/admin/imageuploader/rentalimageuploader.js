"use client";
import { imageUpload } from "@/lib/admin_actions";
import React, { useState } from "react";

const Rentalimageuploader = ({ rental }) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (evt) => {
    setFile(evt.target.files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      const d = Date.now();
      const rename = `${rental.rvid}-${i}-${d}`;
      formData.append(`file[${i}]`, file[i], rename);
    }

    await imageUpload(formData, rental);
  };

  return (
    <div className="image-uploader-box">
      <h3>Upload Images</h3>
      <form style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}} action={handleSubmit}>
        <input multiple onChange={handleFileChange} type="file" />

        <button style={{width: "15%"}}><span className="material-symbols-outlined">upload</span> </button>
      </form>
    </div>
  );
};

export default Rentalimageuploader;
