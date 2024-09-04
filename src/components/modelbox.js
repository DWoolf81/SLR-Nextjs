import React from "react";

const Modalbox = ({ children, move }) => {

const moveUp = move ? "move-up":""
const modalOpen = move ? "modalOpen":""




  return (
    <div className={`modalBox ${modalOpen}`}>
      <div className={`modal-inner-box ${moveUp}`}>
        <div style={{  padding: "10px" }}>
        { move }
        { children }
        </div>
      </div>
    </div>
  );
};

export default Modalbox;
