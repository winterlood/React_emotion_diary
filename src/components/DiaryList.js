import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// 일기 컨트롤 컴포넌트
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  // console.log(diaryList);

  // 일기 정렬 State
  const [sortType, setSortType] = useState("latest");
  // 일기 감정 필터 State
  const [filter, setFilter] = useState("all");

  // 일기 정렬
  const getProcessedDiaryList = () => {
    // 비교 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // 필터링 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return +item.emotion <= 3;
      } else {
        return +item.emotion > 3;
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 일기 감정 필터링
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <Button
            type={"positive"}
            text={"일기 작성"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
