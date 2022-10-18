import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`EmotionItem ${isSelected ? "selected" + emotion_id : ""}`}
      onClick={() => {
        onClick(emotion_id);
      }}
    >
      <img src={emotion_img} alt={emotion_descript} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
