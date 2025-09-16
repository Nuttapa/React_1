import React from "react";

interface ButtonAddProps {
  onAdd: () => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none",
        marginBottom: "10px",
      }}
    >
      เพิ่มตัวเลข
    </button>

  );
};


export default ButtonAdd;