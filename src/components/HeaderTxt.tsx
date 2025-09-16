import React from "react";

interface HeaderTxtProps {
  name?: string;        
  title?: string;       
  fontSize?: number;    
  txtsize?: string;     
  status: boolean;      
}

const HeaderTxt: React.FC<HeaderTxtProps> = ({
  name,
  title,
  fontSize,
  txtsize,
  status,
}) => {

  const sizeStyle = txtsize ? `${txtsize}px` : `${fontSize || 2}em`;

  return (
    <h1
      style={{ fontSize: sizeStyle }}
      className={status ? "green-txt" : "red-txt"}
    >
      {title || name || "ไม่มีข้อความ"}
    </h1>

  );
};

export default HeaderTxt;