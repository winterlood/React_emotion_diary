import React from "react";

const DiaryDispatchContext = React.createContext({
  data: [],
  onCreate: (date, content, emotion) => {},
  onEdit: (id, date, content, emotion) => {},
  onRemove: (id) => {},
});

export default DiaryDispatchContext;
