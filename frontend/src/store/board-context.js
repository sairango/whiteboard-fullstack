import { createContext } from "react";

const boardContext = createContext({
  activeToolItem: "",
  elements: [],
  history: [[]],
  index: 0,
  toolActionType: "",
  changeToolHandler: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  textAreaBlurHandler: () => {},
  undo: () => {},
  redo: () => {},
});

export default boardContext;
