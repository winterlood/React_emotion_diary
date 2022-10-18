import React from "react";

const Button = ({ text, type, onClick }) => {
  // 버튼 타입 유효성 검사
  const btnType = ["positive", "nagative"].includes ? type : "default";

  return (
    <button className={`Button Button_${btnType}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "defalut",
};

export default Button;
