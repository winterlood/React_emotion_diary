import React from "react";
import { useParams } from "react-router-dom";

// 상세 페이지의 역할을 함, 어떤 일기를 보여줘야 할지 전달 받아야함
// ex) /diary/1 -> 1번 일기 보여줌

const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이 곳은 일기 상세 페이지입니다.</p>
    </div>
  );
};

export default Diary;
