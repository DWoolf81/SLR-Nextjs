"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const phStyles = {
  modalBg: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%;",
    background: "rgba(85, 114, 67, .5)",
  },
  modalFlexBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "30",
    marginTop: "75px",
  },
  modalImgBox: {
    height: "calc(100vh - 75px)",
    overflowY: "auto",
    boxShadow: "5px 5px 15px #51871380"
  },
  backBox: {
    display: "flex",
    height: "50px",
    position: "fixed",
    top: "75px",
    left: "0px",
    background: "rgba(119, 160, 95, .5)",
    width: "100%",
    alignItems: "center"

  },

  backBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    width: "100%",
    fontSize: "20px !important",
    alignItems: "center",
    gap: "6px",
    marginLeft: "10px",
    color: "white",
  },
};

const PhotoModal = ({ children, id }) => {

    const router = useRouter()

    const handleClose = () => router.back()
  return (
    <div style={phStyles.modalBg}>
      <div style={phStyles.modalFlexBox}>
        <div style={phStyles.modalImgBox}>
          <div className="phCenterBox">
            <div style={phStyles.backBox}>
              <Link onClick={handleClose} style={phStyles.backBtn} href={`/rental/${id}`}>
                <span class="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
