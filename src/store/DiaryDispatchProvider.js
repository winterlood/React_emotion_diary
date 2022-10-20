import React, { useCallback, useReducer, useRef } from "react";
import DiaryDispatchContext from "./diaryDispatchContext";

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

const dataReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
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

const DiaryDispatchProvider = (props) => {
  const [data, dispatchData] = useReducer(dataReducer, [...dummy_data]);

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

  const dispatchContext = {
    data: data,
    onCreate: onCreate,
    onEdit: onEdit,
    onRemove: onRemove,
  };

  console.log(data);

  return (
    <DiaryDispatchContext.Provider value={dispatchContext}>
      {props.children}
    </DiaryDispatchContext.Provider>
  );
};

export default DiaryDispatchProvider;
