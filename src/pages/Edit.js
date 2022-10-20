import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import DiaryDispatchContext from "../store/diaryDispatchContext";

// useSearchParams를 사용하여 쿼리스트링 처리
// 반환 받는 searchParams는 get을 통해 전달받는 쿼리 스트링을 꺼내 사용이 가능
// 반환 받는 setSearchParams는 searchParams는를 변경시키는 기능을 함

// useNavigate은 link 를 클릭하지 않았어도 페이지를 강제로 전환할 수 있음
// 예를 들어 로그인을 하지 않은 사용자가 무언가 클릭했을 때 강제로 로그인 화면으로 전환

const Edit = () => {
  const [originData, setOriginData] = useState();
  const { data } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(data);

  useEffect(() => {
    if (data.length >= 1) {
      const targetDiary = data.find((it) => +it.id === +id);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        // 두 번째 인수 { replace: true } 뒤로가기 금지 옵션
        navigate("/", { replace: true });
      }
    }
  }, [id, data]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
