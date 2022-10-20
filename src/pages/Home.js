import React, { useContext, useEffect, useState } from "react";

import DiaryDispatchContext from "../store/diaryDispatchContext";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

import Header from "../components/Header";

const Home = () => {
  const diaryDispatchCtx = useContext(DiaryDispatchContext);
  console.log(diaryDispatchCtx.data);

  // 일기 데이터를 날짜에 따라 가공 1
  const [data, setData] = useState(diaryDispatchCtx.data);
  console.log(data);

  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;

  // 일기 데이터를 날짜에 따라 가공 2
  useEffect(() => {
    if (diaryDispatchCtx.data.length > 1) {
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
        diaryDispatchCtx.data.filter(
          (it) => firstDay <= it.date && it.date <= lastDay
        )
      );
    }
  }, [diaryDispatchCtx, curDate]);

  console.log(diaryDispatchCtx.data);

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
