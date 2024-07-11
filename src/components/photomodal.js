'use client'

import React from "react";

const PhotoModal = ({ children }) => {
  return (
    <div className="modal-bg">
      <div className="modal-flex-box">
        <div className="modal-image-box">
            {children}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
