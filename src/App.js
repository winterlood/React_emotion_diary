import React, { useCallback, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

const dataReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.id);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummy_data = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기1",
    date: 1665921024082,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기2",
    date: 1665921024084,
  },
  // asdasd
  // adasdasda
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기3",
    date: 1665921024085,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기4",
    date: 1665921024086,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기5",
    date: 1665921024087,
  },
];

function App() {
  const [data, dispatchData] = useReducer(dataReducer, [dummy_data]);

  const dataId = useRef(0);

  // CREATE
  const onCreate = useCallback((date, content, emotion) => {
    dispatchData({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  }, []);

  // REMOVE
  const onRemove = useCallback((id) => {
    dispatchData({ type: "REMOVE", id });
  }, []);

  // EDIT
  const onEdit = useCallback((id, date, content, emotion) => {
    dispatchData({
      tyep: "EDIT",
      id,
      data: { id, date: new Date(date).getTime(), content, emotion },
    });
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
