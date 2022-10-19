import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

import Header from "../components/Header";

const Home = () => {
  const diaryListCtx = useContext(DiaryStateContext);

  // 일기 데이터를 날짜에 따라 가공 1
  const [data, setData] = useState(diaryListCtx);
  console.log(data);

  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;

  // 일기 데이터를 날짜에 따라 가공 2
  useEffect(() => {
    if (diaryListCtx.length > 1) {
      // curDate State의 월에 해당하는 1일을 ms로 변환
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // curDate State의 월에 해당하는 마지막일을 ms로 변환
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryListCtx.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryListCtx, curDate]);

  // 월 증가 함수
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  // 월 감소 함수
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
