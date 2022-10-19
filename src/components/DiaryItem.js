import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ id, content, emotion, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(+date).toLocaleDateString();

  const detailNavigate = () => {
    navigate(`/diary/${id}`);
  };

  const editNavigate = () => {
    navigate(`/edit/${id}`);
  };
  console.log(content);

  return (
    <div className="DiaryItem">
      <div
        className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}
        onClick={detailNavigate}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt=""
        />
      </div>

      <div className="info_wrapper" onClick={detailNavigate}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>

      <div className="btn_wrapper">
        <Button text={"수정하기"} onClick={editNavigate} />
      </div>
    </div>
  );
};

// DiaryItem.defaultProps = {
//   content: "",
// };

export default DiaryItem;
