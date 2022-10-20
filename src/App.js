import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

import DiaryDispatchProvider from "./store/DiaryDispatchProvider";

function App() {
  return (
    <DiaryDispatchProvider>
      <BrowserRouter>
        <div className="App">
          {/* 페이지 전환이 일어나는 부분 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />

            {/* path variable 처리 : useParams 사용 */}
            <Route path="/diary/:id" element={<Diary />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DiaryDispatchProvider>
  );
}

export default App;
