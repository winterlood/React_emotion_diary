import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// useSearchParams를 사용하여 쿼리스트링 처리
// 반환 받는 searchParams는 get을 통해 전달받는 쿼리 스트링을 꺼내 사용이 가능
// 반환 받는 setSearchParams는 searchParams는를 변경시키는 기능을 함

// useNavigate은 link 를 클릭하지 않았어도 페이지를 강제로 전환할 수 있음
// 예를 들어 로그인을 하지 않은 사용자가 무언가 클릭했을 때 강제로 로그인 화면으로 전환

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");
  console.log(id);
  console.log(mode);
  return (
    <div>
      <h1>Edit</h1>
      <p>이 곳은 일기 수정 페이지입니다.</p>
      <button onClick={() => setSearchParams({ who: "LSH" })}>QS 바꾸기</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        HOME으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
